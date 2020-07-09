<?php
    class dbConnect {
        public function connect() {
            $connection = mysqli_connect('localhost', 'mortech_login', 'M0rT3cHx099$%&', 'mortech_saldo');
            $connection->query("set names 'utf-8'");
            return $connection;
        }
    }
    
?>