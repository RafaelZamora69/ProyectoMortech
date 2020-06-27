<div class="card-panel">
        <div class="row">
            <div class="col s12">
                <div class="row">
                    <div class="col s12">
                        <h3><?php echo 'Saldo restante: $' . $doc->getElementsByTagName('saldoPlataforma')->item(0)->nodeValue; ?></h3>
                    </div>
                </div>
            </div>
            <div class="col s12">
                <div class="row">
                    <div class="col s12">
                        <h4><?php echo 'Comisión: $' . $doc->getElementsByTagName('saldoComision')->item(0)->nodeValue; ?></h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="card-panel">

    </div>