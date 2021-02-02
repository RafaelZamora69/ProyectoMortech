<?php

class utilidades {

    private $connection, $connectionAux;

    function __construct() {
        $connect = new dbConnect();
        $this->connection = $connect->connect();
        $this->connectionAux = $connect->connect();
    }

    public function cargarNumeros($Archivo){
        if(($gestor = fopen($Archivo,"r")) != false){
            $query = '';
            while(($datos = fgetcsv($gestor,10000,",")) != false){
                $query = "update venta set NumeroTelefono = '{$datos[2]}', Operadora = '{$datos[1]}' where fecha = date_add('{$datos[0]}', interval 1 hour);";
                echo $query . '<br>';
            }
        }
    }

    public function cargarNemi($Archivo){
        if(($gestor = fopen($Archivo,"r")) != false){
            $query = "insert into nemi(NumSerie,NumNemi)values";
            while(($datos = fgetcsv($gestor,10000,",")) != false){
                if(!$this->existeSim($datos[0])){
                    $query .= "('{$datos[0]}','{$datos[1]}'),";
                }
            }
            $query = substr_replace($query,";",-1);
            if($result = $this->connection->query($query)){
                return json_encode(array('Code'=>0,'Mensaje'=>'Datos registrados'));
            } else {
                return json_encode(array('Code'=>1,'Mensaje'=>'Error al insertar'));
            }
        }
    }

    private function existeSim($numSerie){
        $query = $this->connectionAux->prepare("select * from nemi where NumSerie = ?");
        $query->bind_param('s',$numSerie);
        if($query->execute()){
            $result = $query->get_result();
            return $result->num_rows > 0;
        }
    }
}