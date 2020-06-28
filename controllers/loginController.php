<?php 

    require_once 'models/user.php';
    class loginController  {
        
        public function index() {
            require_once 'views/login.php';
        }

        public function login() {
            
        }

        public function register() {
            if(isset($_POST)){
                $user = new user();
                $user->setNombre($_POST['Nombre']);
                $user->setUser($_POST['Usuario']);
                $user->setPassword($_POST['Password']);
                $user->setMail($_POST['Correo']);
                $user->setHerarchy('vendedor');
                $user->registerUser();
            }
        }
    }
?>