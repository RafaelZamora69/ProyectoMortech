<div class="centerDiv">
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
                        <div class="input-field chips">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col s12">
                        <div class="input-field">
                            <input type="text" class="autocomplete" id="Operadora" name="Operadora" required>
                            <label for="Operadora">Operadora</label>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col s12 m6">
                        <div class="input-field">
                            <input type="text" id="Monto" name="Monto" required>
                            <label for="Monto">Monto</label>
                        </div>
                    </div>
                    <div class="col s12 m6">
                        <div class="input-field">
                            <input type="text" id="Pago" name="Pago" required>
                            <label for="Pago">A pagar</label>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col s9">
                        <div class="input-field">
                            <textarea name="Nota" id="Nota" class="materialize-textarea" required></textarea>
                            <label for="Nota">Observaciones</label>
                        </div>
                    </div>
                    <div class="col s3">
                        <p>
                            <label>
                                <input type="checkbox" class="pagado">
                                <span>Pagado</span>
                            </label>
                        </p>
                    </div>
                </div>
                <div class="row">
                    <div class="col s12">
                        <input type="submit" id="finalizarVenta" value="Enviar" class="btn waves-effect waves-red">
                    </div>
                </div>
            </div>
        </form>
    </div>
    <div id="otro" class="col s12">
        <form action="" method="post">
            <div class="card-panel">
                <div class="row">
                    <div class="col s12">
                        <div class="input-field">
                            <input name="Name" type="text" class="autocomplete" id="autocompleteName">
                            <label for="Name"></label>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>
</div>
<script src="<?=base_url?>js/app.js"></script>