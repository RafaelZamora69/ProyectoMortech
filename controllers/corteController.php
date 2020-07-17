<?php
require_once 'models/corte.php';
class corteController
{
    private $corte;

    function __construct()
    {
        $this->corte = new corte();
    }

    public function index()
    {
        require_once 'views/corte.php';
    }

    public function getEmpleados()
    {
        echo json_encode($this->corte->getVendedores());
    }

    public function DetallesCorte()
    {
        if (isset($_POST)) {
            echo json_encode($this->corte->detalleCorte($_POST['IdVendedor']));
        }
    }

    public function RegistrarCorte()
    {
        if (isset($_POST)) {
            echo $this->corte->registrarCorte($_POST['Nombre'], $_POST['Usd'], $_POST['Mxn']);
        }
    }
}
