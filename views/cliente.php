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
            <input type="text" name="Cliente" id="Cliente" class="autocomplete">
            <label for="Cliente">Buscar Cliente</label>
        </div>
    </div>
    <div class="row">
        <div class="col s12">
            <table class="responsive-table">
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
<div id="modalCliente" class="modal">
    <div class="modal-content">
        <h4 id="nombreCliente"></h4>
        <table class="responsive-table">
            <thead>
                <tr>
                    <th>N° Venta</th>
                    <th>Servicio</th>
                    <th>Crédito</th>
                    <th>Fecha</th>
                </tr>
            </thead>
            <tbody id="infoCliente"></tbody>
        </table>
    </div>
</div>
<script src="<?= base_url ?>js/clientes.js"></script>
<?php include_once 'views/layouts/footer.php'; ?>