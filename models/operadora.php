<?php


class operadora {
    private $connection;

    function __construct() {
        $connect = new dbConnect();
        $this->connection = $connect->connect();
    }

    public function datosOperadoras(){
        if($query = $this->connection->query('select * from datosoperadoras')){
            $data = [];
            while($row = $query->fetch_assoc()){
                $data[] = array('id'=>$row['idOperadora'],'Operadora'=>$row['Nombre'],'Almacen'=>$row['Almacen'],'Vendidas'=>$row['Vendidas']);
            }
            return json_encode($data);
        }
    }

    public function All(){
        if($query = $this->connection->query('select * from operadoras where Activa = 1')){
            $data = [];
            while($row = $query->fetch_assoc()){
                $data[] = array('id'=>$row['idOperadora'],'Operadora'=>$row['Nombre']);
            }
            return json_encode($data);
        }
    }
}