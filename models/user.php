<?php 
    class user {
        private $id, $Nombre, $User, $Password, $Mail, $Herarchy, $connection;

        function __construct(){
             $this->connection = dbConnect::connect();
        }

        function setId($id){
            $this->id = $id;
        }

        function getId(){
            return $this->id;
        }

        function setNombre($Nombre){
            $this->Nombre = $Nombre;
        }

        function getNombre(){
            return $this->Nombre;
        }

        function setUser($User){
            $this->User = $User;
        }

        function getUser(){
            return $this->User;
        }

        function setPassword($Password){
            //Salt encryption
            $this->Password = password_hash($Password);
        }

        function getPassword(){
            return $this->Password;
        }

        function setMail($Mail){
            return $this->Mail;
        }

        function getMail(){
            return $this->Mail;
        }

        function setHerarchy($Herarchy){
            $this->Herarchy = $Herarchy;
        }

        function getHerarchy(){
            return $this->Herarchy;
        }

        function registerUser(){
            //Inserción de datos
            $register = $this->connection->prepare("insert into empleado(Nombre, Correo, Usuario, Password, Jerarquia) values (?,?,?,?,?);");
            $register->bind_param(1, $this->getNombre());
            $register->bind_param(2, $this->getMail());
            $register->bind_param(3, $this->getUser());
            $register->bind_param(4, $this->getPassword());
            $register->bind_param(5, $this->getHerarchy());
            $register->execute();
        }
    }
    