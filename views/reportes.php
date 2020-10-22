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
                <div class="row">
                    <div class="col s6 m6">
                        <div class="input-field">
                            <input type="text" name="buscarVenta" id="buscarVenta">
                            <label for="buscarVenta"><i class="material-icons">search</i> idVenta</label>
                        </div>
                    </div>
                    <div class="col s6 m6">
                        <div class="input-field">
                            <input type="text" name="buscarCorte" id="buscarCorte">
                            <label for="buscarCorte"><i class="material-icons">content_cut</i> idCorte</label>
                        </div>
                    </div>
                </div>
                <form action="" id="FormFiltro">
                    <div class="row">
                        <div class="col s6 input-field">
                            <input type="text" class="datepicker" name="From" id="Desde">
                            <label for="From"><i class="material-icons">today</i> Desde</label>
                        </div>
                        <div class="col s6 input-field">
                            <input type="text" class="datepicker" name="To" id="Hasta">
                            <label for="To"><i class="material-icons">event</i> Hasta</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col s12 m6">
                            <div class="input-field">
                                <input type="text" name="Empleado" class="autocomplete" id="autocompleteEmpleado">
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
                                <input name="Servicio" type="radio" id="TodosServicios" checked/>
                                <span>Todo</span>
                            </label>
                            <label>
                                <input name="Servicio" type="radio" id="Saldo"/>
                                <span>Recargas</span>
                            </label>
                            <label>
                                <input name="Servicio" type="radio" id="Servicios"/>
                                <span>Servicios</span>
                            </label>
                            <label>
                                <input name="Servicio" type="radio" id="Corte"/>
                                <span>Cortes</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input name="Pagadas" type="radio" id="Todos" checked/>
                                <span>Todo</span>
                            </label>
                            <label>
                                <input name="Pagadas" type="radio" id="Pagado"/>
                                <span>Pagado</span>
                            </label>
                            <label>
                                <input name="Pagadas" type="radio" id="Credito"/>
                                <span>Crédito</span>
                            </label>
                        </p>
                        <p id="Estados">
                            <label>
                                <input name="Verificadas" type="radio" id="Todas" checked/>
                                <span>Todas</span>
                            </label>
                            <label>
                                <input name="Verificadas" type="radio" id="Verificadas"/>
                                <span>Verificadas</span>
                            </label>
                            <label>
                                <input name="Verificadas" type="radio" id="NoVerificadas"/>
                                <span>No verificadas</span>
                            </label>
                        </p>
                        <p id="Cortes">
                            <label>
                                <input type="radio" name="Cortes" id="Todas" checked>
                                <span>Todas</span>
                            </label>
                            <label>
                                <input type="radio" name="Cortes" id="EnCorte">
                                <span>En corte</span>
                            </label>
                            <label>
                                <input type="radio" name="Cortes" id="SinCorte">
                                <span>Sin corte</span>
                            </label>
                        </p>
                    </div>
                    <div class="row">
                        <a value="Consultar" class="btn-flat waves-effect waves-red" id="Consultar"><i class="material-icons left">get_app</i>Consultar</a>
                    </div>
                </form>
            </div>
        </li>
    </ul>
    <div class="row">
        <div class="col s12" id="Detalles">
        </div>
        <div class="col s12" id="Tabla">

        </div>
    </div>
    <div id="modalEditar" class="modal">
        <div class="modal-content">
            <h4 id="idVenta"></h4>
            <form action="" id="dataActualizar">
                <div class="row">
                    <div class="col s12 m6 input-field">
                        <input type="text" name="Empleado" id="NombreEmpleado" placeholder="Empleado"
                               class="autocomplete">
                        <label for="Empleado">Empleado</label>
                    </div>
                    <div class="col s12 m6 input-field">
                        <input type="text" name="Cliente" id="NombreCliente" placeholder="Cliente" class="autocomplete">
                        <label for="Cliente">Cliente</label>
                    </div>
                </div>
                <div class="row">
                    <div class="col s6">
                        <div class="input-field">
                            <input type="text" id="Mxn" name="Mxn" placeholder="Mxn">
                            <label for="Mxn">Mxn</label>
                        </div>
                    </div>
                    <div class="col s6">
                        <div class="input-field">
                            <input type="text" id="Usd" name="Usd" placeholder="Usd">
                            <label for="Usd">Usd</label>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col s6">
                        <label>
                            <input type="checkbox" id="EstaPagado">
                            <span>Pagado</span>
                        </label>
                    </div>
                    <div class="col s6">
                        <div class="input-field">
                            <textarea name="Observaciones" id="Observaciones" class="materialize-textarea"
                                      placeholder="Observaciones"></textarea>
                            <label for="Observaciones">Observaciones</label>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div class="modal-footer">
            <a id="Actualizar" class="modal-close waves-effect waves-green btn-flat">Actualizar</a>
        </div>
    </div>
    <div id="modalDetalles" class="modal">
        <div class="modal-content" id="modalDetallesCuerpo">

        </div>
        <div class="modal-footer">

        </div>
    </div>
    <script src="<?= base_url ?>js/reportes.js"></script>
<?php include_once 'views/layouts/footer.php'; ?>