<?php
if ($_SESSION['identity'] == null || $_SESSION['identity']['Jerarquia'] == 'Vendedor') {
    header('Location: ' . base_url . 'login/index');
}
require_once 'views/layouts/header.php';
require_once  'views/layouts/navbar.php';
require_once  'views/layouts/sidenav.php';
?>
<h4>Almacén</h4>
    <div class="row">
        <div class="col s12 m3">
            <div class="card deep-purple darken-1">
                <div class="card-content white-text">
                    <span class="card-title activator">Nemi</span>
                    <p id="restantes-Nemi"></p>
                    <p id="vendidas-Nemi"></p>
                </div>
                <div class="card-reveal" id="detalles-Nemi">

                </div>
            </div>
        </div>
        <div class="col s12 m3">
            <div class="card blue darken-1">
                <div class="card-content white-text">
                    <span class="card-title">AT&T</span>
                    <p id="restantes-AT&T"></p>
                    <p id="vendidas-AT&T"></p>
                </div>
            </div>
        </div>
        <div class="col s12 m3">
            <div class="card green darken-1">
                <div class="card-content white-text">
                    <span class="card-title">Movistar</span>
                    <p id="restantes-Movistar"></p>
                    <p id="vendidas-Movistar"></p>
                </div>
            </div>
        </div>
        <div class="col s12 m3">
            <div class="card blue darken-4">
                <div class="card-content white-text">
                    <span class="card-title">Telcel</span>
                    <p id="restantes-Telcel"></p>
                    <p id="vendidas-Telcel"></p>
                </div>
            </div>
        </div>
        <div class="col s12 m3">
            <div class="card black">
                <div class="card-content white-text">
                    <span class="card-title activator">Space</span>
                    <p id="restantes-Space"></p>
                    <p id="vendidas-Space"></p>
                </div>
                <div class="card-reveal" id="detalles-Space">

                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <h5>Agregar sims</h5>
        <div class="input-field col s12 m4">
            <select id="operadoraAgregar">
                <option value="0">--- seleccione ---</option>
            </select>
            <label for="operadoraAgregar">Operadora</label>
        </div>
        <div class="input-field col s12 m4">
            <input type="number" id="cantidadAgregar">
            <label for="cantidadAgregar">Cantidad</label>
        </div>
        <div class="input-field col s12 m4">
            <a id="agregarSims" class="btn waves-effect waves-light white-text">Agregar</a>
        </div>
    </div>
<div class="row">
    <h5>Quitar sims</h5>
    <div class="input-field col s12 m4">
        <select id="operadoraQuitar">
            <option value="0">--- seleccione ---</option>
        </select>
        <label for="operadoraQuitar">Operadora</label>
    </div>
    <div class="input-field col s12 m4">
        <input type="number" id="cantidadQuitar">
        <label for="cantidadQuitar">Cantidad</label>
    </div>
    <div class="input-field col s12 m4">
        <a id="quitarSims" class="btn red waves-effect waves-light white-text">Quitar</a>
    </div>
</div>
<?php include_once 'views/layouts/footer.php'; ?>
<script src="<?= base_url ?>js/almacen/index.js"></script>
