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
    <div class="container">
        <div class="nav-wrapper">
            <a href="#" data-target="menu" class="sidenav-trigger"><i class="material-icons">menu</i></a>
            <a href="#" class="brand-logo"><?= $_SESSION['identity']['Nombre']?></a>
            <ul class="right hide-on-med-and-down">
                <li><a href="#" class="dropdown-trigger" data-target="dropdownMenu">Menu<i class="material-icons right">arrow_drop_down</i></a></li>
            </ul>
        </div>
    </div>
</nav>
<!-- dropDown -->
<ul id="dropdownMenu" class="dropdown-content">
    <li><a class="waves-effect" href="<?=base_url?>principal/index">Inicio</a></li>
    <li class="divider"></li>
    <li><a class="waves-effect" href="<?=base_url?>servicios/index">Venta de servicio</a></li>
    <li><a href="cliente" class="waves-effect">Busqueda de cliente</a></li>
    <li class="divider"></li>
    <li><a href="reportes" class="waves-effect">Ventas</a></li>
    <li><a href="corte" class="waves-effect">Corte</a></li>
    <li><a href="utilidad" class="waves-effect">Utilidades</a></li>
    <li class="divider"></li>
    <li><a href="<?=base_url?>login/logout" class="waves-effect">Cerrar sesión</a></li>
</ul>
<div class="container">