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

    function verificar(){
        $analizar = new verificar();
        echo json_encode($analizar->verificar($_POST['idVenta']));
    }
}