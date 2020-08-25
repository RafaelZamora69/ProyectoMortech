<?php
require_once 'models/user.php';
require_once 'models/reportes.php';
require_once 'models/venta.php';
class reportesController
{

    public function index()
    {
        require_once 'views/reportes.php';
    }

    public function reporteVentas()
    {
        if (isset($_POST)) {
            var_dump($_POST);
        }
    }

    public function obtenerEmpleados()
    {
        $empleados = new user();
        echo $empleados->obtenerEmpleados();
    }

    public function obtenerClientes()
    {
        $clientes = new user();
        echo $clientes->obtenerClientes();
    }

    public function filtro()
    {
        $reporte = new reportes();
        echo $reporte->consulta($_POST);
    }

    public function obtenerDetalles() {
        $reporte = new venta();
        echo $reporte->detalleVenta($_POST['idVenta']);
    }

    public function actualizarVenta() {
        $reporte = new reportes();
        echo $reporte->actualizar($_POST['Empleado'], $_POST['Cliente'], $_POST['idVenta'], $_POST['Mxn'], $_POST['Usd'], $_POST['pagado'], $_POST['Observaciones']);
    }
}
