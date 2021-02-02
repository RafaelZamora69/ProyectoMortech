<?php
require_once 'views/layouts/header.php';
require_once 'views/layouts/navbar.php';
require_once 'views/layouts/sidenav.php';
?>
<h3>Utilidades</h3>
<div class="row">
    <div class="col s12">
        <h4>Cargar Sims Nemi</h4>
        <form id="cargaNemi">
            <div class="row">
                <div class="col s12">
                    <div class="file-field input-field">
                        <div class="btn">
                            <span>Archivo</span>
                            <input type="file" accept="text/csv" id="Archivo">
                        </div>
                        <div class="file-path-wrapper">
                            <input type="text" class="file-path validate" accept="text/csv">
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col s12">
                    <input type="submit" value="Cargar" class="btn waves-effect waves-light" id="Cargar">
                </div>
            </div>
        </form>
        <div class="progress" id="progress"><div class="indeterminate"></div></div>
    </div>
</div>
<div class="row">
    <div class="col s12">
        <h4>Cargar numeros</h4>
        <form id="cargaNumeros">
            <div class="row">
                <div class="col s12">
                    <div class="file-field input-field">
                        <div class="btn">
                            <span>Numeros</span>
                            <input type="file" accept="text/csv" id="Numeros">
                        </div>
                        <div class="file-path-wrapper">
                            <input type="text" class="file-path validate" accept="text/csv">
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col s12">
                    <input type="submit" value="Cargar" class="btn waves-effect waves-light" id="CargarNumeros">
                </div>
            </div>
        </form>
    </div>
</div>
<script src="<?= base_url ?>js/utilidades.js"></script>
<?php include_once 'views/layouts/footer.php'; ?>
