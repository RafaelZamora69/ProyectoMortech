<?php
require_once 'venta.php';
class reportes
{
    private $connection;

    function __construct()
    {
        $connect = new dbConnect();
        $this->connection = $connect->connect();
    }

    function consulta($Params)
    {
        try {
            if (strcmp('Ventas', $Params['Tipo']) == 0) {
                if (strcmp('TodosServicios', $Params['Servicio']) == 0) {
                    //Mostrar ambos servicios
                    $reporte = $this->connection->prepare('call ReporteTodo(?,?,?);');
                } elseif (strcmp('Saldo', $Params['Servicio']) == 0) {
                    //Mostrar solo saldo, es una tabla distinta
                    $reporte = $this->connection->prepare('call ReporteSaldo(?,?,?);');
                    if (strcmp(' ', $Params['From']) == 0) {
                        $reporte->bind_param('iss', $Params['Estado'], 'null', 'null');
                    } else {
                        $Params['To'] = $Params['To'] . ' 23:59:59';
                        $reporte->bind_param('iss', $Params['Estado'], $Params['From'], $Params['To']);
                    }
                    $reporte->execute();
                    $result = $reporte->get_result();
                    $arr = [array('Tipo' => 'Saldo')];
                    while ($row = $result->fetch_assoc()) {
                        $arr[] = array(
                            'idVenta' => $row['idVenta'], 'Empleado' => $row['Vendedor'], 'Cliente' => $row['Cliente'], 'Telefono' => $row['NumeroTelefono'], 'Operadora' => $row['Operadora'], 'Monto' => $row['Monto'], 'Venta' => $row['Venta'],
                            'Utilidad' => $row['Utilidad'], 'Verificada' => $row['Verificada'], 'Pagado' => $row['Pagado'], 'Corte' => $row['Corte'],  'fecha' => $row['fecha']
                        );
                    }
                    return json_encode($arr);
                } else {
                    //Mostrar cualquier servicio
                    $reporte = $this->connection->prepare('call ReporteServicio(?,?,?);');
                }
                if (strcmp(' ', $Params['From']) == 0) {
                    $reporte->bind_param('iss', $Params['Estado'], 'null', 'null');
                } else {
                    $Params['To'] = $Params['To'] . ' 23:59:59';
                    $reporte->bind_param('iss', $Params['Estado'], $Params['From'], $Params['To']);
                }
                $reporte->execute();
                $result = $reporte->get_result();
                $arr = [array('Tipo' => 'General')];
                while ($row = $result->fetch_assoc()) {
                    $arr[] = array('idVenta' => $row['idVenta'], 'Empleado' => $row['Vendedor'], 'Servicio' => $row['NombreServicio'], 'Cliente' => $row['Cliente'], 'Venta' => $row['Venta'], 'Pagado' => $row['Pagado'], 'Corte' => $row['Corte'], 'fecha' => $row['fecha']);
                }
            } else {
                $cortes = $this->connection->query('select * from reportecorte');
                $result = [array('Tipo' => 'Corte')];
                while ($row = $cortes->fetch_array(MYSQLI_NUM)) {
                    $result[] = array('Empleado' => $row[0], 'Inicio' => $row[1], 'Fin' => $row[2], 'Usd' => $row[3], 'Mxn' => $row[4]);
                }
                return json_encode($result);
            }
            return json_encode($arr);
        } catch (Exception $e) {
            return json_encode($e->getMessage());
        }
    }

    function actualizar($Empleado, $Cliente, $idVenta, $Mxn, $Usd, $Pagado, $Observaciones) {
        try {
            $actualizar = $this->connection->prepare("update venta set idEmpleado = ?, idCliente = ?, Pagado = ?, Mxn = ?, Usd = ?, Observaciones = ? where idVenta = ?");
            //Conseguir el idCliente o crear uno nuevo
            $cliente = new venta();
            $idCliente = $cliente->getIdCliente($Cliente);
            $idEmpleado = $cliente->getIdEmpleado($Empleado);
            $actualizar->bind_param("iiiddsi",$idEmpleado, $idCliente, $Pagado, $Mxn, $Usd, $Observaciones, $idVenta);
            if ($actualizar->execute()) {
                return json_encode(array('Codigo' => 1, 'Mensaje' => 'Actualizado correctamente'));
            }
        } catch (Exception $e) {
            return json_encode(array('Codigo' => 0, 'Mensaje' => $e->getMessage()));
        }
    }

    function consultaCorte($Desde, $Hasta, $Empleado){
        $query = null;
        if(strcmp($Empleado,'') != 0){
            $venta = new venta();
            $idEmpleado = $venta->getIdEmpleado($Empleado);
            $query = $this->connection->prepare('call DetalleCorteEmpleado(?,?,?)');
            $query->bind_param('iss',$idEmpleado,$Desde,$Hasta);
        } else {
            $query = $this->connection->prepare("call ReporteCorte(?,?)");
            $query->bind_param('ss',$Desde,$Hasta);
        }
        if($query->execute()){
            $result = $query->get_result();
            $array = [];
            while($row = $result->fetch_assoc()){
                $array[] = array('idCorte' => $row['idCorte'], 'Empleado' => $row['Empleado'], 'Iniciado' => $row['IniciadoEl'], 'Realizado' => $row['RealizadoEl'], 'Usd' => $row['Usd'], 'Mxn' => $row['Mxn']);
            }
            return json_encode($array);
        }
    }

    function recargasCorte($idCorte){
        $query = $this->connection->prepare('call RecargasCorte(?)');
        $query->bind_param('i', $idCorte);
        if($query->execute()){
            $result = $query->get_result();
            $recargas = [];
            while($row = $result->fetch_assoc()){
                $recargas[] = array('idVenta' => $row['idVenta'], 'Cliente' => $row['Nombre'], 'Telefono' => $row['NumeroTelefono'], 'Operadora' => $row['Operadora'], 'Monto' => $row['Monto'], 'Usd' => $row['Usd'], 'Mxn' => $row['Mxn'], 'Utilidad' => $row['Utilidad'], 'Observaciones' => $row['Observaciones'], 'Fecha' => $row['fecha']);
            }
            return json_encode($recargas);
        }
    }

    function serviciosCorte($idCorte){
        $query = $this->connection->prepare('call ServiciosCorte(?)');
        $query->bind_param('i', $idCorte);
        if($query->execute()){
            $result = $query->get_result();
            $servicios = [];
            while($row = $result->fetch_assoc()){
                $servicios[] = array('idVenta' => $row['idVenta'], 'Cliente' => $row['Nombre'], 'Servicio' => $row['NombreServicio'], 'Usd' => $row['Usd'], 'Mxn' => $row['Mxn'], 'Fecha' => $row['fecha'], 'Verificada' => $row['Verificada'], 'Observaciones' => $row['Observaciones']);
            }
            return json_encode($servicios);
        }
    }

    function reporteTodo($Desde, $Hasta){
        try {
            $query = $this->connection->prepare('call ReporteTodo(?,?);');
            $query->bind_param('ss',$Desde,$Hasta);
            if($query->execute()){
                $result = $query->get_result();
                $Ventas = [];
                while($row = $result->fetch_array()){
                    $Ventas[] = array('idVenta' => $row['idVenta'], 'Empleado' => $row['Vendedor'], 'Servicio' =>
                        $row['NombreServicio'], 'Cliente' => $row['Cliente'], 'Venta' => $row['Venta'], 'Pagado' =>
                        $row['Pagado'], 'Corte' => $row['Corte'], 'Fecha' => $row['fecha'], 'Verificada' => $row['Verificada']);
                }
                return json_encode($Ventas);
            }
        }catch(Exception $e){
            return json_encode($e->getMessage());
        }
    }

    function reporteRecargas($Desde, $Hasta){
        try{
            $query = $this->connection->prepare('call ReporteSaldo(?,?);');
            $query->bind_param('ss', $Desde, $Hasta);
            if($query->execute()){
                $result = $query->get_result();
                $Ventas = [];
                while($row = $result->fetch_array()){
                    $Ventas[] = array('idVenta' => $row['idVenta'], 'Empleado' => $row['Vendedor'], 'Cliente' =>
                        $row['Cliente'], 'Telefono' => $row['NumeroTelefono'], 'Operadora' => $row['Operadora'],
                        'Monto' => $row['Monto'], 'Venta' => $row['Venta'], 'Utilidad' => $row['Utilidad'],
                        'Verificada' => $row['Verificada'], 'Pagado' => $row['Pagado'], 'Corte' => $row['Corte'], 'Fecha' => $row['fecha']);
                }
                return json_encode($Ventas);
            }
        }catch(Exception $e){
            return json_encode($e->getMessage());
        }
    }

    function reporteServicios($Desde, $Hasta){
        try{
            $query = $this->connection->prepare('call ReporteServicios(?,?)');
            $query->bind_param('ss', $Desde, $Hasta);
            if($query->execute()){
                $result = $query->get_result();
                $Ventas = [];
                while($row = $result->fetch_array()){
                    $Ventas[] = array('idVenta' => $row['idVenta'], 'Empleado' => $row['Vendedor'], 'Cliente' =>
                        $row['Cliente'], 'Servicio' => $row['NombreServicio'], 'Venta' => $row['Venta'], 'Pagado' =>
                        $row['Pagado'], 'Corte' => $row['Corte'], 'Verificada' => $row['Verificada'], 'Fecha' =>
                        $row['fecha']);
                }
                return json_encode($Ventas);
            }
        }catch(Exception $e){
            return json_encode($e->getMessage());
        }
    }
}
