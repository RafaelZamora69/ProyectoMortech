<?php
$api = new api();
$api->setUser($_SESSION['identity']['Usuario']);
$api->setPassword($_SESSION['identity']['Password']);
if ($_SESSION['identity'] == null) {
    header('Location: ' . base_url . 'login/index');
}
require_once 'views/layouts/header.php';
require_once 'views/layouts/navbar.php';
require_once 'views/layouts/sidenav.php';
?>
<div class="centerDiv">
    <div class="row">
        <div class="col s12">
            <div class="card-panel">
                <div class="row">
                    <div class="col s12">
                        <div class="row">
                            <div class="col s12">
                                <h3>Saldo: $<?php $api->saldoPlataforma() ?></h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col s12">
            <div class="card-panel">
                <div class="row">
                    <div class="col s12">
                        <h2>Ventas</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<?php include_once 'views/layouts/footer.php'; ?>