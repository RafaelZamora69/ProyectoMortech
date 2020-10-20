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
                $result[] = array('Id' => $row[0], 'Nombre' => $row[1], 'Mxn' => $row[2], 'CreditoMxn' => $row[3], 'Usd' => $row[4], 'CreditoUsd' => $row[5]);
            }
            return $result;
        } catch (Exception $e) {
            return json_encode($e->getMessage());
        }
    }

    public function getCortes()
    {
        try {
            $cortes = $this->conexion->query('select * from reportecorte');
            $result = [];
            while ($row = $cortes->fetch_array(MYSQLI_NUM)) {
                $result[] = array('Nombre' => $row[0], 'Inicio' => $row[1], 'Fin' => $row[2], 'Usd' => $row[3], 'Mxn' => $row[4]);
            }
            return $result;
        } catch (Exception $e) {
            return json_encode($e->getMessage());
        }
    }

    private function getVendedorId($Nombre)
    {
        $id = $this->conexion->prepare('select idEmpleado from empleado where Nombre = ?');
        $id->bind_param('s', $Nombre);
        $id->execute();
        $id->bind_result($idEmpleado);
        $id->fetch();
        return $idEmpleado;
    }

    public function registrarCorte($Nombre, $Usd, $Mxn)
    {
        try {
            $corte = $this->conexion->prepare('call InsertarCorte(?,?,?)');
            $Usd = str_replace('$ ', '', $Usd);
            $Mxn = str_replace('$ ', '', $Mxn);
            $id = $this->getVendedorId($Nombre);
            $corte->bind_param('idd', $id, $Usd, $Mxn);
            if ($corte->execute()) {
                $corte = $this->conexion->prepare('call ActualizarCorte(?);');
                $id = $this->getVendedorId($Nombre);
                $corte->bind_param('i', $id);
                return $corte->execute() ?
                    json_encode(array('Mensaje' => 'Corte registrado', 'Codigo' => 0)) :
                    json_encode(array('Mensaje' => $corte->error, 'Codigo' => 1));
            } else {
                return json_encode(array('Mensaje' => 'Error al registrar', 'Codigo' => 1)); 
            }
        } catch (Exception $e) {
            return json_encode(array('Mensaje' => $e->getMessage(), 'Codigo' => 1));
        }
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

    public function RecargasCortePreeliminar($idEmpleado){
        try {
            $query = $this->conexion->prepare('call RecargasCortePreeliminar(?)');
            $query->bind_param('i', $idEmpleado);
            if($query->execute()){
                $result = $query->get_result();
                $Ventas = [];
                while($row = $result->fetch_array()){
                    $Ventas[] = array('Cliente' => $row['Cliente'], 'Telefono' => $row['NumeroTelefono'], 'Operadora' => $row['Operadora'], 'Monto' => $row['Monto'], 'Usd' => $row['Usd'], 'Mxn' => $row['Mxn'], 'Fecha' => $row['fecha']);
                }
                return json_encode($Ventas);
            }
        }catch(Exception $e){
            return json_encode($e->getMessage());
        }
    }

    public function ServiciosCortePreeliminar($idEmpleado){
        try {
            $query = $this->conexion->prepare('call ServiciosCortePreeliminar(?)');
            $query->bind_param('i', $idEmpleado);
            if($query->execute()){
                $result = $query->get_result();
                $Ventas = [];
                while($row = $result->fetch_array()){
                    $Ventas[] = array('Cliente' => $row['Cliente'], 'Servicio' => $row['NombreServicio'], 'Usd' => $row['Usd'], 'Mxn' => $row['Mxn'], 'Fecha' => $row['fecha']);
                }
                return json_encode($Ventas);
            }
        }catch(Exception $e){
            return json_encode($e->getMessage());
        }
    }

    public function RecargasCorte($idCorte){

    }

    public function ServiciosCorte($idCorte){

    }
}
