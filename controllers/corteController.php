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

    public function MostrarCortes()
    {
        echo json_encode($this->corte->getCortes());
    }

    public function RegistrarCorte()
    {
        if (isset($_POST)) {
            echo $this->corte->registrarCorte($_POST['Nombre'], $_POST['Usd'], $_POST['Mxn']);
        }
    }

    public function RecargasCortePreeliminar(){
        echo $this->corte->RecargasCortePreeliminar($_POST['IdEmpleado']);
    }

    public function ServiciosCortePreeliminar(){
        echo $this->corte->ServiciosCortePreeliminar($_POST['IdEmpleado']);
    }
}
