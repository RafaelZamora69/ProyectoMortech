<?php
    class dbConnect {
        public function connect() {
            $connection = mysqli_connect('localhost', 'root', '', 'mortechsaldo');
            $connection->query("set names 'utf-8'");
            return $connection;
        }

        public function LoginVendedor(){
            $connection = mysqli_connect('localhost', 'mortech_vendedor', 'M0rT3cHx099$%&', 'mortechsaldo');
            return $connection;
        }

        public function LoginAdmin(){
            $connection = mysqli_connect('localhost', 'mortech_admin', 'M0rT3cHx099$%&', 'mortechsaldo');
            return $connection;
        }
    }
    
?>