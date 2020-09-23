<?php
if ($_SESSION['identity'] == null || $_SESSION['identity']['Jerarquia'] == 'Vendedor') {
    header('Location: ' . base_url . 'login/index');
}
require_once 'views/layouts/header.php';
require_once  'views/layouts/navbar.php';
require_once  'views/layouts/sidenav.php';
?>
<h2>Compras</h2>
<div class="row">
    <div class="col s12">
        <h6>Pendientes</h6>
        <table>
            <thead>
            <tr>
                <th>Empleado</th>
                <th>Proveedor</th>
                <th>Referencia</th>
                <th>Total</th>
                <th>Fecha</th>
                <th></th>
            </tr>
            <tbody id="comprasNoPagadas">

            </tbody>
            </thead>
        </table>
    </div>
</div>
<div class="row">
    <div class="col s12">
        <h6>Pagadas</h6>
        <table>
            <thead>
            <tr>
                <th>Empleado</th>
                <th>Proveedor</th>
                <th>Referencia</th>
                <th>Total</th>
                <th>Fecha</th>
                <th></th>
            </tr>
            <tbody id="comprasPagadas">

            </tbody>
            </thead>
        </table>
    </div>
</div>
<div class="modal" id="modalCompra">
    <div class="modal-content" id="contenidoCompra">

    </div>
    <div class="modal-footer">
        <a class="btn waves-effect waves-light green white-text" id="actualizarCompra">Guardar</a>
    </div>
</div>
<script src="<?= base_url ?>js/compra.js"></script>
<?php include_once 'views/layouts/footer.php'; ?>
