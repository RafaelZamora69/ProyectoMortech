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
<ul class="collection" id="Usuarios">

</ul>
<script src="<?= base_url ?>js/usuarios.js"></script>
<?php include_once 'views/layouts/footer.php'; ?>
