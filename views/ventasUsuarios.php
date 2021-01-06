<?php
    if ($_SESSION['identity'] == null) {
        header('Location: ' . base_url . 'login/index');
    }
    require_once 'views/layouts/header.php';
    require_once 'views/layouts/navbar.php';
    require_once 'views/layouts/sidenav.php';
?>
<h4>Ventas</h4>
<table class="responsive-table">
    <thead>
        <tr>
            <th>Cliente</th>
            <th>Empleado</th>
            <th>Servicio</th>
            <th>Teléfono</th>
            <th>Venta</th>
            <th>Pagado</th>
            <th>Acciones</th>
        </tr>
    </thead>
    <tbody id="tableVentas"></tbody>
</table>
<div id="modalCliente" class="modal">
    <div class="modal-content">
        <h4>Cambiar cliente</h4>
        <div class="row">
            <div class="input-field col s12 m6">
                <input type="text" class="autocomplete" id="cliente">
                <label for="cliente">Cliente</label>
            </div>
        </div>
    </div>
    <div class="modal-footer" id="modalFooter"></div>
</div>
<script src="<?= base_url ?>js/ventasUsuarios.js"></script>
<?php include_once 'views/layouts/footer.php'; ?>