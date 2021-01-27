<?php

class operadora {
    private $connection;

    function __construct() {
        $connect = new dbConnect();
        $this->connection = $connect->connect();
    }

    public function datosOperadoras(){
        if($query = $this->connection->query('select * from datosoperadoras')){
            $data = [];
            while($row = $query->fetch_assoc()){
                $data[] = array('id'=>$row['idOperadora'],'Operadora'=>$row['Nombre'],'Almacen'=>$row['Almacen'],'Vendidas'=>$row['Vendidas']);
            }
            return json_encode($data);
        }
    }

    public function All(){
        if($query = $this->connection->query('select * from operadorasplanes')){
            $data = [];
            while($row = $query->fetch_assoc()){
                $data[] = array('id'=>$row['idPlan'],'Operadora'=>$row['Operadora'],'Plan'=>$row['Plan']);
            }
            return json_encode($data);
        }
    }

    public function planesAlmacen(){
        if($query = $this->connection->query('select * from planesalmacen')){
            $data = [];
            while($row = $query->fetch_assoc()){
                $data[] = array('Operadora'=>$row['Operadora'],'Plan'=>$row['Plan'],'Inventario'=>$row['inventario']);
            }
            return json_encode($data);
        }
    }

    public function Modificar($idPlan, $Cantidad, $Accion){
        if(strcmp($Accion,'Agregar') == 0){
            $inventario = intval($this->obtenerSimsOperadora($idPlan)) + intval($Cantidad);
        } else {
            $inventario = intval($this->obtenerSimsOperadora($idPlan)) - intval($Cantidad);
        }
        $query = $this->connection->prepare('update planes set inventario = ? where idPlan = ?');
        $query->bind_param('ii', $inventario, $idPlan);
        if($query->execute()){
            return json_encode(array('Code'=>0,'Msg'=>'Almacén actualizado'));
        } else {
            return json_encode(array('Code'=>1,'Msg'=>'Error al actualizar: ' . $query->error_list));
        }
    }

    public function obtenerOperadora($idPlan){
        $query = $this->connection->query("call infoPlan({$idPlan});");
        $row = $query->fetch_assoc();
        return array('idPlan' => $row['idPlan'],'idOperadora' => $row['idOperadora'], 'Operadora' => $row['Nombre'], 'Costo' => $row['costo']);
    }

    public function descontar($idPlan){
        $inventario = intval($this->obtenerSimsOperadora($idPlan)) - 1;
        echo $inventario;
        $this->connection->query("update planes set inventario = {$inventario} where idPlan = {$idPlan}");
    }

    //private
    private function obtenerSimsOperadora($idPlan){
        if($query = $this->connection->query("select sum(inventario) As inventario from planes where idPlan = {$idPlan}")){
            $result = $query->fetch_assoc();
            return $result['inventario'];
        }
    }
}