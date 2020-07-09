<?php $api = new api(); 
    if($_SESSION['identity'] == null){
        header('Location: ' . base_url . 'login/index');
    }
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
                <div class="row">
                    <div class="col s12">
                        <div class="row">
                            <div class="col s12">
                                <h4>Comisión: $<?php $api->saldoComision() ?></h4>
                                <p></p>
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