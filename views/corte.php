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
        <h4>Detalles</h4>
        <table class="centered">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Saldo Vendido</th>
                    <th>Usd por servicios</th>
                    <th>Mxn por servicios</th>
                    <th>Total de Usd</th>
                    <th>Total de Mxn</th>
                    <th>Dolares en crédito</th>
                    <th>Mxn en crédito</th>
                </tr>
            </thead>
            <tbody>
                <tr id="Reporte">
                </tr>
            </tbody>
        </table>
    </div>
    <div class="modal-footer">
        <a href="#!" class="modal-close waves-effect waves-green btn-flat" id="CerrarCorte">Finalizar</a>
    </div>
</div>
<script src="<?= base_url ?>js/corte.js"></script>
<?php include_once 'views/layouts/footer.php'; ?>