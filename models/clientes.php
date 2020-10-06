<?php

class clientes
{
    private $connection;

    function __construct()
    {
        $connect = new dbConnect();
        $this->connection = $connect->connect();
    }

    public function creditoClientes()
    {
        try {
            $query = $this->connection->query("select * from clientescredito;");
            $clientes = [];
            while ($row = $query->fetch_assoc()) {
                $clientes[] = array('Empleado' => $row['Empleado'], 'Nombre' => $row['Nombre'], 'NumeroTelefono' => $row['NumeroTelefono'], 'Usd' => $row['Usd'], 'Mxn' => $row['Mxn'], 'Fecha' => $row['fecha'], 'Observaciones' => $row['Observaciones']);
            }
            return json_encode($clientes);
        } catch (Exception $e) {
            return json_encode($e->getMessage());
        }
    }

    public function infoCliente($idCliente, $tipo)
    {
        try {
            $query = $this->connection->prepare("call DetalleCliente(?,?)");
            $query->bind_param("is", $idCliente, $tipo);
            $query->execute();
            $result = $query->get_result();
            $info = [];
            while ($row = $result->fetch_assoc()) {
                $info[] = array('idVenta' => $row['idVenta'], 'Empleado' => $row['Nombre'], 'Numero' => $row['NumeroTelefono'], 'Saldo' => $row['Monto'] ,'Usd' => $row['Usd'], 'Mxn' => $row['Mxn'], 'fecha' => $row['fecha'],'Observaciones' => $row['Observaciones'], 'Operadora' => $row['Operadora']);
            }
            return json_encode($info);
        } catch (Exception $e) {
            return json_encode($e->getMessage());
        }
    }
}
