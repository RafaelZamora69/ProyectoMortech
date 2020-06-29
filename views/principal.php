<?php $api = new api() ?>
<div class="card-panel">
        <div class="row">
            <div class="col s12">
                <div class="row">
                    <div class="col s12">
                        <h3>Saldo: $<?php $api->saldoPlataforma() ?></h3>
                    </div>
                </div>
            </div>
            <div class="col s12">
                <div class="row">
                    <div class="col s12">
                        <h4>Comisión: $<?php $api->saldoComision() ?></h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="card-panel">

    </div>