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
<h3>Reportes</h3>
<ul class="collapsible">
    <li>
        <div class="collapsible-header"><i class="material-icons">filter_list</i>Filtros</div>
        <div class="collapsible-body">
        <form action="" id="FormFiltro">
            <div class="row">
                <div class="col s6 input-field">
                    <input type="text" class="datepicker" name="From">
                    <label for="From">Desde</label>
                </div>
                <div class="col s6 input-field">
                    <input type="text" class="datepicker" name="To">
                    <label for="To">Hasta</label>
                </div>
            </div>
            <div class="row">
                <div class="col s12 m6">
                    <div class="input-field">
                        <input type="text" name="Empleado" class="autocomplete" id="autoCompleteEmpleados">
                        <label for="Empleado">Empleado</label>
                    </div>
                </div>
                <div class="col s12 m6">
                    <div class="input-field">
                        <input type="text" name="Cliente" class="autocomplete" id="autoCompleteClientes">
                        <label for="Cliente">Cliente</label>
                    </div>
                </div>
            </div>
            <div class="row">
                <p>
                    <label>
                        <input name="Servicio" type="radio" id="TodosServicios" checked />
                        <span>Todo</span>
                    </label>
                    <label>
                        <input name="Servicio" type="radio" id="Saldo" />
                        <span>Recarga de saldo</span>
                    </label>
                    <label>
                        <input name="Servicio" type="radio" id="Servicios" />
                        <span>Servicios</span>
                    </label>
                </p>
                <p>
                    <label>
                        <input name="Estado" type="radio" id="Todos" checked value="3"/>
                        <span>Todo</span>
                    </label>
                    <label>
                        <input name="Estado" type="radio" id="Pagado" value="1"/>
                        <span>Pagado</span>
                    </label>
                    <label>
                        <input name="Estado" type="radio" id="Credito" value="0"/>
                        <span>Crédito</span>
                    </label>
                </p>
                <p>
                    <label>
                        <input name="Tipo" type="radio" id="Ventas" checked />
                        <span>Ventas</span>
                    </label>
                    <label>
                        <input name="Tipo" type="radio" id="Cortes" />
                        <span>Cortes</span>
                    </label>
                </p>
            </div>
            <div class="row">
                <input type="submit" value="Filtrar" class="btn-flat waves-effect waves-red" id="Filtrar">
            </div>
        </form>
        </div>
    </li>
</ul>
<div class="row">
    <div class="col s12">
        <table class="striped highlight responsive-table">
            <thead>
                <tr>
                    <th>Vendedor</th>
                    <th>Cliente</th>
                    <th>Teléfono</th>
                    <th>Operadora</th>
                    <th><i class="material-icons">sort</i>Monto</th>
                    <th>$ de venta</th>
                    <th>Pagado</th>
                </tr>
            </thead>
        </table>
    </div>
</div>
<script src="<?= base_url ?>js/reportes.js"></script>
<?php include_once 'views/layouts/footer.php'; ?>