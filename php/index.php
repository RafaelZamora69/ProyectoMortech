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


<!-- tarjetas con información -->
<div class="container">
    
</div>
