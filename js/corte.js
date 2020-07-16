document.addEventListener('DOMContentLoaded', function () {
    let elems = document.getElementById('CorteOption');
    var instances;
    getEmpleados();
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
                    option.innerText = res[i].Nombre + ": $ " + res[i].Mxn + " Mxn, $ " + res[i].Usd + " Usd";
                    elems.appendChild(option);
                }
                instances = M.FormSelect.init(elems);
            }).catch(function (e) {
                console.log(e.message);
            });
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
                var modal = document.getElementById('modalCorte');
                var modalReporte = M.Modal.init(modal);
                var data = document.createElement("td");
                data.id = "Nombre";
                data.innerText = res.Nombre;
                document.getElementById("Reporte").appendChild(data);
                var data = document.createElement("td");
                data.innerText = '$ ' + res.SaldoVendido;
                document.getElementById("Reporte").appendChild(data);
                var data = document.createElement("td");
                data.innerText = '$ ' + res.DolaresServicios;
                document.getElementById("Reporte").appendChild(data);
                var data = document.createElement("td");
                data.innerText = '$ ' + res.PesosServicios;
                document.getElementById("Reporte").appendChild(data);
                var data = document.createElement("td");
                data.innerText = '$ ' + res.Dolares;
                data.id = "Usd";
                document.getElementById("Reporte").appendChild(data);
                var data = document.createElement("td");
                data.innerText = '$ ' + res.Mxn;
                data.id = "Mxn";
                document.getElementById("Reporte").appendChild(data);
                var data = document.createElement("td");
                data.innerText = '$ ' + res.CreditoUsd;
                document.getElementById("Reporte").appendChild(data);
                var data = document.createElement("td");
                data.innerText = '$ ' + res.CreditoMxn;
                document.getElementById("Reporte").appendChild(data);
                modalReporte.open();
            }).catch(function (e) {
                console.log(e.message);
            })
        while (document.getElementById("Reporte").firstChild) {
            document.getElementById("Reporte").removeChild(document.getElementById("Reporte").firstChild);
        }
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

            }).catch(function (e) {
                console.log(e.message);
            })
    }
});