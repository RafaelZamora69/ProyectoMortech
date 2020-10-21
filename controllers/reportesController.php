<?php
require_once 'models/user.php';
require_once 'models/reportes.php';
require_once 'models/venta.php';
class reportesController {

    public function index()
    {
        require_once 'views/reportes.php';
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

    public function consultaCorte(){
        $reporte = new reportes();
        echo $reporte->consultaCorte($_POST['From'], $_POST['To'], $_POST['Empleado']);
    }

    public function recargasCorte(){
        $reporte = new reportes();
        echo $reporte->recargasCorte($_POST['idCorte']);
    }

    public function serviciosCorte(){
        $reporte = new reportes();
        echo $reporte->serviciosCorte($_POST['idCorte']);
    }

    public function consultaTodosServicios(){
        $reporte = new reportes();
        echo $reporte->reporteTodo($_POST['From'], $_POST['To']);
    }
}
