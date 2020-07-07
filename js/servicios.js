document.addEventListener('DOMContentLoaded', function () {
    //Operadoras
    var autocom = document.querySelectorAll('.autocomplete');
    var operadora = M.Autocomplete.init(autocom, {
        data: {
            "Telcel": null,
            "Movistar": null,
            "Unefon": null,
            "AT&T": null
        },
        onAutocomplete: function (res) {
            cargarMonto(res);
        }
    });
    //Modal de aviso
    var modal = document.getElementById('modal1');
    var modalAviso = M.Modal.init(modal);
    //Números de teléfono
    var chips = document.querySelectorAll('.chips');
    var telefonos = M.Chips.init(chips, {
        placeholder: "Numeros",
        secondaryPlaceholder: "+Numero"
    });
    //Monto a pagar
    var select = document.querySelectorAll('select');
    var montos = M.FormSelect.init(select);
    //Formulario
    let btnEnviar = document.getElementById('finalizarVenta');
    let formSaldo = document.getElementById('FormSaldo');
    let formServicio = document.getElementById('FormServicio');

    formSaldo.addEventListener('submit', RecargaSaldo);
    formServicio.addEventListener('submit', VentaServicio);

    ObtenerClientes();
    function ObtenerClientes() {
        fetch('servicios&action=nombresClientes')
            .then(res => res.json())
            .then(res => {
                var autocomName = document.querySelectorAll('.autocompleteName');
                var instances = M.Autocomplete.init(autocomName, {
                    data: res
                });
            })
            .catch(function (e) {
                console.log(e.message);
            });
    }

    function RecargaSaldo(e) {
        e.preventDefault();
        let pagado = document.getElementsByClassName('pagado');
        let form = document.getElementById('FormSaldo');
        var datos = new FormData(form);
        let numeros = document.getElementsByClassName('chips')[0].M_Chips.chipsData;
        console.log(numeros);
        datos.append('numeros', JSON.stringify(numeros));
        pagado[0].checked ? datos.append('Pagado', 1) : datos.append('Pagado', 0);
        //Eliminar la antigua tabla de resultados
        var del = document.getElementById("table");
        del.remove();
        fetch('servicios&action=recargaSaldo', {
            method: 'POST',
            body: datos
        })
            .then(res => res.json())
            .then(res => {
                var table = document.getElementById("TablaMensajes");
                var tbody = document.createElement("tbody");
                tbody.id = "table";
                //Añadir tbody a la tabla
                table.appendChild(tbody);
                console.log(res);
                for (var i in res) {
                    var tr = document.createElement("tr");
                    var Numero = document.createElement("td");
                    var Mensaje = document.createElement("td");
                    res[i].Codigo == 0 ? Numero.classList.add("green-text") : Numero.classList.add("red-text");
                    Numero.innerText = res[i].Tel;
                    Mensaje.innerText = res[i].Mensaje;
                    tr.appendChild(Numero);
                    tr.appendChild(Mensaje);
                    var table = document.getElementById("table");
                }
                modalAviso.open();
            })
            .catch(function (e) {
                var tbody = document.createElement("tbody");
                tbody.id = "table";
                table.appendChild(tbody);
                console.log(e.message);
            });
    }

    function VentaServicio(e) {
        e.preventDefault();
        let form = document.getElementById('FormServicio');
        let pagado = document.getElementsByClassName('servicioPagado');
        var datos = new FormData(form);
        pagado[0].checked ? datos.append('Pagado', 1) : datos.append('Pagado', 0);
        fetch('servicios&action=ventaServicio', {
            method: 'POST',
            body: datos
        })
            .then(res => res.json())
            .then(res => {
                res[0].Codigo == 0 ?
                    M.toast({ html: res[0].Mensaje, classes: 'green white-text' }) :
                    M.toast({ html: 'Error ' + res[0].Mensaje, classes: 'red white-text' })
                if (res[0].Codigo == 0) {
                    formServicio.reset();
                }
            })
    }

    function cargarMonto(res) {
        console.log(res);
        let Montos = document.getElementById("Monto");
        while (Montos.firstChild) {
            Montos.removeChild(Montos.firstChild);
        }
        switch (res) {
            case 'Telcel':
                let telcel = [100, 150, 200, 300, 500];
                for (i in telcel) {
                    let opciones = document.getElementById("Monto");
                    let opcion = document.createElement("option");
                    opcion.value = telcel[i];
                    opcion.text = '$ ' + telcel[i];
                    opciones.appendChild(opcion);
                }
                var montos = M.FormSelect.init(select);
                break;
            case 'Movistar':
                let movistar = [100, 150, 200];
                for (i in movistar) {
                    let opciones = document.getElementById("Monto");
                    let opcion = document.createElement("option");
                    opcion.value = movistar[i];
                    opcion.text = '$ ' + movistar[i];
                    opciones.appendChild(opcion);
                }
                montos = M.FormSelect.init(select);
                break;
            case 'Unefon':
                let unefon = [10, 20, 30, 50, 70, 100, 150, 200, 300];
                for (i in unefon) {
                    let opciones = document.getElementById("Monto");
                    let opcion = document.createElement("option");
                    opcion.value = unefon[i];
                    opcion.text = '$ ' + unefon[i];
                    opciones.appendChild(opcion);
                }
                montos = M.FormSelect.init(select);
                break;
            case 'AT&T':
                let at = [100, 150, 200, 300, 500];
                for (i in at) {
                    let opciones = document.getElementById("Monto");
                    let opcion = document.createElement("option");
                    opcion.value = at[i];
                    opcion.text = '$ ' + at[i];
                    opciones.appendChild(opcion);
                }
                montos = M.FormSelect.init(select);
                break;
            default:
                break;
        }
    }
});