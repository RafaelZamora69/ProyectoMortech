<?php
class corte
{

    private $conexion;

    function __construct()
    {
        $connect = new dbConnect();
        $this->conexion = $connect->connect();
    }
    public function getVendedores()
    {
        try {
            $vendedores = $this->conexion->query('select * from total_corte');
            $result = [];
            while ($row = $vendedores->fetch_array(MYSQLI_NUM)) {
                $result[] = array('Id' => $row[0], 'Nombre' => $row[1], 'Mxn' => $row[2], 'Usd' => $row[3]);
            }
            return $result;
        } catch (Exception $e) {
            return json_encode($e->getMessage());
        }
    }

    public function registrarCorte($Nombre, $Usd, $Mxn)
    {
        echo $this->conexion->real_escape_string($Usd);
    }

    public function detalleCorte($idVendedor)
    {
        try {
            $reporte = $this->conexion->prepare('call DetalleCorte(?);');
            $reporte->bind_param('i', $idVendedor);
            $reporte->execute();
            $result = $reporte->get_result();
            while ($row = $result->fetch_assoc()) {
                return $row;
            }
        } catch (Exception $e) {
            return json_encode($e->getMessage());
        }
    }
}
