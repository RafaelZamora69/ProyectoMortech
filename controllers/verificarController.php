<?php
require_once 'models/verificar.php';
class verificarController {

    public function index(){
        require_once 'views/verificar.php';
    }

    public function analizar(){
        $analizar = new verificar();
        echo $analizar->analizar($_FILES['Archivo']['tmp_name']);
    }
}