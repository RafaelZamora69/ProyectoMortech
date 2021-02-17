<?php
include_once 'models/operadora.php';
class venta
{
    private $connection, $api, $mensajes = [], $observer;

    function __construct()
    {
        $connect = new dbConnect();
        $this->connection = $connect->connect();
        $client = new api();
        $client->setUser($_SESSION['identity']['Usuario']);
        $client->setPassword($_SESSION['identity']['Password']);
        $this->api = $client;
        $this->observer = new Observer();
    }

    private function registrarCliente($NombreCliente)
    {
        $registro = $this->connection->prepare("insert into cliente (nombre) values (?)");
        $registro->bind_param("s", $NombreCliente);
        $registro->execute();
        return $this->getIdCliente($NombreCliente);
    }

    private function obtenerOperadora($idPlan){
        $operadora = new operadora();
        return $operadora->obtenerOperadora($idPlan);
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

    /***
     * Obtiene el ID de un empleado dado el nombre
     * @param $NombreEmpleado
     * @return mixed
     */
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
        $this->addMessage($Telefono,$respuesta[0],$respuesta[1]);
        return strcmp($respuesta[0], '0') == 0;
    }

    private function addMessage($Tel, $Code, $Msg){
        $this->mensajes[] = array('Tel' => $Tel, 'Codigo' => $Code, 'Mensaje' => $Msg);
    }

    private function descontar($idOperadora){
        $plan = new operadora();
        $plan->descontar($idOperadora);
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

    function recargaNemi($NombreCliente, $NombreEmpleado, $telefonos, $NombreServicio, $Mxn, $Usd, $Pagado, $Observaciones, $Plan){
        $NombreCliente = $this->limpiarEspacios($NombreCliente);
        $Operadora = $this->obtenerOperadora($Plan);
        try{
            $venta = $this->connection->prepare("insert into venta(idCliente, idEmpleado, NombreServicio, NumeroTelefono, Operadora, Monto, Usd, Mxn, Utilidad,Pagado, Observaciones, Fecha, Verificada) values (?,?,?,?,?,?,?,?,?,?,?, date_add(now(), interval 2 hour ),?);");
            $idCliente = $this->getIdCliente($NombreCliente);
            $idEmpleado = $this->getIdEmpleado($NombreEmpleado);
            $Utilidad = $this->getUtilidad($Operadora['Costo'], $Usd, $Mxn);
            $Verificado = $Utilidad <= 0 ? 0 : 1;
            $tel = json_decode($telefonos,true);
            $venta->bind_param("iisssddddisi", $idCliente, $idEmpleado, $NombreServicio, $tel, $Operadora['Operadora'], $Operadora['Costo'], $Usd, $Mxn, $Utilidad, $Pagado, $Observaciones, $Verificado);
            if (!$venta->execute()) {
                return json_encode('Error en la inserción ' . $venta->error);
            } else {
                $this->ActivarNemi($tel);
                $this->descontar($Operadora['idOperadora']);
                $this->observer->NotificarVenta($idEmpleado,$tel,$Operadora['Operadora']);
                return json_encode(array('Tel' => $tel, 'Codigo' => 0, 'Mensaje' => 'Venta registrada'));
            }
        } catch (Exception $e) {
            return json_encode($e->getMessage());
        }
    }

    function ActivarNemi($tel){
        $conn = new dbConnect();
        $conn = $conn->connect();
        $query = $conn->query("update nemi set Activada = 1 where NumNemi = {$tel}");
    }

    function InsertarRecarga($NombreCliente, $NombreEmpleado, $telefonos, $NombreServicio, $Plan, $Mxn, $Usd, $Pagado, $Recarga, $Observaciones,$Tipo)
    {
        $this->mensajes = [];
        $NombreCliente = $this->limpiarEspacios($NombreCliente);
        $arr = json_decode($telefonos, true);
        $Operadora = $this->obtenerOperadora($Plan);
        try {
            for ($i = 0; $i < count($arr); $i++) {
                $tel = $arr[$i]['tag'];
                //Si se realiza la recarga
                if(strcmp('Externa', $Tipo) == 0 || strcmp($Operadora['Operadora'], 'MT') == 0 || strcmp($Operadora['Operadora'], 'Space') == 0) {
                    $this->addMessage($tel,'0','Registrada correctamente');
                    goto insertar;
                }
                if ($this->recarga($Operadora['idOperadora'], $tel, $Operadora['Costo'])) {
                    insertar:
                    $venta = $this->connection->prepare("insert into venta(idCliente, idEmpleado, NombreServicio, NumeroTelefono, Operadora, Monto, Usd, Mxn, Utilidad,Pagado, Observaciones, Fecha, Verificada) values (?,?,?,?,?,?,?,?,?,?,?, date_add(now(), interval 2 hour ),?);");
                    $idCliente = $this->getIdCliente($NombreCliente);
                    $idEmpleado = $this->getIdEmpleado($NombreEmpleado);
                    $Utilidad = $this->getUtilidad($Operadora['Costo'], $Usd, $Mxn);
                    $Verificado = $Utilidad <= 0 ? 0 : 1;
                    $venta->bind_param("iisssddddisi", $idCliente, $idEmpleado, $NombreServicio, $tel, $Operadora['Operadora'], $Operadora['Costo'], $Usd, $Mxn, $Utilidad, $Pagado, $Observaciones, $Verificado);
                    if (!$venta->execute()) {
                        return json_encode('Error en la inserción ' . $venta->error);
                    }
                    if(strcmp($Operadora['Operadora'], 'Nemi') == 0 || strcmp($Operadora['Operadora'], 'Space') == 0){
                        $this->mensajes[] = array('Tel' => $tel, 'Codigo' => 0, 'Mensaje' => 'Recarga exitosa');
                    }
                    if(strcmp($Recarga, 0) == 0){
                        $this->descontar($Operadora['idOperadora']);
                        $this->observer->NotificarRecarga($idEmpleado,$tel,$Operadora['Operadora']);
                    } else {
                        $this->observer->NotificarVenta($idEmpleado,$tel,$Operadora['Operadora']);
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
                if(!$venta->execute()){
                    $this->mensajes[] = array('Mensaje' => $venta->error, 'Codigo' => 1);
                } else {
                    $this->mensajes[] = array('Mensaje'=>'Servicio registrado', 'Codigo' => 0);
                    $this->observer->NotificarServicio($_SESSION['identity']['id'],$NombreServicio);
                }
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
                    $this->observer->NotificarCompra($_SESSION['identity']['id'],$Proveedor,$Total);
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

    function getProveedores(){
        $query = $this->connection->query("select distinct(Proveedor) As Proveedor from compra");
        $proveedores = [];
        while($row = $query->fetch_assoc()){
            $proveedores[] = $row["Proveedor"];
        }
        return json_encode($proveedores);
    }

    function obtenerInfoNemi($NumSerie){
        $param = "%{$NumSerie}%";
        $query = $this->connection->prepare("select * from nemi where NumSerie like ?;");
        $query->bind_param('s',$param);
        if($query->execute()){
            $result = $query->get_result();
            if($result->num_rows > 0){
                $row = $result->fetch_assoc();
                return json_encode(array('Serie' => $row['NumSerie'],'Tel'=>$row['NumNemi'],'Activada'=>$row['Activada']));
            } else {
                return json_encode(array('Serie'=>'null','Tel'=>'null','Activada'=>'null'));
            }
        }
    }

    function ventasUsuarios($idUsuario){
        $query = $this->connection->prepare('call VentasUsuario(?);');
        $query->bind_param('i',$idUsuario);
        if($query->execute()){
            $ventas = [];
            $result = $query->get_result();
            while($row = $result->fetch_assoc()){
                $ventas[] = array('idVenta'=>$row['idVenta'],'Cliente'=>$row['Cliente'],'Telefono'=>$row['NumeroTelefono'],'Pagado'=>$row['Pagado'],'Propia'=>$row['Propia']);
            }
            return json_encode($ventas);
        }
    }

    function ventaPendiente($idVenta){
        $query = $this->connection->prepare('update venta set idCliente = 33, Pagado = 0 where idVenta = ?');
        $query->bind_param('i',$idVenta);
        if($query->execute()){
            return json_encode(array('Code' => 0, 'Msg' => 'Venta actualizada'));
        } else {
            return json_encode(array('Code' => 1, 'Msg' => 'Error al actualizar'));
        }
    }

    function miVenta($idVenta, $Nombre){
        $idEmpleado = $this->getIdEmpleado($Nombre);
        $query = $this->connection->prepare('update venta set idEmpleado = ?, Pagado = 1 where idVenta = ?;');
        $query->bind_param('ii', $idEmpleado,$idVenta);
        if($query->execute()){
            return json_encode(array('Code' => 0, 'Msg' => 'Venta actualizada'));
        } else {
            return json_encode(array('Code' => 0, 'Msg' => 'Error al actualizar'));
        }
    }

    function pagada($idVenta){
        $data = $this->connection->query("select Pagado from venta where idVenta = {$idVenta}");
        $row = $data->fetch_assoc();
        $pagada = $row['Pagado'] == 1 ? 0 : 1;
        $query = $this->connection->prepare('update venta set Pagado = ? where idVenta = ?');
        $query->bind_param('ii',$pagada,$idVenta);
        if($query->execute()){
            return json_encode(array('Code' => 0, 'Msg' => 'Venta actualizada'));
        } else {
            return json_encode(array('Code' => 1, 'Msg' => 'Error al actualizar'));
        }
    }

    function actualizarCliente($idVenta, $idCliente){
        $query = $this->connection->prepare('update venta set idCliente = ? where idVenta = ?');
        $query->bind_param('ii', $idCliente, $idVenta);
        if($query->execute()){
            return json_encode(array('Code' => 0, 'Msg' => 'Venta actualizada'));
        } else {
            return json_encode(array('Code' => 1, 'Msg' => 'Error al actualizar'));
        }
    }

    function borrarVenta($id,string $operadoraBorrar){
        $query = $this->connection->prepare('delete from venta where idVenta = ?');
        $query->bind_param('i',$id);
        if($query->execute()){
            $operadora = new operadora();
            $idOperadora = $operadora->obtenerIdOperadora($operadoraBorrar);
            $operadora->Modificar($idOperadora,1,'Agregar',"se borró la venta #{$id}");
            return json_encode(array('Code'=>0,'Msg'=>'Venta borrada'));
        }
    }
}
