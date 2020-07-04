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
                            <input name="Name" type="text" class="autocompleteName" id="autocompleteName" required>
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
                            <select name="Monto" id="Monto">
                                <option>Monto</option>
                            </select>
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
                        <input type="submit" id="finalizarVenta" value="Enviar" class="btn-flat waves-effect waves-red">
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
                            <label for="Name">Nombre</label>
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
                    <div class="col s12 l9">
                        <div class="input-field">
                            <textarea name="NotaServicio" id="NotaServicio" class="materialize-textarea" required></textarea>
                            <label for="NotaServicio">Observaciones</label>
                        </div>
                    </div>
                    <div class="col s12 l3">
                        <div class="input-field">
                            <input name="CobroServicio" type="text">
                            <label for="CobroServicio">Cobro</label>
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
                                    <input type="checkbox" class="servicioPagado">
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
</div>