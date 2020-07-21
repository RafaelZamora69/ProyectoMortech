<?php
class api
{
    private $User, $Password, $client;

    function __construct()
    {
        $this->client = new SoapClient('https://linntae.mx/services/ventasSoap?wsdl');
    }

    public function setUser($User)
    {
        $this->User = $User;
    }

    public function setPassword($Password)
    {
        $this->Password = $Password;
    }

    public function saldoPlataforma()
    {
        $Params = array('user' => $this->User, 'password' => $this->Password);
        $ConsultaSaldo = $this->client->saldo($Params);
        $doc = new DOMDocument;
        $doc->loadXML($ConsultaSaldo->data);
        echo $doc->getElementsByTagName('mensaje')->item(0)->nodeValue;
    }

    public function saldoComision()
    {
        $Params = array('user' => $this->User, 'password' => $this->Password);
        $ConsultaSaldo = $this->client->saldo($Params);
        $doc = new DOMDocument;
        $doc->loadXML($ConsultaSaldo->data);
        echo $doc->getElementsByTagName('saldoComision')->item(0)->nodeValue;
    }

    public function recargaTae($carrier, $phone, $ammount)
    {
        $Params = array(
            'user' => $this->User,
            'password' => $this->Password,
            'carrier' => $carrier,
            'telefono' => $phone,
            'monto' => $ammount
        );
        $recargaTae = $this->client->recargaTae($Params);
        $doc = new DOMDocument;
        $doc->loadXML($recargaTae->data);
        //Creamos un arreglo [codigo, mensaje]
        $array = array(
            $doc->getElementsByTagName('codigo')->item(0)->nodeValue,
            $doc->getElementsByTagName('mensaje')->item(0)->nodeValue
        );
        return $array;
    }
}
