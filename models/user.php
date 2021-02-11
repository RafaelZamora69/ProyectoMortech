<?php
class user
{
    private $connection;

    function __construct()
    {
        $connect = new dbConnect();
        $this->connection = $connect->connect();
    }

    function loginUser($User, $Password)
    {
        $login = $this->connection->prepare("select * from empleado where Usuario = ?");
        $login->bind_param("s", $User);
        $login->execute();
        $login->bind_result($idEmpleado, $Nombre, $Usuario, $UsuarioLinntae, $UserPassword, $PasswordPlataforma, $Jerarquia);
        $login->fetch();
        if ($idEmpleado) {
            $verify = password_verify($Password, $UserPassword);
            if ($verify) {
                $this->setNombre = $Nombre;
                $this->setUser = $UsuarioLinntae;
                $this->setPassword = $PasswordPlataforma;
                $this->setHerarchy = $Jerarquia;
                $datos = array('id' => $idEmpleado, 'Nombre' => $Nombre, 'Usuario' => $UsuarioLinntae, 'Password' => $Password, 'Jerarquia' => $Jerarquia);
                return $datos;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    function obtenerEmpleados()
    {
        $empleados = [];
        $query = $this->connection->query("select Nombre from empleado;");
        while ($row = $query->fetch_assoc()) {
            $empleados[] = $row["Nombre"];
        }
        return json_encode($empleados);
    }

    function obtenerEmpleadosVista(){
        $empleados = [];
        $query = $this->connection->query("select idEmpleado, Nombre, Jerarquia from empleado;");
        while($row = $query->fetch_assoc()){
            $empleados[] = array("id" => $row["idEmpleado"], "Nombre" => $row["Nombre"], "Jerarquia" => $row["Jerarquia"]);
        }
        return json_encode($empleados);
    }

    function obtenerClientes()
    {
        $clientes = [];
        $query = $this->connection->query("select Nombre from cliente;");
        while ($row = $query->fetch_assoc()) {
            $clientes[] = $row['Nombre'];
        }
        return json_encode($clientes);
    }

    public function obtenerNumeros(){
        $query = $this->connection->query("select NumeroTelefono from venta where Pagado = 0");
        while($row = $query->fetch_assoc()){
            $numeros[] = $row['NumeroTelefono'];
        }
        return json_encode($numeros);
    }

    function getIdCliente($value, $tipo) {
        try {
            if(strcmp('id', $tipo) == 0) {
                $query = $this->connection->prepare("select idCliente from cliente where nombre = ?");
            } else {
                $query = $this->connection->prepare("select venta.idCliente, cliente.Nombre from venta inner join cliente on venta.idCliente = cliente.idCliente where NumeroTelefono = ?");
            }
            $query->bind_param("s", $value);
            $query->execute();
            $result = $query->get_result();
            if(strcmp('id', $tipo) == 0) {
                while ($row = $result->fetch_assoc()) {
                    return $row['idCliente'];
                }
            } else {
                while ($row = $result->fetch_assoc()) {
                    return json_encode(array('idCliente' => $row['idCliente'], 'Nombre' => $row['Nombre']));
                }
            }
        } catch (Exception $e) {
            return json_encode($e->getMessage());
        }
    }

    public function fixCustomer(){
        try{
            $consulta = $this->connection->query("select Nombre from cliente where Nombre like '% ';");
            $clientes = [];
            while ($row = $consulta->fetch_assoc()){
                echo $row['Nombre'] . '<br>';
                $clientes[] = $row['Nombre'];
            }
            foreach ($clientes as $cliente){
                $clienteProcesado = trim($cliente);
                $consulta = $this->connection->prepare("update cliente set Nombre = ? where Nombre = ?");
                $consulta->bind_param("ss", $clienteProcesado, $cliente);
                if($consulta->execute()){
                    echo "Actualizado !" . '<br>';
                }
            }
            $consulta = $this->connection->query("select Nombre from cliente where Nombre like '% ';");
            $clientes = [];
            while ($row = $consulta->fetch_assoc()) {
                echo $row['Nombre'] . '<br>';
            }
        }catch(Exception $e){
            echo $e->getMessage();
        }
    }

    public function getUserName($userId){
        if($query = $this->connection->query("select Nombre from empleado where idEmpleado = {$userId}")){
            $row = $query->fetch_row();
            return $row['Nombre'];
        }
    }
}
