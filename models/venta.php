<?php 
    class venta {
        private $NombreCliente, $NombreEmpleado, $NumTel, $Operadora, $Monto, $PrecioVenta, $Pagado, $Observaciones, $connection, $api;

        function __construct(){
            $connect = new dbConnect();
            $this->connection = $connect->connect();
            $client = new api();
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

        function InsertarRecarga($NombreCliente, $NombreEmpleado, $telefonos, $NombreServicio, $Operadora, $Monto, $PrecioVenta, $Pagado, $Observaciones){
            
            $arr = json_decode($telefonos, true);
            try {
                for ($i=0; $i < count($arr); $i++) {
                    $venta = $this->connection->prepare("insert into venta(idCliente, idEmpleado, NombreServicio, NumeroTelefono, Operadora, Monto, PrecioVenta, Pagado, Observaciones, Fecha) values(?,?,?,?,?,?,?,?,?,?);");
                    $idCliente = $this->getIdCliente($NombreCliente);
                    $idEmpleado = $this->getIdEmpleado($NombreEmpleado);
                    $tel = $arr[$i]['tag'];
                    $venta->bind_param("iisssddiss", $idCliente, $idEmpleado, 'Recarga Saldo', $tel, $Operadora, $Monto, $PrecioVenta, $Pagado, $Observaciones, DateTime::getTimestamp());
                    $register->execute();
                }
                echo 'Terminado';
            } catch (Exception $e) {
                echo $e->getMessage();
            }
        }
    }