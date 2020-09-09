<?php
require_once 'models/venta.php';
require_once 'models/user.php';
class serviciosController
{

    public function index()
    {
        require_once 'views/servicio.php';
    }
    public function recargaSaldo()
    {
        if (isset($_POST)) {
            $venta = new venta();
            echo $venta->InsertarRecarga(
                $_POST['Name'],
                $_POST['Vendedor'],
                $_POST['numeros'],
                'Recarga de saldo',
                $_POST['Operadora'],
                $_POST['Monto'],
                $_POST['PagoMxn'],
                $_POST['PagoUsd'],
                $_POST['Pagado'],
                $_POST['Nota'],
                $_POST['Carrier']
            );
        } else {
            echo json_encode('Datos no recibidos');
        }
    }

    public function buscarNumero(){
        $venta = new venta();
        echo $venta->infoNumero($_POST['Numero']);
    }

    public function nombresClientes()
    {
        $clientes = new user();
        echo $clientes->obtenerClientes();
    }

    public function ventaServicio()
    {
        if (isset($_POST)) {
            $venta = new venta();
            echo $venta->VentaServicio(
                $_POST['NombreCliente'],
                $_POST['Vendedor'],
                $_POST['Service'],
                $_POST['UsdServicio'],
                $_POST['MxnServicio'],
                $_POST['Pagado'],
                $_POST['NotaServicio']
            );
        } else {
            echo json_encode('Datos no recibidos');
        }
    }
}
