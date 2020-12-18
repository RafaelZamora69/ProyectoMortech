<?php

class utilidades {

    private $connection;

    function __construct() {
        $connect = new dbConnect();
        $this->connection = $connect->connect();
    }

    public function cargarNemi($Archivo){
        if(($gestor = fopen($Archivo,"r")) != false){
            $query = "insert into nemi(NumSerie,NumNemi)values";
            $datos = fgetcsv($gestor,10000,",");
            $query .= "('{$datos[0]}','{$datos[1]}')";
            while(($datos = fgetcsv($gestor,10000,",")) != false){
                $query .= ',';
                $query .= "('{$datos[0]}','{$datos[1]}')";
            }
            $query .= ';';
            if($result = $this->connection->query($query)){
                return json_encode(array('Code'=>0,'Mensaje'=>'Datos registrados'));
            } else {
                return json_encode(array('Code'=>1,'Mensaje'=>'Error al insertar'));
            }
        }
    }
}