<?php
if ($_SESSION['identity'] == null || $_SESSION['identity']['Jerarquia'] == 'Vendedor') {
    header('Location: ' . base_url . 'login/index');
}
require_once 'views/layouts/header.php';
require_once  'views/layouts/navbar.php';
require_once  'views/layouts/sidenav.php';
?>
<ul class="collapsible">
    <li>
        <div class="collapsible-header"><i class="material-icons">filter_alt</i>Filtro</div>
        <div class="collapsible-body">
            <div class="row">
                <div class="col s12 m6">
                    <div class="input-field">
                        <input type="text" class="datepicker" id="Desde"><label for="">Desde</label></div>
                </div>
                <div class="col s12 m6">
                    <div class="input-field">
                        <input type="text" class="datepicker" id="Hasta"><label for="">Hasta</label></div>
                </div>
                <div class="col s12 m6">
                    <div class="input-field">
                        <input type="text" class="autocomplete" id="autocompleteEmpleado"><label for="autocompleteEmpleado">Empleado</label>
                    </div>
                </div>
                <div class="col s12 m6">
                    <div class="input-field">
                        <input type="text" class="autocomplete" id="autocompleteProveedor"><label for="autocompleteProveedor">Proveedor</label>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col s12 m3">
                    <p><label><input type="radio" name="Tipo" id="Ambos" checked><span>Ambos</span></label></p>
                    <p><label><input type="radio" name="Tipo" id="Efect"><span>Efectivo</span></label></p>
                    <p><label><input type="radio" name="Tipo" id="Depos"><span>Banco</span></label></p>
                </div>
                <div class="col s12 m3">
                    <p><label><input type="radio" name="Estado" id="Todas"><span>Ambas</span></label></p>
                    <p><label><input type="radio" name="Estado" id="Pend" checked><span>Pendientes</span></label></p>
                    <p><label><input type="radio" name="Estado" id="Pagada"><span>Pagadas</span></label></p>
                </div>
                <div class="col s12 m6">
                    <a class="btn-flat waves-effect waves-green" id="Filtrar"><i class="material-icons left">arrow_downward</i>Filtrar</a>
                </div>
            </div>
        </div>
    </li>
</ul>
<div class="row">
    <div class="col s12">
        <a class="orange white-text btn waves-effect waves-light" id="facturaStel">Compras a Stel Order</a>
    </div>
</div>
<div class="row">
    <div class="col s12">
        <div id="compras" class="col s12">
            <div id="detallesCompras"></div>
            <table class="responsive-table">
                <thead>
                <tr>
                    <th>Empleado</th>
                    <th>Proveedor</th>
                    <th>Referencia</th>
                    <th>Total</th>
                    <th>Método de pago</th>
                    <th>Fecha</th>
                    <th>Comprobante</th>
                    <th></th>
                    <th></th>
                </tr>
                <tbody id="tablaCompras">

                </tbody>
                </thead>
            </table>
        </div>
    </div>
</div>
<div class="modal" id="modalCompras">
    <div class="modal-content">
        <h4>Compras facturadas</h4>
        <div id="modalComprasBody">

        </div>
        <div class="modal-footer"><a class="btn orange white-text waves-effect waves-light" id="registrarCompras">Registrar</a></div>
    </div>
</div>
<?php include_once 'views/layouts/footer.php'; ?>
<script src="<?= base_url ?>js/compra.js"></script>
