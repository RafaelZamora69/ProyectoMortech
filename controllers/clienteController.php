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
        echo $clientes->infoCliente($_POST['idCliente'], $_POST['tipo']);
    }

    public function obtenerClientes()
    {
        $clientes = new user();
        echo $clientes->obtenerClientes();
    }

    public function obtenerNumeros(){
        $clientes = new user();
        echo $clientes->obtenerNumeros();
    }

    public function idCliente()
    {
        $cliente = new user();
        echo $cliente->getIdCliente($_POST['Nombre'], 'id');
    }

    public function buscarNumero(){
        $cliente = new user();
        echo $cliente->getIdCliente($_POST['Nombre'], 'tel');
    }

    public function fixCustomers(){
        $cliente = new user();
        $cliente->fixCustomer();
    }
}
