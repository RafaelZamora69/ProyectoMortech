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
        $name = $this->getUserName($idEmpleado);
        $message = "{$name} ha ingresado {$Sims} tarjetas de {$Operadora}";
        $this->ActualizarLogAlmacen($idEmpleado,$message,$Comentarios);
    }

    public function NotificarSalidaAlmacen($idEmpleado, $Operadora, $Sims, $Comentarios){
        $name = $this->getUserName($idEmpleado);
        $message = "{$name} ha eliminado {$Sims} tarjetas de {$Operadora}";
        $this->ActualizarLogAlmacen($idEmpleado,$message,$Comentarios);
    }

    //Private
    private function ActualizarLogAlmacen($idEmpleado, $message, $comentarios){
        $query = $this->connection->prepare("insert into movimientos(Tabla, Fecha, idEmpleado, Descripcion, Comentarios) values('Operadoras',current_timestamp(),?,?,?)");
        $query->bind_param('iss',$idEmpleado,$message,$comentarios);
        $query->execute();
    }

    private function getUserName($idEmpleado){
        $user = new user();
        return $user->getUserName($idEmpleado);
    }
}