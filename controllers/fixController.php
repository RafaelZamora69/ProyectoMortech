<?php
include_once 'config/conexion.php';
class fixController {
    function fix(){
        $conexion = new dbConnect();
        $con = $conexion->connect();
        $con->query("select Nombre from cliente");
        while($row = $con->fetch_assoc()){
            echo $row['Nombre'] . '<br>';
        }
    }
}