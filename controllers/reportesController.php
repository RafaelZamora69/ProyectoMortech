<?php
require_once 'models/user.php';
require_once 'models/reportes.php';
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

    public function filtro(){
        $reporte = new reportes();
        echo $reporte->consulta($_POST);
        
    }
}
