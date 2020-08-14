document.addEventListener('DOMContentLoaded', function () {
    var elems = document.getElementById('modalCliente');
    var modalCliente = M.Modal.init(elems);
    var elems = document.getElementById('Cliente');
    var autocompleteCliente = M.Autocomplete.init(elems, {
        onAutocomplete: function (e) {
            var idCliente;
            var data = new FormData();
            data.append('Nombre', e);
            fetch('idCliente', {
                method: 'POST',
                body: data
            })
                .then(res => res.json())
                .then(res => {
                    obtenerInfo(res, e);
                });
        }
    });
    document.body.addEventListener('click', function (e) {
        if (e.target.classList.contains('infoCliente')) {
            console.table(e.srcElement.id, e.srcElement.name);
            obtenerInfo(e.srcElement.id, e.srcElement.name);
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
        fetch('obtenerClientes')
            .then(res => res.json())
            .then(res => {
                var data = {};
                for (i in res) {
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
                    <td>${res[i].Deudas}</td>
                    <td>$${res[i].Usd} Usd, $${res[i].Mxn} Mxn</td>
                    <td><a class="waves-effect waves-light yellow btn black-text infoCliente" id="${res[i].idCliente}" name="${res[i].Nombre}">Editar</a></td>
                </tr>
            `;
        }
    }

    function obtenerInfo(idCliente, nombre) {
        const datos = new FormData();
        datos.append('idCliente', idCliente);
        fetch('infoCliente', {
            method: 'POST',
            body: datos
        })
            .then(res => res.json())
            .then(res => {
                limpiarTablaDetalleCliente();
                document.getElementById('nombreCliente').textContent = nombre;
                for (i in res) {
                    document.getElementById('infoCliente').innerHTML += `
                        <tr>
                            <td>${res[i].idVenta}</td>
                            <td>${res[i].Servicio}</td>
                            <td>$${res[i].Usd} Usd, $${res[i].Mxn} Mxn</td>
                            <td>${res[i].fecha}</td>
                        </tr>
                    `
                }
                modalCliente.open();
            })
    }

    function limpiarTablaDetalleCliente() {
        while (document.getElementById('infoCliente').firstChild) {
            document.getElementById('infoCliente').removeChild(document.getElementById('infoCliente').firstChild);
        }
    }
});