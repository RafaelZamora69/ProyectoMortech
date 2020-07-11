<?php
    class venta {
        private $NombreCliente, $NombreEmpleado, $NumTel, $Operadora, $Monto, $PrecioVenta, $Pagado, $Observaciones, $connection, $api, $mensajes = [];

        function __construct(){
            $connect = new dbConnect();
            $this->connection = $connect->connect();
            $client = new api();
            $client->setUser($_SESSION['identity']['Usuario']);
            $client->setPassword($_SESSION['identity']['Password']);
            $this->api = $client;
        }

        function setNombreCliente($NombreCliente){
            $this->NombreCliente = $this->connection->real_escape_string($NombreCliente);
        }

        function getNombreCliente(){
            return $this->NombreCliente;
        }

        function setNombreEmpleado($NombreEmpleado){
            $this->NombreEmpleado = $this->connection->real_escape_string($NombreEmpleado);
        }

        function getNombreEmpleado(){
            return $this->NombreEmpleado;
        }

        function setNumTel($NumTel){
            $this->NumTel = $this->connection->real_escape_string($NumTel);
        }

        function getNumTel(){
            return $this->NumTel;
        }

        function setOperadora($Operadora){
            $this->Operadora = $this->connection->real_escape_string($Operadora);
        }

        function getOperadora(){
            return $this->Operadora;
        }

        function setMonto($Monto){
            $this->Monto = $this->connection->real_escape_string($Monto);
        }

        function getMonto(){
            return $this->Monto;
        }

        function setPrecioVenta($PrecioVenta){
            $this->PrecioVenta = $this->connection->real_escape_string($PrecioVenta);
        }

        function getPrecioVenta(){
            return $this->PrecioVenta;
        }

        function setPagado($Pagado){
            $this->Pagado = $this->connection->real_escape_string($Pagadp);
        }

        function getPagado(){
            return $this->Pagado;
        }

        function setObservaciones($Observaciones){
            $this->Observaciones = $this->connection->real_escape_string($Observaciones);
        }

        function getObservaciones(){
            return $this->Observaciones;
        }

        public function obtenerClientes(){
            $clientes = [];
            $query = $this->connection->query("select Nombre from cliente;");
            while($row = $query->fetch_assoc()){
                $clientes[] = array("Nombre" => $row["Nombre"], "Img" => null);
            }
            return $clientes;
        }

        private function registrarCliente($NombreCliente){
            $registro = $this->connection->prepare("insert into cliente (nombre) values (?)");
            $registro->bind_param("s", $NombreCliente);
            $registro->execute();
            return $this->getIdCliente($NombreCliente);
        }

        private function getIdCliente($NombreCliente){
            $id = $this->connection->prepare("select idCliente from cliente where Nombre = ?");
            $id->bind_param("s", $NombreCliente);
            $id->execute();
            $id->bind_result($idCliente);
            $id->fetch();
            if($idCliente){
                return $idCliente;
            } else {
                return $this->registrarCliente($NombreCliente);
            }
        }

        private function getIdEmpleado($NombreEmpleado){
            $id = $this->connection->prepare("select idEmpleado from empleado where Nombre = ?");
            $id->bind_param("s", $NombreEmpleado);
            $id->execute();
            $id->bind_result($idEmpleado);
            $id->fetch();
            return $idEmpleado;
        }

        private function recarga($Carrier, $Telefono, $Monto){
            $respuesta = $this->api->recargaTae($Carrier, $Telefono, $Monto);
            $this->mensajes[] = array('Tel' => $Telefono, 'Codigo' => $respuesta[0], 'Mensaje' => $respuesta[1]);
            return strcmp($respuesta[0], '0') == 0 ? true : false;
        }

        function InsertarRecarga($NombreCliente, $NombreEmpleado, $telefonos, $NombreServicio, $Carrier, $Monto, $PrecioVenta, $Pagado, $Observaciones){
            $this->mensajes = [];
            $arr = json_decode($telefonos, true);
            try {
                for ($i=0; $i < count($arr); $i++) {
                    $tel = $arr[$i]['tag'];
                    //Si se realiza la recarga
                    if($this->recarga($Carrier, strval($tel), $Monto)){
                        $venta = $this->connection->prepare("insert into venta(idCliente, idEmpleado, NombreServicio, NumeroTelefono, Operadora, Monto, PrecioVenta, Pagado, Observaciones, Fecha) values (?,?,?,?,?,?,?,?,?,now());");
                        $idCliente = $this->getIdCliente($NombreCliente);
                        $idEmpleado = $this->getIdEmpleado($NombreEmpleado);
                        $venta->bind_param("iisssddis", $idCliente, $idEmpleado, $NombreServicio, $tel, $Carrier, $Monto, $PrecioVenta, $Pagado, $Observaciones);
                        if(!$venta->execute()){
                            return json_encode('Error en la inserción ' . $venta->error);
                        }
                    }
                }
                return json_encode($this->mensajes);
            } catch (Exception $e) {
                return json_encode($e->getMessage());
            }
        }

        function VentaServicio($NombreCliente, $NombreEmpleado, $NombreServicio, $PrecioVenta, $Pagado, $Observaciones){
            try {
                $this->mensajes = [];
                $venta = $this->connection->prepare("insert into venta(idCliente, idEmpleado, NombreServicio, PrecioVenta, Pagado, Observaciones) values (?,?,?,?,?,?)");
                $idCliente = $this->getIdCliente($NombreCliente);
                $idEmpleado = $this->getIdEmpleado($NombreEmpleado);
                $venta->bind_param("iisdis", $idCliente, $idEmpleado, $NombreServicio, $PrecioVenta, $Pagado, $Observaciones);
                !$venta->execute() ? 
                $this->mensajes[] = array('Mensaje' => $venta->error, 'Codigo' => 1) : 
                $this->mensajes[] = array('Mensaje' => 'Venta registrada', 'Codigo' => 0);
                return json_encode($this->mensajes);
            } catch (Exception $e) {
                return json_encode($e->getMessage());
            }
        }
    }