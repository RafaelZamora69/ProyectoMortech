<?php 
    class loginController  {
        
        public function index() {
            require_once 'views/login.php';
        }

        public function login() {
            
        }

        public function register() {
            if(isset($_POST)){
                var_dump($_POST);
            }
        }
    }
?>