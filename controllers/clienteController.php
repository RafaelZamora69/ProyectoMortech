<?php
require_once 'models/clientes.php';
class clienteController
{

    public function index()
    {
        require_once 'views/cliente.php';
    }

    public function creditoClientes(){
        $clientes = new clientes();
        echo $clientes->creditoClientes();
    }
}
