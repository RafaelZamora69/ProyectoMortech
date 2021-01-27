<?php
require_once 'models/venta.php';
require_once 'models/user.php';
require_once 'models/operadora.php';
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
                $_POST['Numeros'],
                'Recarga de saldo',
                $_POST['Plan'],
                $_POST['PagoMxn'],
                $_POST['PagoUsd'],
                $_POST['Pagado'],
                $_POST['Recarga'],
                $_POST['Nota'],
                $_POST['Tipo']
            );
        } else {
            echo json_encode('Datos no recibidos');
        }
    }

    public function usuarios(){
        require_once 'views/ventasUsuarios.php';
    }

    public function ventasUsuarios(){
        $ventas = new venta();
        echo $ventas->ventasUsuarios($_SESSION['identity']['id']);
    }

    public function pendiente(){
        $venta = new venta();
        echo $venta->ventaPendiente($_POST['idVenta']);
    }

    public function miVenta(){
        $venta = new venta();
        echo $venta->miVenta($_POST['idVenta'], $_SESSION['identity']['Nombre']);
    }

    public function pagada(){
        $venta = new venta();
        echo $venta->pagada($_POST['idVenta']);
    }

    public function recargaNemi(){
        if(isset($_POST)){
            $venta = new venta();
            echo $venta->recargaNemi(
                $_POST['Name'],
                $_POST['Vendedor'],
                $_POST['Numeros'],
                'Recarga de saldo',
                $_POST['Operadora'],
                $_POST['Monto'],
                $_POST['PagoMxn'],
                $_POST['PagoUsd'],
                $_POST['Pagado'],
                $_POST['Nota']
            );
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

    public function Compra(){
        if(isset($_POST)){
            $venta = new venta();
            echo $venta->RegistrarCompra($_SESSION['identity']['Nombre'], $_POST['Proveedor'], $_POST['Referencia'], $_POST['Total'], $_POST['Pagada']);
        }
    }

    function obtenerEmpleados() {
        $empleados = new user();
        echo $empleados->obtenerEmpleados();
    }

    public function obtenerProveedores(){
        $venta = new venta();
        echo $venta->getProveedores();
    }

    public function obtenerClientes(){
        $clientes = new user();
        echo $clientes->obtenerClientes();
    }

    public function cambiarCliente(){
        $venta = new venta();
        $idCliente = $venta->getIdCliente($_POST['Cliente']);
        echo $venta->actualizarCliente($_POST['idVenta'], $idCliente);
    }

    public function comprimirImagen(){
        $venta = new venta();
        $venta->comprimirImagen();
    }

    public function obtenerInfoNemi(){
        if($_POST){
            $nemi = new venta();
            echo $nemi->obtenerInfoNemi($_POST['id']);
        }
    }

    public function obtenerPlanes(){
        $planes = new operadora();
        echo $planes->All();
    }
}
