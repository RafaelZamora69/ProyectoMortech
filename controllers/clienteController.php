<?php
require_once 'models/clientes.php';
require_once 'models/user.php';
class clienteController
{

    public function index()
    {
        require_once 'views/cliente.php';
    }

    public function creditoClientes()
    {
        $clientes = new clientes();
        echo $clientes->creditoClientes();
    }

    public function infoCliente()
    {
        $clientes = new clientes();
        echo $clientes->infoCliente($_POST['idCliente']);
    }

    public function obtenerClientes()
    {
        $clientes = new user();
        echo $clientes->obtenerClientes();
    }

    public function idCliente()
    {
        $cliente = new user();
        echo $cliente->getIdCliente($_POST['Nombre']);
    }
}
