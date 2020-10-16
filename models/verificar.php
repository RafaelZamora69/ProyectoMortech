<?php
class verificar {

    private $connection;

    function __construct() {
        $connect = new dbConnect();
        $this->connection = $connect->connect();
    }

    private function comparar($Compras){
        try{
            $Mensajes = [];
            for($i = 0; $i < sizeof($Compras); $i++){
                $query = "select e.Nombre, NombreServicio, Usd, Verificada, fecha 
	                from venta inner join empleado e on venta.idEmpleado = e.idEmpleado
	                where venta.NombreServicio = '{$Compras[$i]['Orden']}';";
                if($result = $this->connection->query($query)){
                    if($result->num_rows > 0){
                        $row = $result->fetch_array();
                        if(strcmp($row['Verificada'], '0') == 0){
                            if($Compras[$i]['Total'] == $row['Usd']){
                                $Mensajes[] = array('Codigo' => 0, 'Orden' => $Compras[$i]['Orden'],'Mensaje' => 'Correcta', 'Empleado' => $row['Nombre'], 'Fecha' => $row['fecha']);
                                if($this->connection->query("update venta set Verificada = 1 where NombreServicio = '{$Compras[$i]['Orden']}'")){
                                    echo "Venta verificada";
                                }
                            } elseif($Compras[$i]['Total'] < $row['Usd']){
                                $Falta = (double)$row['Usd'] - (double)$Compras[$i]['Total'];
                                $Mensajes[] = array('Codigo' => 2, 'Orden' => $Compras[$i]['Orden'],'Mensaje' => "Faltan {$Falta} Usd", 'Empleado' => $row['Nombre'], 'Fecha' => $row['fecha']);
                            } elseif($Compras[$i]['Total'] > $row['Usd']){
                                $Sobra = (double)$Compras[$i]['Total'] - (double)$row['Usd'] ;
                                $Mensajes[] = array('Codigo' => 2, 'Orden' => $Compras[$i]['Orden'],'Mensaje' => "Sobran {$Sobra} Usd", 'Empleado' => $row['Nombre'], 'Fecha' => $row['fecha']);
                            }
                        }
                    } else {
                        $Mensajes[] = array('Codigo' => 1, 'Orden' => $Compras[$i]['Orden'],'Mensaje' => "No existe");
                    }
                }
            }
            return json_encode($Mensajes);
        }catch(Exception $e){
            return json_encode($e->getMessage());
        }
    }

    function analizar($Archivo){
        if(($gestor = fopen($Archivo, "r")) != false){
            $Total = 0;
            $Compras = [];
            while(($datos = fgetcsv($gestor,10000,",")) != false){
                if($Total == 0){
                    $orden = $datos[0];
                }
                $filas = count($datos);
                $flag = true;
                for($i = 0; $i < $filas; $i++){
                    //Si es verdadero, es una orden
                    if($flag){
                        //La orden es la misma
                        if(strcmp($orden, $datos[$i]) == 0){
                            $Total += $datos[$i + 1];
                        } else {
                            $Compras[] = array('Orden' => $orden, 'Total' => $Total);
                            $orden = $datos[$i];
                            $Total = 0;
                            $Total += $datos[$i + 1];
                        }
                        $flag = false;
                    }
                }
            }
            $Compras[] = array('Orden' => $orden, 'Total' => $Total);
            return $this->comparar($Compras);
        }
    }



}