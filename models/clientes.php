<?php
    class clientes {
        private $connection;

        function __construct(){
            $connect = new dbConnect();
            $this->connection = $connect->connect();
        }

        public function creditoClientes(){
            try{
                $query = $this->connection->query("select * from clientescredito;");
                $clientes = [];
                while ($row = $query->fetch_assoc()) {
                    $clientes[] = array('idCliente' => $row['idCliente'], 'Nombre' => $row['Nombre'], 'Deudas' => $row['Deudas'], 'Usd' => $row['Usd'], 'Mxn' => $row['Mxn']);
                }
                return json_encode($clientes);
            }catch(Exception $e){
                return json_encode($e->getMessage());
            }
        }
    }