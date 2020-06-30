<?php 
    require_once 'config/parameters.php'; 
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <link rel="stylesheet" href="<?=base_url?>styles/styles.css">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recargas</title>
</head>
<?php
    session_start();
    require_once 'autoload.php';
    require_once 'config/conexion.php';
    require_once 'helpers/utils.php';
    require_once 'models/api.php';
    if (isset($_GET['controller'])) {
        $controllerName = $_GET['controller'].'Controller';
        if (strcmp('loginController', $controllerName) != 0) {
            require_once 'views/layouts/navbar.php';
            require_once 'views/layouts/sidenav.php';
        }
        
    } elseif(!isset($_GET['controller']) && !isset($_GET['action'])) {
        $controllerName = defaultController;
    }else {
        echo 'No existe este controlador';
        exit();
    }
    if (class_exists($controllerName)) {
        $controller = new $controllerName();
        if (isset($_GET['action']) && method_exists($controller, $_GET['action'])) {
            $action = $_GET['action'];
            $controller->$action();
        } elseif(!isset($_GET['controller']) && !isset($_GET['action'])) {
            $default = defaultAction;
            $controller->$default();
        } else {
            echo 'No existe este método';
        }
    } else {
        echo 'No existe esta clase';
    }
?>
</div>
</body>
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
<script src="<?=base_url?>js/index.js"></script>
</html>