<?php
class compra {
    private $connection;
    function __construct(){
        $conn = new dbConnect();
        $this->connection = $conn->connect();
    }

    private function obtenerImagen($idImagen){
        $con = new dbConnect();
        $conn = $con->connect();
        $imagen = $conn->prepare("select Image from images where idImage = ?");
        $imagen->bind_param('i', $idImagen);
        if($imagen->execute()){
            $result = $imagen->get_result();
            while($row = $result->fetch_assoc()){
                return $row['Image'];
            }
        }
    }

    public function cargarComprasPagadas(){
        try{
            $query = $this->connection->query("select * from compraspagadas");
            $compras = [];
            while($row = $query->fetch_assoc()){
                $compras[] = array('idCompra' => $row['idCompra'],'Nombre' => $row['Nombre'], 'Proveedor' => $row['Proveedor'], 'Referencia' => $row['Referencia'], 'Total' => $row['Total'], 'Fecha' => $row['Fecha']);
            }
            return json_encode($compras);
        }catch(Exception $e){
            return json_encode($e->getMessage());
        }
    }

    public function cargarComprasNoPagadas(){
        try{
            $query = $this->connection->query("select * from comprasnopagadas");
            $compras = [];
            while($row = $query->fetch_assoc()){
                $compras[] = array('idCompra' => $row['idCompra'], 'Nombre' => $row['Nombre'], 'Proveedor' => $row['Proveedor'], 'Referencia' => $row['Referencia'], 'Total' => $row['Total'], 'Fecha' => $row['Fecha']);
            }
            return json_encode($compras);
        }catch(Exception $e){
            return json_encode($e->getMessage());
        }
    }

    public function infoCompra($idCompra){
        try{
            $query = $this->connection->prepare('call InfoCompra(?)');
            $query->bind_param('i', $idCompra);
            if($query->execute()){
                $result = $query->get_result();
                while($row = $result->fetch_assoc()){
                    //echo '<img src="data:image/png;base64,'.base64_encode($this->obtenerImagen($row['idImagen'])).'" />';
                    return json_encode(array('idCompra' => $row['idCompra'], 'Nombre' => $row['Nombre'], 'Proveedor' => $row['Proveedor'], 'Referencia' => $row['Referencia'], 'Total' => $row['Total'], 'Fecha' => $row['Fecha'], 'Imagen' => base64_encode($this->obtenerImagen($row['idImagen'])), 'Pagada' => $row['Pagada']));
                }
            }
        }catch(Exception $e){
            return json_encode($e->getMessage());
        }
    }

    public function actualizarCompra($Estado, $idCompra){
        try{
            $query = $this->connection->prepare('update compra set Pagada = ? where idCompra = ?');
            $query->bind_param('ii', $Estado, $idCompra);
            if($query->execute()){
                return json_encode(array('Codigo' => 0, 'Mensaje' => 'Compra actualizada'));
            }
            return json_encode(array('Codigo' => 1, 'Mensaje' => 'Error al actualizar'));
        }catch(Exception $e){
            return json_encode($e->getMessage());
        }
    }
}