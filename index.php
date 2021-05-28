<?php
session_start();
require_once 'config/parameters.php';
require_once 'autoload.php';
require_once 'config/conexion.php';
require_once 'helpers/utils.php';
require_once 'models/api.php';
$controllerName = $_GET['controller'] . 'Controller';
if (class_exists($controllerName)) {
    $controller = new $controllerName();
    if (isset($_GET['action']) && method_exists($controller, $_GET['action'])) {
        $action = $_GET['action'];
        $controller->$action();
    } elseif (!isset($_GET['controller']) && !isset($_GET['action'])) {
        $default = defaultAction;
        $controller->$default();
    } else {
        echo 'No existe este método ' . $_GET['action'];
    }
} else {
    echo 'No existe esta clase ' . $controllerName;
}
