<?php
if ($_SESSION['identity'] == null || $_SESSION['identity']['Jerarquia'] == 'Vendedor') {
    header('Location: ' . base_url . 'login/index');
}
require_once 'views/layouts/header.php';
require_once  'views/layouts/navbar.php';
require_once  'views/layouts/sidenav.php';
?>
<form id="archivo">
    <div class="row">
        <div class="col s12">
            <div class="file-field input-field">
                <div class="btn">
                    <span>Archivo</span>
                    <input type="file" accept="text/csv">
                </div>
                <div class="file-path-wrapper">
                    <input type="text" class="file-path validate" accept="text/csv">
                </div>
            </div>
        </div>
    </div>
</form>
<script src="<?= base_url ?>js/validar.js"></script>
<?php include_once 'views/layouts/footer.php'; ?>
