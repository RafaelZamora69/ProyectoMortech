<?php
include_once './config/conexion.php';

class numero {
    private $connection;

    public function __construct(){
        $con = new dbConnect();
        $this->connection = $con->connect();
    }

    public function infoNumero($numero){
        $query = $this->connection->prepare('select * from nemi where NumNemi = ?');
        $query->bind_param('s',$numero);
        $query->execute();
        $result = $query->get_result();
        $row = $result->fetch_assoc();
        return json_encode(array('NumSerie'=>$row['NumSerie'],'NumNemi'=>$row['NumNemi'],'Activada'=>$row['Activada']));
    }

    public function actualizarNemi($serie, $activada){
        $query = $this->connection->prepare('update nemi set Activada = ? where NumSerie = ?');
        $query->bind_param('is',$activada,$serie);
        if($query->execute()){
            return json_encode(array('code'=>0,'Msg'=>'Sim actualizada'));
        }
    }
}