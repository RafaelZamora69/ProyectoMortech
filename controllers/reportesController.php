<?php
require_once 'models/user.php';
require_once 'models/reportes.php';
require_once 'models/venta.php';
require_once 'models/numero.php';
class reportesController {

    public function index()
    {
        require_once 'views/reportes.php';
    }

    public function borrarVenta(){
        $venta = new venta();
        echo $venta->borrar_venta_recarga($_POST['id'],$_POST['operadora']);
    }

    public function borrar_venta_simple(){
        $venta = new venta();
        echo $venta->borrar_venta($_POST['id']);
    }

    public function infoNemi(){
        $numero = new numero();
        echo $numero->infoNumero($_POST['numero']);
    }

    public function actualizarNemi(){
        $numero = new numero();
        echo $numero->actualizarNemi($_POST['serie'],$_POST['activada']);
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

    public function obtenerDetalles() {
        $reporte = new venta();
        echo $reporte->detalleVenta($_POST['idVenta']);
    }

    public function actualizarVenta() {
        $reporte = new reportes();
        echo $reporte->actualizar($_POST['Empleado'], $_POST['Cliente'], $_POST['idVenta'], $_POST['Mxn'], $_POST['Usd'], $_POST['pagado'], $_POST['Observaciones'], $_POST['Verificada']);
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

    public function consultaRecargas(){
        $reporte = new reportes();
        echo $reporte->reporteRecargas($_POST['From'], $_POST['To']);
    }

    public function consultaServicios(){
        $reporte = new reportes();
        echo $reporte->reporteServicios($_POST['From'], $_POST['To']);
    }

    public function infoNumero(){
        $venta = new venta();
        echo $venta->infoNumero($_POST['Numero']);
    }

    public function serviciosStel(){
        $servicios = new reportes();
        echo $servicios->obtenerServiciosStel();
    }

    public function recargasStel(){
        $recargas = new reportes();
        echo $recargas->obtenerRecargasStel();
    }

    public function reporteNemi(){
        $Nemi = new reportes();
        echo $Nemi->reporteNemi();
    }
}
