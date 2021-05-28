<?php
if ($_SESSION['identity'] == null) {
    header('Location: ' . base_url . 'login/index');
}
if ($_SESSION['identity']['Jerarquia'] == 'Vendedor') {
    header('Location: ' . base_url . 'servicios/index');
}
require_once 'views/layouts/header.php';
require_once 'views/layouts/navbar.php';
require_once 'views/layouts/sidenav.php';
?>
<h4>Usuarios</h4>
<div class="row">
    <div class="col s12">
        <a class="btn green white-text waves-effect waves-light" id="Nuevo">Nuevo usuario</a>
    </div>
</div>
<ul class="collection" id="Usuarios">

</ul>
<div id="modalRegistro" class="modal">
    <div class="modal-content">
        <h4>Nuevo usuario</h4>
        <form method="post" id="registroForm">
            <div class="row">
                <div class="col s12 m6 input-field">
                    <input type="text" name="Nombre">
                    <label for="Nombre">Nombre</label>
                </div>
                <div class="col s12 m6 input-field">
                    <input type="text" name="Usuario">
                    <label for="Usuario">Usuario</label>
                </div>
                <div class="col s12 m6 input-field">
                    <input type="text" name="UsuarioLinntae">
                    <label for="UsuarioLinntae">Usuario Linntae</label>
                </div>
                <div class="col s12 m6 input-field">
                    <input type="Password" name="Password">
                    <label for="Password">Contraseña</label>
                </div>
                <div class="col s12 m6 input-field">
                    <input type="password" name="PasswordLinntae">
                    <label for="PasswordLinntae">Contraseña Linntae</label>
                </div>
            </div>
        </form>
    </div>
    <div class="modal-footer">
        <a id="registrarUsuario" class="btn waves-effect waves-light green white-text">Registrar</a>
    </div>
</div>
<script src="<?= base_url ?>js/usuarios.js"></script>
<?php include_once 'views/layouts/footer.php'; ?>
