<?php
if ($_SESSION['identity'] == null) {
    header('Location: ' . base_url . 'login/index');
}
require_once 'views/layouts/header.php';
require_once 'views/layouts/navbar.php';
require_once 'views/layouts/sidenav.php';
?>
<h4>Cortes</h4>
<div class="row">
    <div class="col s12">
        <table class="striped centered highlight">
            <thead>
                <tr>
                    <th>Empleado</th>
                    <th>Iniciado el</th>
                    <th>Realizado el</th>
                    <th>SubTotal</th>
                    <th>Ingreso del corte</th>
                </tr>
            <tbody>
                <tr>
                    <td>Nombre del empleado</td>
                    <td>Fecha de la primera venta</td>
                    <td>Fecha del corte</td>
                    <td>SubTotal (saldo + servicios)</td>
                    <td>Total (Venta de saldo + servicios)</td>
                </tr>
                <tr>
                    <td>Nombre del empleado</td>
                    <td>Fecha de la primera venta</td>
                    <td>Fecha del corte</td>
                    <td>SubTotal (saldo + servicios)</td>
                    <td>Total (Venta de saldo + servicios)</td>
                </tr>
            </tbody>
            </thead>
        </table>
    </div>
</div>
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
<div id="modalCorte" class="modal">
    <div class="modal-content">
        <h4 id="Nombre"></h4>
        <h6 id="Fecha"></h6>
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
    <div class="modal-footer">
        <a href="#!" class="modal-close waves-effect waves-green btn-flat" id="CerrarCorte">Finalizar</a>
    </div>
</div>
<script src="<?= base_url ?>js/corte.js"></script>
<?php include_once 'views/layouts/footer.php'; ?>