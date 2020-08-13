<?php
if ($_SESSION['identity'] == null) {
    header('Location: ' . base_url . 'login/index');
}
require_once 'views/layouts/header.php';
require_once 'views/layouts/navbar.php';
require_once 'views/layouts/sidenav.php';
?>
<form id="consultaCliente">
    <div class="row">
        <div class="col s12 input-field">
            <input type="text" name="Cliente" id="Cliente">
            <label for="Cliente">Buscar Cliente</label>
        </div>
    </div>
    <div class="row">
        <div class="col s12">
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>N° Deudas</th>
                        <th>Total crédito</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody id="TablaDeudas">
                </tbody>
            </table>
        </div>
    </div>
</form>
<script src="<?= base_url ?>js/clientes.js"></script>
<?php include_once 'views/layouts/footer.php'; ?>