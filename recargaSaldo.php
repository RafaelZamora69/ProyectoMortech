<?php 
    if(isset($_POST)){
        echo json_encode('Datos recibidos');
    } else {
        echo json_encode('Datos no recibidos');
    }