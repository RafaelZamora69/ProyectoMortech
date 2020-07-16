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
                $result[] = array('Id' => $row[0], 'Nombre' => $row[1], 'Pagar' => $row[2]);
            }
            return $result;
        } catch (Exception $e) {
            return json_encode($e->getMessage());
        }
    }
}
