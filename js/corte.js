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
                    option.innerText = res[i].Nombre + ": $ " + res[i].Mxn + " Mxn, Credito: $ " + res[i].CreditoMxn + " mxn, $ " + res[i].Usd + " Usd, Credito: $ " + res[i].CreditoUsd + " usd";
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
                        <tr></tr>
                    `;
                    var tr = document.createElement("tr");
                    document.getElementById("TablaCortes").appendChild(tr);
                    var td = document.createElement("td");
                    td.innerText = res[i].Nombre;
                    tr.appendChild(td);
                    var td = document.createElement("td");
                    td.innerText = res[i].Inicio;
                    tr.appendChild(td);
                    var td = document.createElement("td");
                    td.innerText = res[i].Fin;
                    tr.appendChild(td);
                    var td = document.createElement("td");
                    td.innerText = res[i].Usd;
                    tr.appendChild(td);
                    var td = document.createElement("td");
                    td.innerText = res[i].Mxn;
                    tr.appendChild(td);
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
                var modal = document.getElementById('modalCorte');
                var modalReporte = M.Modal.init(modal);
                document.getElementById("CerrarCorte").classList.remove("disabled");
                document.getElementById("CerrarCorte").textContent = "Registrar corte";
                if (res.Dolares <= 0 && res.Mxn <= 0) {
                    document.getElementById("CerrarCorte").classList.add("disabled");
                    document.getElementById("CerrarCorte").textContent = "No se puede registrar un corte sin ingresos";
                }
                modalReporte.open();
            }).catch(function (e) {
                console.log(e.message);
            })
    }

    function GuardarCorte(e) {
        var nombre = document.getElementById("Nombre").innerText;
        var usd = document.getElementById("Usd").innerText;
        var mxn = document.getElementById("Mxn").innerText;
        datos = new FormData();
        datos.append('Nombre', nombre);
        datos.append('Usd', usd);
        datos.append('Mxn', mxn);
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
                <td>$ ${res.SaldoVendido}</td>
            </tr>
            <tr id="ventaSaldo">
                <td>Saldo vendido</td>
                <td>$ ${res.UsdSaldo}</td>
                <td>$ ${res.MxnSaldo}</td>
            </tr>
            <tr id="saldoCredito">
                <td>Venta de saldo en crédito</td>
                <td>$ ${res.CreditoRecargasUsd}</td>
                <td>$ ${res.CreditoRecargasMxn}</td>
            </tr>
            <tr id="ventaServicios">
                <td>Venta de servicios</td>
                <td>$ ${res.DolaresServicios}</td>
                <td>$ ${res.PesosServicios}</td>
            </tr>
            <tr id="ventasCredito">
                <td>Venta de servicios en crédito</td>
                <td>$ ${res.CreditoServiciosUsd}</td>
                <td>$ ${res.CreditoServiciosMxn}</td>
            </tr>
            <tr id="pagosCredito">
                <td>Total en crédito</td>
                <td>$ ${res.CreditoUsd}</td>
                <td>$ ${res.CreditoMxn}</td>
            </tr>
            <tr id="totalEfectivo">
                <td>Total en efectivo</td>
                <td id="Usd">$ ${res.Dolares}</td>
                <td id="Mxn">$ ${res.Mxn}</td>
            </tr>  
        `;
    }

    function borrarTabla() {
        while (document.getElementById("tabla").firstChild) {
            document.getElementById("tabla").removeChild(document.getElementById("tabla").firstChild);
        }
    }
});