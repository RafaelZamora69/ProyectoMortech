<?php
require_once 'models/corte.php';
class corteController
{

    public function index()
    {
        require_once 'views/corte.php';
    }

    public function getEmpleados()
    {
        $corte = new corte();
        echo json_encode($corte->getVendedores());
    }

    public function DetallesCorte()
    {
        if (isset($_POST)) {
            var_dump($_POST);
        }
    }
}
