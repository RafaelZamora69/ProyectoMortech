<?php
class compra
{
    private $connection;

    function __construct()
    {
        $conn = new dbConnect();
        $this->connection = $conn->connect();
    }

    private function obtenerImagen($idImagen)
    {
        $con = new dbConnect();
        $conn = $con->connect();
        $imagen = $conn->prepare("select Image from images where idImage = ?");
        $imagen->bind_param('i', $idImagen);
        if ($imagen->execute()) {
            $result = $imagen->get_result();
            while ($row = $result->fetch_assoc()) {
                return $row['Image'];
            }
        }
    }

    private function eliminarImagen($idImagen)
    {
        if ($this->connection->query("delete from images where idImage = {$idImagen}")) {
            return json_encode(array('Codigo' => 0, 'Mensaje' => 'Compra eliminada'));
        }
    }

    public function obtenerIdImagen($idCompra, $modo)
    {
        $query = $this->connection->prepare("select idImagen from compra where idCompra = ?");
        $query->bind_param('i', $idCompra);
        if ($query->execute()) {
            $result = $query->get_result();
            $idImagen = null;
            while ($row = $result->fetch_assoc()) {
                return strcmp('Web', $modo) == 0 ? json_encode(array('Imagen' => base64_encode($this->obtenerImagen($row['idImagen'])))) : $row['idImagen'];
            }
        }
    }

    public function cargarCompras($Tipo, $Desde, $Hasta)
    {
        $query = null;
        switch ($Tipo) {
            case 'Pagadas':
                $query = $this->connection->prepare("call ComprasPagadas(?,?)");
                break;
            case 'Pendientes':
                $query = $this->connection->prepare("call ComprasPendientes(?,?)");
                break;
            case 'Ambas':
                $query = $this->connection->prepare("call TodasCompras(?,?)");
                break;
        }
        $query->bind_param('ss', $Desde, $Hasta);
        if ($query->execute()) {
            $compras = [];
            $result = $query->get_result();
            if(strcmp($Tipo,'Pagadas') == 0){
                while ($row = $result->fetch_array()) {
                    $compras[] = array('idCompra' => $row['idCompra'], 'Nombre' => $row['Nombre'], 'Proveedor' => $row['Proveedor'], 'Referencia' => $row['Referencia'], 'Total' => $row['Total'], 'Pagada' => $row['Pagada'], 'Fecha' => $row['Fecha'], 'Stel' => $row['ReferenciaStel']);
                }
            } else {
                while ($row = $result->fetch_array()) {
                    $compras[] = array('idCompra' => $row['idCompra'], 'Nombre' => $row['Nombre'], 'Proveedor' => $row['Proveedor'], 'Referencia' => $row['Referencia'], 'Total' => $row['Total'], 'Pagada' => $row['Pagada'], 'Fecha' => $row['Fecha']);
                }
            }
            return json_encode($compras);
        }
    }

    public function infoCompra($idCompra)
    {
        try {
            $query = $this->connection->prepare('call InfoCompra(?)');
            $query->bind_param('i', $idCompra);
            if ($query->execute()) {
                $result = $query->get_result();
                while ($row = $result->fetch_assoc()) {
                    return json_encode(array('idCompra' => $row['idCompra'], 'Nombre' => $row['Nombre'], 'Proveedor' => $row['Proveedor'], 'Referencia' => $row['Referencia'], 'Total' => $row['Total'], 'Fecha' => $row['Fecha'], 'Imagen' => base64_encode($this->obtenerImagen($row['idImagen'])), 'Pagada' => $row['Pagada']));
                }
            }
        } catch (Exception $e) {
            return json_encode($e->getMessage());
        }
    }

    public function actualizarCompra($Estado, $idCompra)
    {
        try {
            $query = $this->connection->prepare('update compra set Pagada = ? where idCompra = ?');
            $query->bind_param('si', $Estado, $idCompra);
            if ($query->execute()) {
                return json_encode(array('Codigo' => 0, 'Mensaje' => 'Compra actualizada'));
            }
            return json_encode(array('Codigo' => 1, 'Mensaje' => 'Error al actualizar'));
        } catch (Exception $e) {
            return json_encode($e->getMessage());
        }
    }

    public function eliminarCompra($idCompra)
    {
        try {
            $idCompra = $this->connection->real_escape_string($idCompra);
            $idImagen = $this->obtenerIdImagen($idCompra, 'Api');
            if ($this->connection->query("delete from compra where idCompra = {$idCompra}")) {
                return $this->eliminarImagen($idImagen);
            }
        } catch (Exception $e) {
            return json_encode($e->getMessage());
        }
    }

    public function obtenerComprasPagadas()
    {
        $query = $this->connection->query("select idCompra,Pagada,Total from compra where Pagada != 'Sin pagar' and Pagada != 'Pagada' and Registrada = 0");
        $compras = [];
        while ($row = $query->fetch_assoc()) {
            $compras[] = array('idCompra' => $row['idCompra'], 'Pagada' => $row['Pagada'], 'Total' => $row['Total']);
        }
        return json_encode($compras);
    }

    public function actualizarCompras($ReferenciaStel) {
        $query = $this->connection->prepare("update compra set Registrada = 1, ReferenciaStel = ? where Registrada = 0 and Pagada != 'Sin pagar'");
        $query->bind_param('s', $ReferenciaStel);
        if($query->execute()){
            return json_encode(array('Codigo' => 0, 'Mensaje' => 'Compras registradas'));
        }
    }
}