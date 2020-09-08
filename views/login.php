<?php
include_once 'views/layouts/header.php';
session_destroy();
?>

<body>
    <div class="container">
        <div class="centerDiv">
            <div id="Login" class="col s12">
                <form action="" method="POST" id="FormLogin">
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
                        <p><label><input type="checkbox" class="pagado" checked="checked" id="Recordar"><span>Mantener sesión</span></label></p>
                        <button class="btn" type="submit" name="Enviar">Enviar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</body>
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
<script src="<?= base_url ?>js/index.js"></script>
<script src="<?= base_url ?>js/login.js"></script>
<?php include_once 'views/layouts/footer.php'; ?>

</html>