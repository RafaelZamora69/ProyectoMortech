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
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Consulta saldo</title>
</head>
<body>
    <nav>
        <div class="nav-wrapper">
            <a href="#" class="brand-logo">Logo</a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
                <li><a><?php echo 'Saldo restante: $' . $doc->getElementsByTagName('saldoPlataforma')->item(0)->nodeValue; ?></a></li>
                <li><a><?php echo 'Comisión: $' . $doc->getElementsByTagName('saldoComision')->item(0)->nodeValue; ?></a></li>
            </ul>
        </div>
  </nav>
</body>
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
</html>