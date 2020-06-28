<!DOCTYPE html>
<html lang="en">

<head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recargas</title>
</head>
<?php 
    utils::deleteSession('register');
?>
<body>
    <div class="container">
        <div class="row">
            <div class="col s12">
                <ul class="tabs">
                    <li class="tab col s6"><a href="#Login" class="active">Iniciar sesión</a></li>
                    <li class="tab col s6"><a href="#Registro">Registrarse</a></li>
                </ul>
            </div>
        </div>
        <div id="Login" class="col s12">
            <form action="<?=base_url?>login/login" method="POST">
                <div class="card-panel">
                    <h4 class="center-align">Inicie sesión para acceder</h4>
                    <div class="input-field col s12 l12 xl12">
                        <input type="text" name="User" id="User" required>
                        <label for="User">Usuario</label>
                    </div>
                    <div class="input-field col s12 l12 xl12">
                        <input type="Password" name="Password" id="Password" required>
                        <label for="Password">Contraseña</label>
                    </div>
                    <button class="btn" type="submit" name="Enviar">Enviar</button>
                </div>
            </form>
        </div>
        <div id="Registro" class="col s12">
            <form action="<?=base_url?>login/register" method="POST">
                <div class="card-panel">
                    <h4 class="center-align">Registrese</h4>
                    <div class="row">
                        <div class="input-field col s12 l6 xl6">
                            <input type="text" name="Nombre" id="Nombre" required>
                            <label for="Nombre">Nombre</label>
                        </div>
                        <div class="input-field col s12 l6 xl6">
                            <input type="text" name="Usuario" id="Usuario" required>
                            <label for="Usuario">Usuario</label>
                        </div>
                        <div class="input-field col s12 l6 xl6">
                            <input type="text" name="Correo" id="Correo" required
                                placeholder="Se usará en caso de que olvide su contraseña">
                            <label for="Correo">Correo</label>
                        </div>
                        <div class="input-field col s12 l6 xl6">
                            <input type="Password" name="Password" id="Password" required>
                            <label for="Password">Contraseña</label>
                        </div>
                        <div class="input-field col s12 l6 xl6">
                            <input type="Password" name="rep" id="rep" required>
                            <label for="rep">Repita su contraseña</label>
                        </div>
                    </div>
                    <button class="btn" type="submit" name="Enviar">Enviar</button>
                </div>
            </form>
        </div>
    </div>
</body>
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
<script src="<?=base_url?>js/index.js"></script>

</html>