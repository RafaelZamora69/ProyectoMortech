<?php
if ($_SESSION['identity'] == null) {
    header('Location: ' . base_url . 'login/index');
}
require_once 'views/layouts/header.php';
require_once 'views/layouts/navbar.php';
require_once 'views/layouts/sidenav.php';
?>
    <div class="row">
        <form id="NumeroBuscar">
            <div class="col s12 input-field">
                <input type="text" name="NumberoBuscar" id="Numero">
                <label for="NumeroBuscar">Buscar Número</label>
            </div>
        </form>
    </div>
    <div class="row">
        <div class="col s12">
            <ul class="tabs">
                <li class="tab col s3"><a href="#saldo">Saldo</a></li>
                <li class="tab col s3"><a href="#otro">Servicios</a></li>
                <li class="tab col s3"><a href="#compras">Compras</a></li>
                <?php if(strcmp($_SESSION['identity']['Jerarquia'], 'Administrador') == 0) : ?>
                    <li class="tab col s3"><a href="#exterior" class="active">Exterior</a></li>
                <?php endif ?>
            </ul>
        </div>
        <div id="saldo" class="col s12">
            <form method="post" id="FormSaldo">
                <div class="card-panel">
                    <div class="row">
                        <div class="col s12 m6">
                            <div class="input-field">
                                <input name="Name" type="text" class="autocomplete" id="autocompleteName" required>
                                <label for="Name">Cliente</label>
                            </div>
                        </div>
                        <div class="col s12 m6">
                            <div class="input-field" id="chips">
                                <input type="number" id="numeros">
                            </div>
                            <div class="input-field">
                                <a class="btn waves-effect green white-text" id="Agregar">Agregar</a>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col s6">
                            <div class="input-field">
                                <a class='dropdown-trigger btn' data-target='Operadoras' id="OperadorasTrigger">Unefon</a>
                                <ul id="Operadoras" class="dropdown-content">
                                    <li><a>Unefon</a></li>
                                    <li><a>AT&T</a></li>
                                    <li><a>Telcel</a></li>
                                    <li><a>Movistar</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="col s6 m6">
                            <div class="input-field">
                                <select name="Monto" id="Monto">
                                    <option value="15">$ 15</option>
                                    <option value="20">$ 20</option>
                                    <option value="30">$ 30</option>
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
                                <input type="number" id="PagoUsd" name="PagoUsd" step="0.1">
                                <label for="Pago">Usd</label>
                            </div>
                        </div>
                        <div class="col s4 m4">
                            <div class="input-field">
                                <input type="number" id="PagoMxn" name="PagoMxn" step="0.1">
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
                        <div class="col s12 m6">
                            <div class="input-field">
                                <input name="NombreCliente" type="text" class="autocomplete" id="autocompleteCliente">
                                <label for="NombreCliente">Cliente</label>
                            </div>
                        </div>
                        <div class="col s12 m6">
                            <div class="input-field">
                                <input name="Service" type="text">
                                <label for="Service">Servicio</label>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col s4 l4">
                            <div class="input-field">
                                <input name="UsdServicio" type="text" id="UsdServicio">
                                <label for="UsdServicio">Usd</label>
                            </div>
                        </div>
                        <div class="col s4 l4">
                            <div class="input-field">
                                <input name="MxnServicio" type="text" id="MxnServicio">
                                <label for="MxnServicio">Mxn</label>
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
        <div id="compras" class="col s12">
            <form action="" method="post" id="FormCompra">
                <div class="card-panel">
                    <div class="row">
                        <div class="input-field col s12 m6">
                            <input type="text" name="Proveedor" class="autocomplete" id="autocompleteProveedores">
                            <label for="autocompleteProveedores">Proveedor</label>
                        </div>
                        <div class="input-field col s12 m6">
                            <input type="text" name="Referencia" id="Referencia">
                            <label for="Referencia">Referencia</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s6 m9">
                            <input type="number" name="Total" id="Total" step="0.1">
                            <label for="Total">$ Total</label>
                        </div>
                        <div class="input-field col s6 m3">
                            <p><label><input type="checkbox" checked id="CompraPagada"><span>Pagado</span></label></p>
                        </div>
                    </div>
                    <div class="file-field input-field">
                        <div class="btn">
                            <span>Ticket</span>
                            <input type="file" id="Ticket">
                        </div>
                        <div class="file-path-wrapper">
                            <input class="file-path validate" type="text" required>
                        </div>
                    </div>
                    <div class="input-field">
                        <input type="submit" id="registrarCompra" value="Registrar" class="btn-flat waves-effect waves-red">
                    </div>
                </div>
            </form>
        </div>
        <?php if(strcmp($_SESSION['identity']['Jerarquia'], 'Administrador') == 0) : ?>
        <div id="exterior">
            <form method="post" id="RecargaExterna" class="Externa">
                <div class="card-panel">
                    <div class="row">
                        <div class="col s12 m6">
                            <div class="input-field">
                                <input name="Name" type="text" class="autocomplete" id="autocompleteNameExterna" required>
                                <label for="Name">Cliente</label>
                            </div>
                        </div>
                        <div class="col s12 m6">
                            <div class="input-field" id="chipsExterna">
                                <input type="number" id="numeroExterno">
                            </div>
                            <div class="input-field">
                                <a class="btn waves-effect green white-text" id="AgregarExterna">Agregar</a>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col s12 m4">
                            <div class="input-field">
                                <a class='dropdown-trigger btn' data-target='OperadorasExterna' id="OperadorasTriggerExterna">Unefon</a>
                                <ul id="OperadorasExterna" class="dropdown-content">
                                    <li><a>Unefon</a></li>
                                    <li><a>AT&T</a></li>
                                    <li><a>Telcel</a></li>
                                    <li><a>Movistar</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="col s12 m4">
                            <div class="input-field">
                                <select name="Monto" id="MontoExterna">
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
                        <div class="col s12 m4">
                            <div class="input-field">
                                <input type="text" id="empleadoExterno" class="autocomplete">
                                <label for="empleadoExterno">Empleado</label>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col s4 m4">
                            <div class="input-field">
                                <input type="number" id="PagoUsd" name="PagoUsd" step="0.1">
                                <label for="Pago">Usd</label>
                            </div>
                        </div>
                        <div class="col s4 m4">
                            <div class="input-field">
                                <input type="number" id="PagoMxn" name="PagoMxn" step="0.1">
                                <label for="Pago">Mxn</label>
                            </div>
                        </div>
                        <div class="col s4">
                            <p>
                                <label>
                                    <input type="checkbox" id="pagadoExterna" checked="checked">
                                    <span>Pagado</span>
                                </label>
                            </p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col s12">
                            <div class="input-field">
                                <textarea name="Nota" id="NotaExterna" class="materialize-textarea"></textarea>
                                <label for="Nota">Observaciones</label>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col s6">
                            <input type="submit" id="RegistrarExterna" value="Enviar" class="btn-flat waves-effect waves-red">
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <?php endif ?>
        <div id="modal1" class="modal">
            <div class="modal-content">
                <h4 id="ModalHeader">Operación terminada</h4>
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
        <div id="modal2" class="modal">
            <div class="modal-content">
                <h4>Información</h4>
                <table class="responsive-table" id="TablaInfoNumero">
                    <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Empleado</th>
                        <th>Monto</th>
                        <th>Ingreso</th>
                        <th>Operadora</th>
                        <th>Teléfono</th>
                        <th>Pagado</th>
                        <th>Fecha</th>
                    </tr>
                    </thead>
                    <tbody id="TablaInfoNumeroDatos"></tbody>
                </table>
            </div>
        </div>
    </div>
<script src="<?= base_url ?>js/servicios.js"></script>
<?php include_once 'views/layouts/footer.php'; ?>