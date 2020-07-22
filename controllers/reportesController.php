<?php
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
}
