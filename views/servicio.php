<?php
if ($_SESSION['identity'] == null) {
    header('Location: ' . base_url . 'login/index');
}
require_once 'views/layouts/header.php';
require_once 'views/layouts/navbar.php';
require_once 'views/layouts/sidenav.php';
?>
<div class="row">
    <div class="col s12">
        <ul class="tabs">
            <li class="tab col s6"><a href="#saldo">Venta de saldo</a></li>
            <li class="tab col s6"><a href="#otro">Otro servicio</a></li>
        </ul>
    </div>
    <div id="saldo" class="col s12">
        <form method="post" id="FormSaldo">
            <div class="card-panel">
                <div class="row">
                    <div class="col s12">
                        <div class="input-field">
                            <input name="Name" type="text" class="autocomplete" id="autocompleteName" required>
                            <label for="Name">Cliente</label>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col s12">
                        <div class="input-field chips" id="chips">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col s6">
                        <div class="input-field">
                            <input type="text" class="autocomplete" id="Operadora" name="Operadora" required value="Unefon" placeholder="Operadora">
                            <label for="Operadora">Operadora</label>
                        </div>
                    </div>
                    <div class="col s6 m6">
                        <div class="input-field">
                            <select name="Monto" id="Monto">
                                <option value="10">$ 10</option>
                                <option value="20">$ 20</option>
                                <option value="30">$30</option>
                                <option value="50">$ 50</option>
                                <option value="70">$ 70</option>
                                <option value="100" selected>$ 100</option>
                                <option value="150">$ 150</option>
                                <option value="200">$ 200</option>
                                <option value="300">$ 300</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col s4 m4">
                        <div class="input-field">
                            <input type="text" id="PagoUsd" name="PagoUsd">
                            <label for="Pago">Usd</label>
                        </div>
                    </div>
                    <div class="col s4 m4">
                        <div class="input-field">
                            <input type="text" id="PagoMxn" name="PagoMxn">
                            <label for="Pago">Mxn</label>
                        </div>
                    </div>
                    <div class="col s4">
                        <p>
                            <label>
                                <input type="checkbox" class="pagado" checked="checked">
                                <span>Pagado</span>
                            </label>
                        </p>
                    </div>
                </div>
                <div class="row">
                    <div class="col s12">
                        <div class="input-field">
                            <textarea name="Nota" id="Nota" class="materialize-textarea"></textarea>
                            <label for="Nota">Observaciones</label>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col s6">
                        <input type="submit" id="finalizarVenta" value="Enviar" class="btn-flat waves-effect waves-red">
                    </div>
                    <div class="col s6">
                        <div class="progress" id="progress">
                            <div class="indeterminate"></div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
    <div id="otro" class="col s12">
        <form action="" method="post" id="FormServicio">
            <div class="card-panel">
                <div class="row">
                    <div class="col s12 l6">
                        <div class="input-field">
                            <input name="NombreCliente" type="text" class="autocomplete" id="autocompleteName">
                            <label for="NombreCliente">Cliente</label>
                        </div>
                    </div>
                    <div class="col s12 l6">
                        <div class="input-field">
                            <input name="Service" type="text">
                            <label for="Service">Servicio</label>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col s4 l4">
                        <div class="input-field">
                            <input name="UsdServicio" type="text">
                            <label for="CobroServicio">Usd</label>
                        </div>
                    </div>
                    <div class="col s4 l4">
                        <div class="input-field">
                            <input name="MxnServicio" type="text">
                            <label for="CobroServicio">Mxn</label>
                        </div>
                    </div>
                    <div class="col s12 l4">
                        <div class="input-field">
                            <textarea name="NotaServicio" id="NotaServicio" class="materialize-textarea"></textarea>
                            <label for="NotaServicio">Observaciones</label>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col s6">
                        <div class="input-field">
                            <input type="submit" id="finalizarServicio" value="Enviar" class="btn-flat waves-effect waves-red">
                        </div>
                    </div>
                    <div class="col s6">
                        <div class="input-field">
                            <p>
                                <label>
                                    <input type="checkbox" class="servicioPagado" checked="checked">
                                    <span>Pagado</span>
                                </label>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
    <div id="modal1" class="modal">
        <div class="modal-content">
            <h4 id="ModalHeader">Modal Header</h4>
            <table class="stripped centered" id="TablaMensajes">
                <thead>
                    <tr>
                        <th>Número</th>
                        <th>Mensaje</th>
                    </tr>
                </thead>
                <tbody id="table">
                </tbody>
            </table>
        </div>
        <div class="modal-footer">
            <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
        </div>
    </div>
</div>
<script src="<?= base_url ?>js/servicios.js"></script>
<?php include_once 'views/layouts/footer.php'; ?>