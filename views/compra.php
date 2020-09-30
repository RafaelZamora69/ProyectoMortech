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
                    <p><label><input type="radio" name="Tipo" checked id="Ambos"><span>Ambos</span></label></p>
                    <p><label><input type="radio" name="Tipo" id="Efect"><span>Efectivo</span></label></p>
                    <p><label><input type="radio" name="Tipo" id="Depos"><span>Deposito</span></label></p>
                </div>
                <div class="col s12 m9">
                    <a class="btn-flat waves-effect waves-green" id="FiltrarPendientes"><i class="material-icons left">attach_money</i>Filtra Pendientes</a>
                    <a class="btn-flat waves-effect waves-green" id="FiltrarPagados"><i class="material-icons left">done_all</i>Filtrar Pagadas</a>
                </div>
            </div>
        </div>
    </li>
</ul>
<div class="row">
    <div class="col s12">
        <ul class="tabs">
            <li class="tab col s6"><a href="#pendientes">Pendientes</a></li>
            <li class="tab col s6"><a href="#pagadas">Pagadas</a></li>
        </ul>
    </div>
</div>
<div id="pendientes" class="col s12">
    <div id="detallesPendientes">

    </div>
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
        </tr>
        <tbody id="comprasNoPagadas">

        </tbody>
        </thead>
    </table>
</div>
<div id="pagadas" class="col s12">
    <div id="detallesPagadas">

    </div>
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
        </tr>
        <tbody id="comprasPagadas">

        </tbody>
        </thead>
    </table>
</div>
<ul id='metodosPago' class='dropdown-content'>
    <li><a class="metodosPago">Efectivo</a></li>
    <li><a class="metodosPago">Deposito</a></li>
    <li class="divider" tabindex="-1"></li>
    <li><a class="metodosPago">Sin pagar</a></li>
</ul>
<script src="<?= base_url ?>js/compra.js"></script>
<?php include_once 'views/layouts/footer.php'; ?>
