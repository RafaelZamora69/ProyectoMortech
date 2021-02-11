<?php
include_once './config/conexion.php';
include_once './models/user.php';
class Observer {
    private $connection;

    function __construct(){
        $con = new dbConnect();
        $this->connection = $con->connect();
    }

    public function NotificarIngresoAlmacen($idEmpleado, $Operadora, $Sims, $Comentarios){
        $user = new user();
        $name = $user->getUserName($idEmpleado);
        $message = "{$name} ha ingresado {$Sims} tarjetas de {$Operadora}";
        $query = $this->connection->prepare("insert into movimientos(Tabla, Fecha, idEmpleado, Descripcion, Comentarios) values('Operadoras',current_timestamp(),?,?,?)");
        $query->bind_param('iss',$idEmpleado,$message,$Comentarios);
        var_dump($query);
        echo $query;
    }
}