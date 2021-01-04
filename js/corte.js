document.addEventListener('DOMContentLoaded', function () {
    let elems = document.getElementById('CorteOption');
    var instances;
    getEmpleados();
    MostrarCortes();
    document.getElementById("CargarCorte").addEventListener('click', DetallesCorte);
    document.getElementById("CerrarCorte").addEventListener('click', GuardarCorte);

    //Funciones 
    function getEmpleados() {
        fetch('getEmpleados')
            .then(res => res.json())
            .then(res => {
                for (i in res) {
                    var option = document.createElement("option");
                    option.value = res[i].Id;
                    option.innerText = res[i].Nombre + ": $ " + parseFloat(res[i].Mxn).toFixed(2) + " Mxn, Credito: $ " + parseFloat(res[i].CreditoMxn).toFixed(2) + " mxn, $ " + parseFloat(res[i].Usd).toFixed(2) + " Usd, Credito: $ " + parseFloat(res[i].CreditoUsd).toFixed(2) + " usd";
                    elems.appendChild(option);
                }
                instances = M.FormSelect.init(elems);
            }).catch(function (e) {
                console.log(e.message);
            });
    }

    function MostrarCortes() {
        fetch('MostrarCortes')
            .then(res => res.json())
            .then(res => {
                for (i in res) {
                    document.getElementById('TablaCortes').innerHTML += `
                        <tr>
                            <td>${res[i].Id}</td>
                            <td>${res[i].Nombre}</td> 
                            <td>${res[i].Inicio}</td>
                            <td>${res[i].Fin}</td>
                            <td>${res[i].Usd}</td>
                            <td>${res[i].Mxn}</td>
                            <td>${res[i].Comentarios}</td>
                        </tr>
                    `;
                }
            })
    }

    function DetallesCorte(e) {
        e.preventDefault();
        var datos = new FormData(document.getElementById("FormCorte"));
        datos.append('IdVendedor', document.getElementById("CorteOption").value);
        fetch('DetallesCorte', {
            method: 'POST',
            body: datos
        })
            .then(res => res.json())
            .then(res => {
                borrarTabla();
                inicializarTabla(res);
                document.getElementById("CerrarCorte").classList.remove("disabled");
                document.getElementById("CerrarCorte").textContent = "Registrar corte";
                if (res.Dolares <= 0 && res.Mxn <= 0) {
                    document.getElementById("CerrarCorte").classList.add("disabled");
                    document.getElementById("CerrarCorte").textContent = "No se puede registrar un corte sin ingresos";
                }
                tablaRecargasCorte(document.getElementById("CorteOption").value);
            }).catch(function (e) {
                console.log(e.message);
            })
    }

    function tablaRecargasCorte(idEmpleado){
        const datos = new FormData();
        datos.append('IdEmpleado', idEmpleado);
        fetch('RecargasCortePreeliminar',{
            body: datos,
            method: 'POST'
        })
            .then(res => res.json())
            .then(res => {
                if(res.length > 0){
                    document.getElementById('tablaRecargas').innerHTML = `
                        <h5>Recargas incluidas</h5>
                        <table class="striped responsive-table">
                            <thead>
                                <tr>
                                    <th>Cliente</th>
                                    <th>Monto</th>
                                    <th>Teléfono</th>
                                    <th>Operadora</th>
                                    <th>Usd</th>
                                    <th>Mxn</th>
                                    <th>Fecha</th>
                                </tr>
                            </thead>
                            <tbody id="recargasPreeliminarBody"></tbody>
                        </table>
                    `;
                    for(i in res){
                        document.getElementById('recargasPreeliminarBody').innerHTML += `
                            <tr>
                                <td>${res[i].Cliente}</td>
                                <td>${parseFloat(res[i].Monto).toFixed(2)}</td>
                                <td>${res[i].Telefono}</td>
                                <td>${res[i].Operadora}</td>
                                <td>${parseFloat(res[i].Usd).toFixed(2)}</td>
                                <td>${parseFloat(res[i].Mxn).toFixed(2)}</td>
                                <td>${res[i].Fecha}</td>
                            </tr>
                        `;
                    }
                } else {
                    document.getElementById('tablaRecargas').innerHTML = `
                        <h5>Recargas incluidas</h5>
                        <h5 class="center-align">No hay datos que mostrar</h5>
                    `;
                }
                tablaServiciosCorte(idEmpleado);
            });
    }

    function tablaServiciosCorte(idEmpleado){
        const datos = new FormData();
        datos.append('IdEmpleado', idEmpleado);
        fetch('ServiciosCortePreeliminar',{
            body: datos,
            method: 'POST'
        })
            .then(res => res.json())
            .then(res => {
                if(res.length > 0){
                    document.getElementById('tablaServicios').innerHTML = `
                        <h5>Servicios incluidos</h5>
                        <table class="striped responsive-table">
                            <thead>
                                <tr>
                                    <th>Cliente</th>
                                    <th>Servicio</th>
                                    <th>Usd</th>
                                    <th>Mxn</th>
                                    <th>Fecha</th>
                                </tr>
                            </thead>
                            <tbody id="serviciosPreeliminarBody"></tbody>
                        </table>
                    `;
                    for(i in res){
                        document.getElementById('serviciosPreeliminarBody').innerHTML += `
                            <tr>
                                <td>${res[i].Cliente}</td>
                                <td>${res[i].Servicio}</td>
                                <td>${parseFloat(res[i].Usd).toFixed(2)}</td>
                                <td>${parseFloat(res[i].Mxn).toFixed(2)}</td>
                                <td>${res[i].Fecha}</td>
                            </tr>
                        `;
                    }
                } else {
                    document.getElementById('tablaServicios').innerHTML = `
                        <h5>Servicios incluidos</h5>
                        <h5 class="center-align">No hay datos que mostrar</h5>
                    `;
                }
                var modal = document.getElementById('modalCorte');
                var modalReporte = M.Modal.init(modal);
                modalReporte.open();
            })
    }

    function GuardarCorte(e) {
        const datos = new FormData();
        datos.append('Nombre', document.getElementById("Nombre").innerText);
        datos.append('Usd', document.getElementById("Usd").innerText);
        datos.append('Mxn', document.getElementById("Mxn").innerText);
        datos.append('Comentarios', document.getElementById('ComentarioCorte').value);
        fetch('RegistrarCorte', {
            method: 'POST',
            body: datos
        })
            .then(res => res.json())
            .then(res => {
                res.Codigo == 0 ?
                    M.toast({ html: res.Mensaje, classes: 'green white-text' }) :
                    M.toast({ html: 'Error ' + res.Mensaje, classes: 'red white-text' })
                limpiarOption();
                getEmpleados();
            }).catch(function (e) {
                M.toast({ html: e.message, classes: 'red white-text' });
            })
    }

    function limpiarOption() {
        while (elems.firstChild) {
            elems.removeChild(elems.firstChild);
        }
    }

    function inicializarTabla(res) {
        document.getElementById("Nombre").innerText = res.Nombre;
        document.getElementById("Fecha").innerText = res.Desde + ' - ' + res.Hoy;
        document.getElementById("tabla").innerHTML += `
            <tr id="saldoUsado">
                <td>Saldo Utilizado</td>
                <td>$ 0</td>
                <td>$ ${parseFloat(res.SaldoVendido).toFixed(2)}</td>
            </tr>
            <tr id="ventaSaldo">
                <td>Saldo vendido</td>
                <td>$ ${parseFloat(res.UsdSaldo).toFixed(2)}</td>
                <td>$ ${parseFloat(res.MxnSaldo).toFixed(2)}</td>
            </tr>
            <tr id="saldoCredito">
                <td>Venta de saldo en crédito</td>
                <td>$ ${parseFloat(res.CreditoRecargasUsd).toFixed(2)}</td>
                <td>$ ${parseFloat(res.CreditoRecargasMxn).toFixed(2)}</td>
            </tr>
            <tr id="ventaServicios">
                <td>Venta de servicios</td>
                <td>$ ${parseFloat(res.DolaresServicios).toFixed(2)}</td>
                <td>$ ${parseFloat(res.PesosServicios).toFixed(2)}</td>
            </tr>
            <tr id="ventasCredito">
                <td>Venta de servicios en crédito</td>
                <td>$ ${parseFloat(res.CreditoServiciosUsd).toFixed(2)}</td>
                <td>$ ${parseFloat(res.CreditoServiciosMxn).toFixed(2)}</td>
            </tr>
            <tr id="pagosCredito">
                <td>Total en crédito</td>
                <td>$ ${parseFloat(res.CreditoUsd).toFixed(2)}</td>
                <td>$ ${parseFloat(res.CreditoMxn).toFixed(2)}</td>
            </tr>
            <tr id="totalEfectivo">
                <td>Total en efectivo</td>
                <td id="Usd">$ ${parseFloat(res.Dolares).toFixed(2)}</td>
                <td id="Mxn">$ ${parseFloat(res.Mxn).toFixed(2)}</td>
            </tr>  
        `;
    }

    function borrarTabla() {
        while (document.getElementById("tabla").firstChild) {
            document.getElementById("tabla").removeChild(document.getElementById("tabla").firstChild);
        }
    }
});