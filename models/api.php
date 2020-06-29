<?php 
    class api {
        private $User = 'demoLinntaews', $Password = '1234', $client;

        function __construct(){
            $client = new SoapClient('https://demo.linntae.mx/services/ventasSoap?wsdl');
            $this->client = $client;
        }

        public function saldoPlataforma(){
            $Params = array('user' => $this->User, 'password' => $this->Password);
            $ConsultaSaldo = $this->client->saldo($Params);
            $doc = new DOMDocument;
            $doc->loadXML($ConsultaSaldo->data);
            echo $doc->getElementsByTagName('saldoPlataforma')->item(0)->nodeValue;
        }

        public function saldoComision(){
            $Params = array('user' => $this->User, 'password' => $this->Password);
            $ConsultaSaldo = $this->client->saldo($Params);
            $doc = new DOMDocument;
            $doc->loadXML($ConsultaSaldo->data);
            echo $doc->getElementsByTagName('saldoComision')->item(0)->nodeValue;
        }

        public function recargaTae($carrier, $phone, $ammount){
            $Params = array('user' => $this->User, 
                            'password' => $this->Password,
                            'carrier' => $carrier,
                            'telefono' => $phone,
                            'monto' => $ammount);
            $recargaTae = $this->client->recargaTae($Params);
            $doc = new DOMDocument;
            $doc->loadXML($recargaTae->data);
        }
    }