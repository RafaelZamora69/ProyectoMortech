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
            <a href="#" data-target="menu" class="sidenav-trigger show-on-large"><i class="material-icons">menu</i></a>
            <a href="#">Saldo: $<?= $api->saldoPlataforma() ?></a>
        </div>
    </nav>
    <div class="container">