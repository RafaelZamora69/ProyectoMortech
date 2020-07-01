<?php 
    require_once 'models/venta.php';
    class serviciosController  {
        
        public function index() {
            require_once 'views/servicio.php';
        }

        public function recargaSaldo(){
            if(isset($_POST)){
                $venta = new venta();
                echo $venta->InsertarRecarga($_POST['Name'],
                                        'Prueba',
                                        $_POST['numeros'],
                                        'Recarga de salgo',
                                        $_POST['Operadora'],
                                        $_POST['Monto'],
                                        $_POST['Pago'],
                                        $_POST['Pagado'],
                                        $_POST['Nota']);
            } else {
                echo json_encode('Datos no recibidos');
            }
        }

        public function nombresClientes(){
            $venta = new venta();
            echo json_encode($venta->obtenerClientes());
            
        }

        public function ventaServicio(){

        }
    }