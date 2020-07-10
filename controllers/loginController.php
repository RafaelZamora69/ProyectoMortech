<?php 

    require_once 'models/user.php';
    class loginController  {
        
        public function index() {
            require_once 'views/login.php';
        }

        public function login() {
            if(isset($_POST)){
                $user = new user();
                $identity = $user->loginUser($_POST['User'], $_POST['Password']);
                var_dump($identity);
                if($identity){
                    session_start();
                    $_SESSION['identity'] = $identity;
                    header('Location: ' . base_url . '/principal/index');
                }
            }
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

        public function logout(){
            $_SESSION['identity'] = null;
            header('Location: ' . base_url . 'login/index');
        }
    }
?>