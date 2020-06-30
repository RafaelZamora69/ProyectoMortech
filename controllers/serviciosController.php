<?php 
    require_once 'models/venta.php';
    class serviciosController  {
        
        public function index() {
            require_once 'views/servicio.php';
        }

        public function recargaSaldo(){
            if(isset($_POST)){
                echo json_encode('Datos recibidos');
            } else {
                echo json_encode('Datos no recibidos');
            }
        }

        public function ventaServicio(){

        }
    }