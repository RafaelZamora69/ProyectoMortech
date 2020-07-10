<?php 
    class user {
        private $Nombre, $User, $Password, $Mail, $Herarchy, $connection;

        function __construct(){
            $connect = new dbConnect();
            $this->connection = $connect->connect();
        }

        function setNombre($Nombre){
            $this->Nombre = $this->connection->real_escape_string($Nombre);
        }

        function getNombre(){
            return $this->Nombre;
        }

        function setUser($User){
            $this->User = $this->connection->real_escape_string($User);
        }

        function getUser(){
            return $this->User;
        }

        function setPassword($Password){
            //Salt encryption
            $this->Password = password_hash($this->connection->real_escape_string($Password),PASSWORD_DEFAULT); 
        }

        function getPassword(){
            return $this->Password;
        }

        function setMail($Mail){
            $this->Mail = $this->connection->real_escape_string($this->Mail);
        }

        function getMail(){
            return $this->connection->real_escape_string($this->Mail);
        }

        function setHerarchy($Herarchy){
            $this->Herarchy = $this->connection->real_escape_string($Herarchy);
        }

        function getHerarchy(){
            return $this->Herarchy;
        }

        function registerUser(){
            //Inserción de datos
            $register = $this->connection->prepare("insert into empleado(Nombre, Correo, Usuario, Password, Jerarquia) values (?,?,?,?,?);");
            $register->bind_param("sssss", $Nombre, $Mail, $User, $Password, $Herarchy); 
            $register->execute() ? $_SESSION['register'] = "complete" : $_SESSION['register'] = "failed";
            header('Location: ' . base_url . 'principal/index');
        }

        function loginUser($User, $Password){
            $login = $this->connection->prepare("select Nombre, Usuario, Password, Jerarquia from empleado where Usuario = ?");
            $login->bind_param("s", $User);
            $login->execute();
            $login->bind_result($Nombre, $User, $UserPassword, $Jerarquia);
            $login->fetch();
            if($Nombre){
                $verify = password_verify($Password, $UserPassword);
                if($verify){
                    return $this;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
    }
    