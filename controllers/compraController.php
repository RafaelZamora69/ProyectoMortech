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
        echo $compra->cargarComprasPagadas();
    }

    function cargarComprasNoPagadas(){
        $compra = new compra();
        echo $compra->cargarComprasNoPagadas();
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
            echo $compra->actualizarCompra($_POST['Pagado'], $_POST['idCompra']);
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

}
