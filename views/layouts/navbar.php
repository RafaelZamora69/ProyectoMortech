<?php
$api = new api();
$api->setUser($_SESSION['identity']['Usuario']);
$api->setPassword($_SESSION['identity']['Password']);
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Consulta saldo</title>
</head>

<body>
    <nav class="red">
        <div class="nav-wrapper">
            <a href="#" data-target="menu" class="sidenav-trigger"><i class="material-icons">menu</i></a>
            <a href="#">Saldo: $<?= $api->saldoPlataforma() ?></a>
            <a href="#"><?= $_SESSION['identity']['Nombre'] ?></a>
            <ul class="right hide-on-small-only">
                <li></li>
                <li><a href="#" class="dropdown-trigger" data-target="dropdownMenu">Menu<i class="material-icons right">arrow_drop_down</i></a></li>
            </ul>
        </div>
    </nav>
    <!-- dropDown -->
    <ul id="dropdownMenu" class="dropdown-content">
        <li><a class="waves-effect" href="<?= base_url ?>principal/index">Inicio</a></li>
        <li class="divider"></li>
        <li><a class="waves-effect" href="<?= base_url ?>servicios/index">Venta de servicio</a></li>
        <li><a href="<?= base_url ?>cliente/index" class="waves-effect">Busqueda de cliente</a></li>
        <li><a href="<?= base_url ?>compra/usuario" class="waves-effect">Mis compras</a></li>
        <li><a href="<?= base_url ?>servicios/usuarios" class="waves-effect">Modificaciones</a></li>
        <?php if ($_SESSION['identity']['Jerarquia'] == 'Administrador') : ?>
            <li class="divider"></li>
            <li><a href="<?= base_url ?>compra/index" class="waves-effect">Compras</a></li>
            <li><a href="<?= base_url ?>verificar/index" class="waves-effect">Verificar servicios</a></li>
            <li><a href="<?= base_url ?>reportes/index" class="waves-effect">Reportes</a></li>
            <li><a href="<?= base_url ?>corte/index" class="waves-effect">Corte</a></li>
            <li><a href="<?= base_url ?>utilidad/index" class="waves-effect">Utilidades</a></li>
            <li><a href="<?= base_url ?>usuario/index" class="waves-effect">Usuarios</a></li>
        <?php endif ?>
        <li class="divider"></li>
        <li><a href="<?= base_url ?>login/logout" class="waves-effect">Cerrar sesión</a></li>
    </ul>
    <div class="container">