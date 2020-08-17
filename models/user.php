<?php
class user
{
    private $Nombre, $User, $Password, $Mail, $Herarchy, $connection;

    function __construct()
    {
        $connect = new dbConnect();
        $this->connection = $connect->connect();
    }

    function setNombre($Nombre)
    {
        $this->Nombre = $this->connection->real_escape_string($Nombre);
    }

    function getNombre()
    {
        return $this->Nombre;
    }

    function setUser($User)
    {
        $this->User = $this->connection->real_escape_string($User);
    }

    function getUser()
    {
        return $this->User;
    }

    function setPassword($Password)
    {
        //Salt encryption
        $this->Password = password_hash($this->connection->real_escape_string($Password), PASSWORD_DEFAULT);
    }

    function getPassword()
    {
        return $this->Password;
    }

    function setMail($Mail)
    {
        $this->Mail = $this->connection->real_escape_string($this->Mail);
    }

    function getMail()
    {
        return $this->connection->real_escape_string($this->Mail);
    }

    function setHerarchy($Herarchy)
    {
        $this->Herarchy = $this->connection->real_escape_string($Herarchy);
    }

    function getHerarchy()
    {
        return $this->Herarchy;
    }

    function registerUser()
    {
        //Inserción de datos
        $register = $this->connection->prepare("insert into empleado(Nombre, Correo, Usuario, Password, Jerarquia) values (?,?,?,?,?);");
        $register->bind_param("sssss", $Nombre, $Mail, $User, $Password, $Herarchy);
        $register->execute() ? $_SESSION['register'] = "complete" : $_SESSION['register'] = "failed";
        header('Location: ' . base_url . 'principal/index');
    }

    function loginUser($User, $Password)
    {
        $login = $this->connection->prepare("select Nombre, Usuario, Password, Jerarquia from empleado where Usuario = ?");
        $login->bind_param("s", $User);
        $login->execute();
        $login->bind_result($Nombre, $User, $UserPassword, $Jerarquia);
        $login->fetch();
        if ($Nombre) {
            $verify = password_verify($Password, $UserPassword);
            if ($verify) {
                $this->setNombre = $Nombre;
                $this->setUser = $User;
                $this->setPassword = $Password;
                $this->setHerarchy = $Jerarquia;
                $datos = array('Nombre' => $Nombre, 'Usuario' => $User, 'Password' => $Password, 'Jerarquia' => $Jerarquia);
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
}
