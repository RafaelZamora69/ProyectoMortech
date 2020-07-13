<?php
if ($_SESSION['identity'] == null) {
    header('Location: ' . base_url . 'login/index');
}
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
    <form action="post">
        <div class="col s12 m6 input-field">
            <select name="" id="CorteOption">
                <option value="" disabled selected>Realizar corte</option>
                <option value="1">Nombre del empleado $0.00</option>
                <option value="2">Nombre del empleado $0.00</option>
            </select>
        </div>
        <div class="col s6 m6">
            <input type="submit" id="CargarCorte" class="btn-flat waves-effect waves-red">
        </div>
    </form>
</div>
<script src="<?= base_url ?>js/corte.js"></script>