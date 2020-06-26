<?php
    //Datos de acceso
    $User = $_POST['User'];
    $Password = $_POST['Password'];
    //Realizar conexión al cliente
    $soapClient = new SoapClient('https://demo.linntae.mx/services/ventasSoap?wsdl');
    //Crear la lista de parametros
    $params = array('user' => $User, 'password' => $Password);
    /*$paramsTae = array('user' => 'demoLinntaews', 
                'password' => '1234', 
                'carrier' => '1', 
                'telefono' => '2295242552', 
                'monto' => '20');*/
    //Crear la petición de consulta saldo
    $consultaSaldo = $soapClient->saldo($params);
    //var_dump($consultaSaldo);
    //echo $consultaSaldo->data;
    //$recargaTae = $soapClient->recargaTae($paramsTae);
    //Procesar la respuesta
    $jsonConsultaSaldo = json_decode(json_encode($consultaSaldo), true);  
    //$jsonRecargaTae = json_decode(json_encode($recargaTae),true);
    $doc = new DOMDocument;
    $doc->loadXML($consultaSaldo->data);
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
    <div class="container">
        <div class="nav-wrapper">
            <a href="#" data-target="menu" class="sidenav-trigger"><i class="material-icons">menu</i></a>
            <a href="#" class="brand-logo">Logo</a>
            <ul class="right hide-on-med-and-down">
                <li><a href="#" class="dropdown-trigger" data-target="dropdownMenu">Menu<i class="material-icons right">arrow_drop_down</i></a></li>
            </ul>
        </div>
    </div>
</nav>
<!-- dropDown -->
<ul id="dropdownMenu" class="dropdown-content">
    <li><a class="waves-effect" href="index.php">Inicio</a></li>
    <li class="divider"></li>
    <li><a class="waves-effect">Venta de servicio</a></li>
    <li><a href="" class="waves-effect">Busqueda de cliente</a></li>
    <li class="divider"></li>
    <li><a class="waves-effect">Reportes</a></li>
    <li><a class="waves-effect">Ventas</a></li>
    <li><a class="waves-effect">Corte</a></li>
</ul>
<!-- sideNav -->
<ul class="sidenav" id="menu">
    <li>
        <div class="user-view">
            <div class="background">
                <img src="../images/background.png" alt="background image" class="responsive-img">
            </div>
            <a href="#user"><img src="../images/userProfile.jpg" alt="userProfile" class="circle"></a>
            <a href="#name"><span class="white-text name">Nombre del vendedor</span></a>
            <a href="#mail"><span class="white-text email">example@domain.com</span></a>
        </div>
    </li>
    <li><a class="waves-effect" href="index.php">Inicio</a></li>
    <li><div class="divider"></div></li>
    <li><a class="subheader">Operaciones</a></li>
    <li><a class="waves-effect">Venta de servicio</a></li>
    <li><a href="" class="waves-effect">Busqueda de cliente</a></li>
    <li><a class="waves-effect">Reportes</a></li>
    <li><a class="waves-effect">Ventas</a></li>
    <li><a class="waves-effect">Corte</a></li>
</ul>
<!-- tarjetas con información -->
<div class="container">
    <div class="card-panel">
        <div class="row">
            <div class="col s12">
                <div class="row">
                    <div class="col s12">
                        <h3><?php echo 'Saldo restante: $' . $doc->getElementsByTagName('saldoPlataforma')->item(0)->nodeValue; ?></h3>
                    </div>
                </div>
            </div>
            <div class="col s12">
                <div class="row">
                    <div class="col s12">
                        <h4><?php echo 'Comisión: $' . $doc->getElementsByTagName('saldoComision')->item(0)->nodeValue; ?></h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="card-panel">

    </div>
</div>
</body>
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
<script src="../js/index.js"></script>
</html>