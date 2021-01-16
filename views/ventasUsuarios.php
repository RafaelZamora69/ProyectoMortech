<?php
    if ($_SESSION['identity'] == null) {
        header('Location: ' . base_url . 'login/index');
    }
    require_once 'views/layouts/header.php';
    require_once 'views/layouts/navbar.php';
    require_once 'views/layouts/sidenav.php';
?>
<h4>Ventas</h4>
    <div class="row">
        <div class="input-field col s12 m6">
            <input type="text" id="Telefono" class="autocomplete">
            <label for="Telefono">Teléfono</label>
        </div>
        <div class="input-field col s12 m6">
            <input type="text" id="clienteFiltro" class="autocomplete">
            <label for="Cliente">Cliente </label>
        </div>
        <a id="eliminarFiltro" class="btn green">Eliminar filtro</a>
    </div>
<table class="responsive-table centered">
    <thead>
        <tr>
            <th>Cliente</th>
            <th>Teléfono</th>
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
<div id="modalConfirmar" class="modal bottom-sheet">
    <div class="modal-content">
        <h4>Confirmar</h4>
        <div id="confirmationContent"></div>
    </div>
    <div class="modal-footer" id="footerConfirmar"></div>
</div>
<script src="<?= base_url ?>js/ventasUsuarios.js"></script>
<?php include_once 'views/layouts/footer.php'; ?>