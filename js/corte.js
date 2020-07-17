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
                inicializarTabla();
                var modal = document.getElementById('modalCorte');
                var modalReporte = M.Modal.init(modal);
                cargarTabla(res);
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
                res[0].Codigo == 0 ?
                    M.toast({ html: res[0].Mensaje, classes: 'green white-text' }) :
                    M.toast({ html: 'Error ' + res[0].Mensaje, classes: 'red white-text' })
                limpiarOption();
                getEmpleados();
            }).catch(function (e) {
                console.log(e.message);
            })
    }

    function limpiarOption() {
        while (elems.firstChild) {
            elems.removeChild(elems.firstChild);
        }
    }

    function inicializarTabla() {
        var tr = document.createElement("tr");
        tr.id = 'saldoUsado';
        var td = document.createElement("td");
        td.innerText = 'Saldo utilizado';
        tr.appendChild(td);
        document.getElementById("tabla").appendChild(tr);
        var tr = document.createElement("tr");
        tr.id = 'ventaSaldo';
        var td = document.createElement("td");
        td.innerText = 'Saldo vendido';
        tr.appendChild(td);
        document.getElementById("tabla").appendChild(tr);
        var tr = document.createElement("tr");
        tr.id = 'saldoCredito';
        var td = document.createElement("td");
        td.innerText = 'Venta de saldo en crédito';
        tr.appendChild(td);
        document.getElementById("tabla").appendChild(tr);
        var tr = document.createElement("tr");
        tr.id = 'ventaServicios';
        var td = document.createElement("td");
        td.innerText = 'Venta de servicios';
        tr.appendChild(td);
        document.getElementById("tabla").appendChild(tr);
        var tr = document.createElement("tr");
        tr.id = 'ventasCredito';
        var td = document.createElement("td");
        td.innerText = 'Venta de servicios en crédito';
        tr.appendChild(td);
        document.getElementById("tabla").appendChild(tr);
        var tr = document.createElement("tr");
        tr.id = 'pagosCredito';
        var td = document.createElement("td");
        td.innerText = 'Total en crédito';
        tr.appendChild(td);
        document.getElementById("tabla").appendChild(tr);
        var tr = document.createElement("tr");
        tr.id = 'totalEfectivo';
        var td = document.createElement("td");
        td.innerText = 'Total en efectivo';
        tr.appendChild(td);
        document.getElementById("tabla").appendChild(tr);
    }

    function borrarTabla() {
        while (document.getElementById("tabla").firstChild) {
            document.getElementById("tabla").removeChild(document.getElementById("tabla").firstChild);
        }
    }

    function cargarTabla(res) {
        document.getElementById("Nombre").innerText = res.Nombre;
        document.getElementById("Fecha").innerText = res.Desde + ' - ' + res.Hoy;
        var Usd = document.createElement("td");
        var Mxn = document.createElement("td");
        Usd.innerText = '$ ' + 0;
        Mxn.innerText = '$ ' + res.SaldoVendido;
        document.getElementById("saldoUsado").appendChild(Usd);
        document.getElementById("saldoUsado").appendChild(Mxn);
        var Usd = document.createElement("td");
        var Mxn = document.createElement("td");
        Usd.innerText = '$ ' + res.UsdSaldo;
        Mxn.innerText = '$ ' + res.MxnSaldo;
        document.getElementById("ventaSaldo").appendChild(Usd);
        document.getElementById("ventaSaldo").appendChild(Mxn);
        var Usd = document.createElement("td");
        var Mxn = document.createElement("td");
        Usd.innerText = '$ ' + res.CreditoRecargasUsd;
        Mxn.innerText = '$ ' + res.CreditoRecargasMxn;
        document.getElementById("saldoCredito").appendChild(Usd);
        document.getElementById("saldoCredito").appendChild(Mxn);
        var Usd = document.createElement("td");
        var Mxn = document.createElement("td");
        Usd.innerText = '$ ' + res.DolaresServicios
        Mxn.innerText = '$ ' + res.PesosServicios;
        document.getElementById("ventaServicios").appendChild(Usd);
        document.getElementById("ventaServicios").appendChild(Mxn);
        var Usd = document.createElement("td");
        var Mxn = document.createElement("td");
        Usd.innerText = '$ ' + res.CreditoServiciosUsd;
        Mxn.innerText = '$ ' + res.CreditoServiciosMxn;
        document.getElementById("ventasCredito").appendChild(Usd);
        document.getElementById("ventasCredito").appendChild(Mxn);
        var Usd = document.createElement("td");
        var Mxn = document.createElement("td");
        Usd.innerText = '$ ' + res.CreditoUsd;
        Mxn.innerText = '$ ' + res.CreditoMxn;
        document.getElementById("pagosCredito").appendChild(Usd);
        document.getElementById("pagosCredito").appendChild(Mxn);
        var Usd = document.createElement("td");
        var Mxn = document.createElement("td");
        Usd.innerText = '$ ' + res.Dolares;
        Usd.id = 'Usd';
        Mxn.innerText = '$ ' + res.Mxn;
        Mxn.id = 'Mxn';
        document.getElementById("totalEfectivo").appendChild(Usd);
        document.getElementById("totalEfectivo").appendChild(Mxn);
    }
});