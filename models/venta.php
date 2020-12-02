<?php
class venta
{
    private $NombreCliente, $NombreEmpleado, $NumTel, $Operadora, $Monto, $PrecioVenta, $Pagado, $Observaciones, $connection, $api, $mensajes = [];

    function __construct()
    {
        $connect = new dbConnect();
        $this->connection = $connect->connect();
        $client = new api();
        $client->setUser($_SESSION['identity']['Usuario']);
        $client->setPassword($_SESSION['identity']['Password']);
        $this->api = $client;
    }

    private function registrarCliente($NombreCliente)
    {
        $registro = $this->connection->prepare("insert into cliente (nombre) values (?)");
        $registro->bind_param("s", $NombreCliente);
        $registro->execute();
        return $this->getIdCliente($NombreCliente);
    }

    public function getIdCliente($NombreCliente)
    {
        $id = $this->connection->prepare("select idCliente from cliente where Nombre = ?");
        $id->bind_param("s", $NombreCliente);
        $id->execute();
        $id->bind_result($idCliente);
        $id->fetch();
        if ($idCliente) {
            return $idCliente;
        } else {
            return $this->registrarCliente($NombreCliente);
        }
    }

    public function getIdEmpleado($NombreEmpleado)
    {
        $id = $this->connection->prepare("select idEmpleado from empleado where Nombre = ?");
        $id->bind_param("s", $NombreEmpleado);
        $id->execute();
        $id->bind_result($idEmpleado);
        $id->fetch();
        return $idEmpleado;
    }

    private function recarga($Carrier, $Telefono, $Monto)
    {
        $respuesta = $this->api->recargaTae($Carrier, $Telefono, $Monto);
        $this->mensajes[] = array('Tel' => $Telefono, 'Codigo' => $respuesta[0], 'Mensaje' => $respuesta[1]);
        return strcmp($respuesta[0], '0') == 0 ? true : false;
    }

    private function limpiarEspacios($Observaciones){
        return trim($Observaciones, ' ');
    }

    private function getUtilidad($Monto, $Usd, $Mxn) {
        return (((double)$Usd * 20) + (double)$Mxn) - (double)$Monto;
    }

    private function guardarImagen($idEmpleado){
        $extensiones = array('image/jpeg', 'image/jpg', 'image/png');
        if(in_array($_FILES['Ticket']['type'], $extensiones)){
            $image = null;
            switch ($_FILES['Ticket']['type']){
                case 'image/jpg':
                case 'image/jpeg':
                    $image = imagecreatefromjpeg($_FILES['Ticket']['tmp_name']);
                    break;
                case 'image/png':
                    $image = imagecreatefrompng($_FILES['Ticket']['tmp_name']);
                    break;

            }
            imagejpeg($image, $_FILES['Ticket']['tmp_name'],30);
            $image = addslashes(file_get_contents($_FILES['Ticket']['tmp_name']));
            if($this->connection->query("insert into images(Image, idEmpleado) values ('{$image}', '{$idEmpleado}')")){
                return true;
            }
        }
        return false;
    }

    private function obtenerIdImagen($idEmpleado){
        $query = $this->connection->prepare("select max(idImage) As idImage from images where idEmpleado = ?");
        $query->bind_param('i', $idEmpleado);
        if($query->execute()){
            $result = $query->get_result();
            while($row = $result->fetch_assoc()){
                return $row['idImage'];
            }
        }
    }

    function buscarOrden($Servicio){
        try{
            $busqueda = $this->connection->prepare("select count(NombreServicio) As 'count' from venta where NombreServicio != 'Recarga de saldo' and NombreServicio = ?");
            $busqueda->bind_param('s', $Servicio);
            $busqueda->execute();
            $result = $busqueda->get_result();
            while($row = $result->fetch_assoc()){
                return $row['count'] > 0;
            }
        }catch(Exception $e){
            return json_encode($e->getMessage());
        }
    }

    function infoNumero($Numero){
        try{
            $busqueda = $this->connection->prepare("call InfoNumero(?);");
            $busqueda->bind_param('s', $Numero);
            $busqueda->execute();
            $result = $busqueda->get_result();
            $Ventas = [];
            while($row = $result->fetch_assoc()){
                $Ventas[] = Array('idVenta' => $row['idVenta'], 'Empleado' => $row['Empleado'], 'Cliente' => $row['Cliente'],
                'NumeroTelefono' => $row['NumeroTelefono'], 'Operadora' => $row['Operadora'], 'Monto' => $row['Monto'], 'Usd' => $row['Usd'], 'Mxn' => $row['Mxn'], 'Fecha' => $row['fecha'], 'Pagado' => $row['Pagado']);
            }
            return json_encode($Ventas);
        }catch(Exception $e){
            return json_encode($e->getMessage());
        }
    }

    function InsertarRecarga($NombreCliente, $NombreEmpleado, $telefonos, $NombreServicio, $Operadora, $Monto, $Mxn, $Usd, $Pagado, $Observaciones, $Carrier,$Tipo)
    {
        $this->mensajes = [];
        $NombreCliente = $this->limpiarEspacios($NombreCliente);
        $arr = json_decode($telefonos, true);
        try {
            for ($i = 0; $i < count($arr); $i++) {
                $tel = $arr[$i]['tag'];
                //Si se realiza la recarga
                if(strcmp('Externa', $Tipo) == 0 || strcmp($Operadora, 'MT') == 0) {
                    goto insertar;
                }
                if ($this->recarga($Carrier, $tel, $Monto)) {
                    insertar:
                    $venta = $this->connection->prepare("insert into venta(idCliente, idEmpleado, NombreServicio, NumeroTelefono, Operadora, Monto, Usd, Mxn, Utilidad,Pagado, Observaciones, Fecha, Verificada) values (?,?,?,?,?,?,?,?,?,?,?, date_add(now(), interval 2 hour ),?);");
                    $idCliente = $this->getIdCliente($NombreCliente);
                    $idEmpleado = $this->getIdEmpleado($NombreEmpleado);
                    $Utilidad = $this->getUtilidad($Monto, $Usd, $Mxn);
                    $Verificado = $Utilidad <= 0 ? 0 : 1;
                    $venta->bind_param("iisssddddisi", $idCliente, $idEmpleado, $NombreServicio, $tel, $Operadora, $Monto, $Usd, $Mxn, $Utilidad, $Pagado, $Observaciones, $Verificado);
                    if (!$venta->execute()) {
                        return json_encode('Error en la inserción ' . $venta->error);
                    }
                    if(strcmp($Operadora, 'MT') == 0){
                        $this->mensajes[] = array('Tel' => $tel, 'Codigo' => 0, 'Mensaje' => 'Recarga exitosa');
                    }
                }
            }
            return strcmp('Externa', $Tipo) == 0 ? json_encode(array("Codigo" => 0, "Mensaje" => 'Venta registrada')) : json_encode($this->mensajes);
        } catch (Exception $e) {
            return json_encode($e->getMessage());
        }
    }

    function VentaServicio($NombreCliente, $NombreEmpleado, $NombreServicio, $Usd, $Mxn, $Pagado, $Observaciones)
    {
        try {
            $NombreServicio = $this->limpiarEspacios($NombreServicio);
            if(!$this->buscarOrden($NombreServicio)){
                $NombreCliente = $this->limpiarEspacios($NombreCliente);
                $this->mensajes = [];
                $venta = $this->connection->prepare("insert into venta(idCliente, idEmpleado, NombreServicio, Usd, Mxn, Pagado, Observaciones, Verificada, Utilidad, fecha) values (?,?,?,?,?,?,?,0,0,date_add(now(), interval 2 hour ))");
                $idCliente = $this->getIdCliente($NombreCliente);
                $idEmpleado = $this->getIdEmpleado($NombreEmpleado);
                $Observaciones = $this->limpiarEspacios($Observaciones);
                $venta->bind_param("iisddis", $idCliente, $idEmpleado, $NombreServicio, $Usd, $Mxn, $Pagado, $Observaciones);
                !$venta->execute() ?
                    $this->mensajes[] = array('Mensaje' => $venta->error, 'Codigo' => 1) :
                    $this->mensajes[] = array('Mensaje' => 'Venta registrada', 'Codigo' => 0);
                return json_encode($this->mensajes);
            } else {
                $this->mensajes[] = array('Mensaje' => 'Servicio duplicado', 'Codigo' => 1);
                return json_encode($this->mensajes);
            }
        } catch (Exception $e) {
            return json_encode($e->getMessage());
        }
    }

    function detalleVenta($idVenta)
    {
        try {
            $detalle = $this->connection->prepare("select idVenta, cliente.Nombre As 'Cliente', empleado.Nombre As 'Empleado', Usd, Mxn, Pagado, Observaciones, Corte, Verificada from venta inner join cliente on venta.idCliente = cliente.idCliente inner join empleado on venta.idEmpleado = empleado.idEmpleado where idVenta = ?");
            $detalle->bind_param("i", $idVenta);
            $detalle->execute();
            $result = $detalle->get_result();
            $arr = [];
            while ($row = $result->fetch_assoc()) {
                $arr[] = array('idVenta' => $row['idVenta'], 'Cliente' => $row['Cliente'], 'Empleado' => $row['Empleado'], 'Usd' => $row['Usd'], 'Mxn' => $row['Mxn'], 'Pagado' => $row['Pagado'], 'Observaciones' => $row['Observaciones'], 'Corte' => $row['Corte'], 'Verificada' => $row['Verificada']);
            }
            return json_encode($arr);
        } catch (Exception $e) {
            return json_encode($e->getMessage());
        }
    }

    function RegistrarCompra($Empleado, $Proveedor, $Referencia, $Total, $Pagada){
        try{
            mysqli_begin_transaction($this->connection);
            $idEmpleado = $this->getIdEmpleado($Empleado);
            if($this->guardarImagen($idEmpleado)){
                $compra = $this->connection->prepare("insert into compra(idEmpleado, Proveedor, Referencia, Total, Fecha, idImagen, Pagada) values (?,?,?,?,date_add(now(), interval 2 hour ),?,?)");
                $idImagen = $this->obtenerIdImagen($idEmpleado);
                $compra->bind_param('issdis', $idEmpleado, $Proveedor, $Referencia, $Total, $idImagen, $Pagada);
                if($compra->execute()){
                    $this->connection->commit();
                    return json_encode(array("Codigo" => 0, "Message" => "Compra registrada"));
                }
                $this->connection->rollback();
                return json_encode(array("Codigo" => 1, "Message" => "Error al registrar"));
            }
            $this->connection->rollback();
            return json_encode(array("Codigo" => 1, "Message" => "Formato de imagen invalido"));
        }catch(Exception $e){
            $this->connection->rollback();
            return json_encode(array("Codigo" => 1, "Message" => $e->getMessage()));
        }
    }

    /**
     * Devuelve una lista de los proveedores
     * @return json
     */
    function getProveedores(){
        $query = $this->connection->query("select distinct(Proveedor) As Proveedor from compra");
        $proveedores = [];
        while($row = $query->fetch_assoc()){
            $proveedores[] = $row["Proveedor"];
        }
        return json_encode($proveedores);
    }
}
