document.addEventListener('DOMContentLoaded', function () {
    var elems = document.getElementById('modalCliente');
    var modalCliente = M.Modal.init(elems);
    var elems = document.getElementById('Cliente');
    var autocompleteCliente = M.Autocomplete.init(elems, {
        onAutocomplete: function (e) {
            var idCliente;
            var data = new FormData();
            data.append('Nombre', e);
            if(!Number.isInteger(Number.parseInt(e))){
                fetch('idCliente', {
                    method: 'POST',
                    body: data
                })
                    .then(res => res.json())
                    .then(res => {
                        obtenerInfo(res, e);
                    });
            } else {
                fetch('buscarNumero',{
                    method: 'POST',
                    body: data
                })
                    .then(res => res.json())
                    .then(res => {
                        obtenerInfo(res.idCliente, res.Nombre);
                    });
            }
        }
    });
    document.body.addEventListener('click', function (e) {
        if (e.target.classList.contains('infoCliente')) {
            obtenerInfo(Event.srcElement.id, Event.srcElement.name);
        }
    });
    obtenerClientes();

    function obtenerClientes() {
        fetch('creditoClientes', {
            method: 'POST'
        })
            .then(res => res.json())
            .then(res => {
                cargarTabla(res);
                cargarAutocomplete();
            });
    }

    function cargarAutocomplete() {
        var data = {};
        fetch('obtenerClientes')
            .then(res => res.json())
            .then(res => {
                for (i in res) {
                    data[res[i]] = null;
                }
            });
        fetch('obtenerNumeros')
            .then(res => res.json())
            .then(res => {
                for(i in res){
                    data[res[i]] = null;
                }
                autocompleteCliente.updateData(data);
            });
    }

    function cargarTabla(res) {
        for (i in res) {
            document.getElementById('TablaDeudas').innerHTML += `
                <tr>
                    <td>${res[i].Nombre}</td>
                    <td>${res[i].Servicio}</td>
                    <td>$${res[i].Usd} Usd, $${res[i].Mxn} Mxn</td>
                    <td>${res[i].Fecha}</td>
                    <td>${res[i].Observaciones}</td>
                </tr>
            `;
            if (res[i].Deudas == 0) {
                document.getElementById(res[i].idCliente).classList.add('disabled');
            }
        }
    }

    function obtenerInfo(idCliente, nombre) {
        var datos = new FormData();
        datos.append('idCliente', idCliente);
        datos.append('tipo', 'ventas');
        fetch('infoCliente',{
            method: 'POST',
            body: datos
        })
            .then(res => res.json())
            .then(res => {
                document.getElementById('nombreCliente').textContent = nombre;
                limpiarTablaDetalleCliente();
                for (i in res) {
                    document.getElementById('ventasCliente').innerHTML += `
                        <tr>
                            <td>${res[i].idVenta}</td>
                            <td>${res[i].Servicio}</td>
                            <td>$${res[i].Usd} Usd, $${res[i].Mxn} Mxn</td>
                            <td>${res[i].fecha}</td>
                        </tr>
                    `;
                }
            });
        //Tabla crédito
        datos = new FormData();
        datos.append('idCliente', idCliente);
        datos.append('tipo', 'credito');
        fetch('infoCliente', {
            method: 'POST',
            body: datos
        })
            .then(res => res.json())
            .then(res => {
                for (i in res) {
                    document.getElementById('creditoCliente').innerHTML += `
                        <tr>
                            <td>${res[i].idVenta}</td>
                            <td>${res[i].Servicio}</td>
                            <td>$${res[i].Usd} Usd, $${res[i].Mxn} Mxn</td>
                            <td>${res[i].fecha}</td>
                        </tr>
                    `;
                }
                modalCliente.open();
            })
    }

    function limpiarTablaDetalleCliente() {
        while (document.getElementById('ventasCliente').firstChild) {
            document.getElementById('ventasCliente').removeChild(document.getElementById('ventasCliente').firstChild);
        }
        while (document.getElementById('creditoCliente').firstChild) {
            document.getElementById('creditoCliente').removeChild(document.getElementById('creditoCliente').firstChild);
        }
    }
});