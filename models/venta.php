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

    private function getUtilidad($Monto, $Usd, $Mxn) {
        return (((double)$Usd * 20) + (double)$Mxn) - (double)$Monto;
    }

    function infoNumero($Numero){
        try{
            $busqueda = $this->connection->prepare("call InfoNumero(?);");
            $busqueda->bind_param('s', $Numero);
            $busqueda->execute();
            $result = $busqueda->get_result();
            while($row = $result->fetch_assoc()){
                return json_encode(Array('Empleado' => $row['Empleado'], 'Cliente' => $row['Cliente'], 'NumeroTelefono' => $row['NumeroTelefono'], 'Monto' => $row['Monto'], 'Usd' => $row['Usd'], 'Mxn' => $row['Mxn'], 'Fecha' => $row['fecha']));
            }
        }catch(Exception $e){
            return json_encode($e->getMessage());
        }
    }

    function InsertarRecarga($NombreCliente, $NombreEmpleado, $telefonos, $NombreServicio, $Operadora, $Monto, $Mxn, $Usd, $Pagado, $Observaciones, $Carrier)
    {
        $this->mensajes = [];
        $arr = json_decode($telefonos, true);
        try {
            for ($i = 0; $i < count($arr); $i++) {
                $tel = $arr[$i]['tag'];
                //Si se realiza la recarga
                if ($this->recarga($Carrier, $tel, $Monto)) {
                    $venta = $this->connection->prepare("insert into venta(idCliente, idEmpleado, NombreServicio, NumeroTelefono, Operadora, Monto, Usd, Mxn, Utilidad,Pagado, Observaciones, Fecha) values (?,?,?,?,?,?,?,?,?,?,?,now());");
                    $idCliente = $this->getIdCliente($NombreCliente);
                    $idEmpleado = $this->getIdEmpleado($NombreEmpleado);
                    $Utilidad = $this->getUtilidad($Monto, $Usd, $Mxn);
                    $venta->bind_param("iisssddddis", $idCliente, $idEmpleado, $NombreServicio, $tel, $Operadora, $Monto, $Usd, $Mxn, $Utilidad, $Pagado, $Observaciones);
                    if (!$venta->execute()) {
                        return json_encode('Error en la inserción ' . $venta->error);
                    }
                }
            }
            return json_encode($this->mensajes);
        } catch (Exception $e) {
            return json_encode($e->getMessage());
        }
    }

    function VentaServicio($NombreCliente, $NombreEmpleado, $NombreServicio, $Usd, $Mxn, $Pagado, $Observaciones)
    {
        try {
            $this->mensajes = [];
            $venta = $this->connection->prepare("insert into venta(idCliente, idEmpleado, NombreServicio, Usd, Mxn, Pagado, Observaciones) values (?,?,?,?,?,?,?)");
            $idCliente = $this->getIdCliente($NombreCliente);
            $idEmpleado = $this->getIdEmpleado($NombreEmpleado);
            $venta->bind_param("iisddis", $idCliente, $idEmpleado, $NombreServicio, $Usd, $Mxn, $Pagado, $Observaciones);
            !$venta->execute() ?
                $this->mensajes[] = array('Mensaje' => $venta->error, 'Codigo' => 1) :
                $this->mensajes[] = array('Mensaje' => 'Venta registrada', 'Codigo' => 0);
            return json_encode($this->mensajes);
        } catch (Exception $e) {
            return json_encode($e->getMessage());
        }
    }

    function detalleVenta($idVenta)
    {
        try {
            $detalle = $this->connection->prepare("select idVenta, cliente.Nombre As 'Cliente', empleado.Nombre As 'Empleado', Usd, Mxn, Pagado, Observaciones, Corte from venta inner join cliente on venta.idCliente = cliente.idCliente inner join empleado on venta.idEmpleado = empleado.idEmpleado where idVenta = ?");
            $detalle->bind_param("i", $idVenta);
            $detalle->execute();
            $result = $detalle->get_result();
            $arr = [];
            while ($row = $result->fetch_assoc()) {
                $arr[] = array('idVenta' => $row['idVenta'], 'Cliente' => $row['Cliente'], 'Empleado' => $row['Empleado'], 'Usd' => $row['Usd'], 'Mxn' => $row['Mxn'], 'Pagado' => $row['Pagado'], 'Observaciones' => $row['Observaciones'], 'Corte' => $row['Corte']);
            }
            return json_encode($arr);
        } catch (Exception $e) {
            return json_encode($e->getMessage());
        }
    }
}
