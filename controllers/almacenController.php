<?php
require_once 'models/operadora.php';

class almacenController {

    public function index(){
        require_once 'views/almacen/index.php';
    }

    public function obtenerOperadoras(){
        $operadoras = new operadora();
        echo $operadoras->All();
    }

    public function datosOperadoras(){
        $operadoras = new operadora();
        echo $operadoras->datosOperadoras();
    }
}