<?php
include_once 'models/user.php';
class usuarioController{

    public function index(){
        include_once 'views/usuarios.php';
    }

    public function obtenerUsuarios(){
        $usuario = new user();
        echo $usuario->obtenerEmpleadosVista();
    }
}