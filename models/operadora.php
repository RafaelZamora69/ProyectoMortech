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
        if($query = $this->connection->query('select * from operadoras where Activa = 1')){
            $data = [];
            while($row = $query->fetch_assoc()){
                $data[] = array('id'=>$row['idOperadora'],'Nombre'=>$row['Nombre'],'Almacen'=>$row['Almacen']);
            }
            return json_encode($data);
        }
    }

    public function obtenerPlanes(){
        if($query = $this->connection->query("select * from operadorasplanes")){
            $data = [];
            while($row = $query->fetch_assoc()){
                $data[] = array('id'=>$row['idPlan'],'Operadora'=>$row['Operadora'],'Plan'=>$row['Plan']);
            }
            return json_encode($data);
        }
    }

    public function Modificar($idOperadora, $Cantidad, $Accion){
        if(strcmp($Accion,'Agregar') == 0){
            $inventario = intval($this->obtenerSimsOperadora($idOperadora)) + intval($Cantidad);
        } else {
            $inventario = intval($this->obtenerSimsOperadora($idOperadora)) - intval($Cantidad);
        }
        $query = $this->connection->prepare("update operadoras set Almacen = ? where idOperadora = ?");
        $query->bind_param('ii', $inventario, $idOperadora);
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

    public function descontar($idOperadora){
        $inventario = intval($this->obtenerSimsOperadora($idOperadora)) - 1;
        $this->connection->query("update operadoras set Almacen = {$inventario} where idOperadora = {$idOperadora}");
    }

    //private
    private function obtenerSimsOperadora($idOperadora){
        if($query = $this->connection->query("select Almacen from operadoras where idOperadora = {$idOperadora};")){
            $result = $query->fetch_assoc();
            return $result['Almacen'];
        }
    }
}