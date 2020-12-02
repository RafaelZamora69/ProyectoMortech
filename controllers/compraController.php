<?php
require_once 'models/compra.php';
require_once 'models/user.php';
require_once 'models/venta.php';
class compraController {

    function index(){
        require_once 'views/compra.php';
    }

    function cargarComprasPagadas(){
        $compra = new compra();
        echo $compra->cargarCompras('Pagadas', $_POST['Desde'], $_POST['Hasta']);
    }

    function cargarComprasNoPagadas(){
        $compra = new compra();
        echo $compra->cargarCompras('Pendientes', $_POST['Desde'], $_POST['Hasta']);
    }

    function cargarAmbasCompras(){
        $compra = new compra();
        echo $compra->cargarCompras('Ambas', $_POST['Desde'], $_POST['Hasta']);
    }

    function infoCompra(){
        if(isset($_POST)){
            $compra = new compra();
            echo $compra->infoCompra($_POST['id']);
        }
    }

    function actualizarCompra(){
        if(isset($_POST)){
            $compra = new compra();
            echo $compra->actualizarCompra($_POST['Pagada'], $_POST['idCompra']);
        }
    }

    function eliminarCompra(){
        if(isset($_POST)){
            $compra = new compra();
            echo $compra->eliminarCompra($_POST['idCompra']);
        }
    }

    function obtenerEmpleados() {
        $empleados = new user();
        echo $empleados->obtenerEmpleados();
    }

    function obtenerProveedores(){
        $venta = new venta();
        echo $venta->getProveedores();
    }

    function descargarImagen(){
        $venta = new compra();
        echo $venta->obtenerIdImagen($_POST['idCompra'], 'Web');
    }

    function comprasPagadas(){
        $compra = new compra();
        echo $compra->obtenerComprasPagadas();
    }

    function actualizarCompras(){
        $compra = new compra();
        echo $compra->actualizarCompras($_POST['referenciaStel']);
    }

}
