<?php
    class dbConnect {
        public function connect() {
            $connection = new mysqli_connect('localhost', 'root', '', 'mortechsaldo');
            $connection->query("set names 'utf-8'");
            return $connection;
        }
    }
    
?>