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
                $clientes[] = array('Nombre' => $row['Nombre'], 'Servicio' => $row['NombreServicio'], 'Usd' => $row['Usd'], 'Mxn' => $row['Mxn'], 'Fecha' => $row['fecha'], 'Observaciones' => $row['Observaciones']);
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
            while ($row = $result->fetch_assoc()) {
                $info[] = array('idVenta' => $row['idVenta'], 'Servicio' => $row['NombreServicio'], 'Usd' => $row['Usd'], 'Mxn' => $row['Mxn'], 'fecha' => $row['fecha']);
            }
            return json_encode($info);
        } catch (Exception $e) {
            return json_encode($e->getMessage());
        }
    }
}
