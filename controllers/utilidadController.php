<?php
require_once 'models/utilidades.php';
    class utilidadController  {
        
        public function index() {
            require_once 'views/utilidad.php';
        }

        public function cargarNemi(){
            $carga = new utilidades();
            echo $carga->cargarNemi($_FILES['Archivo']['tmp_name']);
        }

        public function cargarNumeros(){
            $cargar = new utilidades();
            echo $cargar->cargarNumeros($_FILES['Numeros']['tmp_name']);
        }
    }