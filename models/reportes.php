<?php
class reportes
{
    private $connection;

    function __construct()
    {
        $connect = new dbConnect();
        $this->connection = $connect->connect();
    }

    function consulta($Params){
        try{
            if(strcmp('Ventas', $Params['Tipo']) == 0){
                if(strcmp('TodosServicios', $Params['Servicio']) == 0) {
                    //Mostrar ambos servicios
                    $reporte = $this->connection->prepare('call ReporteTodo(?,?,?);');
                } elseif(strcmp('Saldo', $Params['Servicio']) == 0) {
                    //Mostrar solo saldo, es una tabla distinta
                    $reporte = $this->connection->prepare('call ReporteSaldo(?,?,?);');
                    strcmp(' ', $Params['From']) == 0 ? $reporte->bind_param('iss', $Params['Estado'], 'null', 'null') :
                    $reporte->bind_param('iss', $Params['Estado'], $Params['From'], $Params['To']);
                    $reporte->execute();
                    $result = $reporte->get_result();
                    $arr = [];
                    while ($row = $result->fetch_assoc()) {
                        $arr[] = array('idVenta' => $row['idVenta'], 'Vendedor' => $row['Vendedor'], 'Cliente' => $row['Cliente'], 'Telefono' => $row['NumeroTelefono'], 'Operadora' => $row['Operadora'], 'Monto' => $row['Monto'] ,'Venta' => $row['Venta'], 
                        'Pagado' => $row['Pagado'], 'fecha' => $row['fecha']);
                    }
                    return json_encode($arr);
                } else {
                    //Mostrar cualquier servicio
                    $reporte = $this->connection->prepare('call ReporteServicio(?,?,?);');
                }
                strcmp(' ', $Params['From']) == 0 ? $reporte->bind_param('iss', $Params['Estado'], 'null', 'null') :
                $reporte->bind_param('iss', $Params['Estado'], $Params['From'], $Params['To']);
                $reporte->execute();
                $result = $reporte->get_result();
                $arr = [];
                while ($row = $result->fetch_assoc()) {
                    $arr[] = array('idVenta' => $row['idVenta'], 'Vendedor' => $row['Vendedor'], 'Servicio' => $row['NombreServicio'], 'Cliente' => $row['Cliente'], 'Venta' => $row['Venta'], 'Pagado' => $row['Pagado'], 'fecha' => $row['fecha']);
                }
            } else {
                $cortes = $this->connection->query('select * from reportecorte');
                $result = [];
                while ($row = $cortes->fetch_array(MYSQLI_NUM)) {
                    $result[] = array('Nombre' => $row[0], 'Inicio' => $row[1], 'Fin' => $row[2], 'Usd' => $row[3], 'Mxn' => $row[4]);
                }
                return json_encode($result);
            }
            return json_encode($arr);
        } catch(Exception $e){
            return json_encode($e->getMessage());
        }
    }
}
