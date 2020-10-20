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
<h4>Cortes</h4>
<div class="row">
    <form action="post" id="FormCorte">
        <div class="col s12 m6 input-field">
            <select name="" id="CorteOption">
                <option value="" disabled selected>Seleccione usuario</option>
            </select>
        </div>
        <div class="col s6 m6">
            <input type="submit" id="CargarCorte" class="btn-flat waves-effect waves-red">
        </div>
    </form>
</div>
<div class="row">
    <div class="col s12">
        <table class="striped centered highlight responsive-table">
            <thead>
                <tr>
                    <th>Empleado</th>
                    <th>Iniciado el</th>
                    <th>Realizado el</th>
                    <th>Usd</th>
                    <th>Mxn</th>
                </tr>
            <tbody id="TablaCortes">
            </tbody>
            </thead>
        </table>
    </div>
</div>
<div id="modalCorte" class="modal">
    <div class="modal-content">
        <h4 id="Nombre"></h4>
        <h6 id="Fecha"></h6>
        <div class="tablaResumen">
            <table class="highlight">
                <thead>
                <tr>
                    <th></th>
                    <th>Usd</th>
                    <th>Mxn</th>
                </tr>
                </thead>
                <tbody id="tabla">
                </tbody>
            </table>
        </div>
        <div id="tablaRecargas">

        </div>
        <div id="tablaServicios">

        </div>
    </div>
    <div class="modal-footer">
        <a href="#!" class="modal-close waves-effect waves-green btn-flat" id="CerrarCorte">Finalizar</a>
    </div>
</div>
<script src="<?= base_url ?>js/corte.js"></script>
<?php include_once 'views/layouts/footer.php'; ?>