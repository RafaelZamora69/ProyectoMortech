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
                                        $_POST['Vendedor'],
                                        $_POST['numeros'],
                                        'Recarga de salgo',
                                        $_POST['Carrier'],
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
            if(isset($_POST)){
                $venta = new venta();
                echo $venta->VentaServicio($_POST['NombreCliente'],
                                            $_POST['Vendedor'],
                                            $_POST['Service'],
                                            $_POST['CobroServicio'],
                                            $_POST['Pagado'],
                                            $_POST['NotaServicio']);
            } else {
                echo json_encode('Datos no recibidos');
            }
        }
    }