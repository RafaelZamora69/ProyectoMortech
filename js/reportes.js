document.addEventListener('DOMContentLoaded', function () {
    //Fechas
    var today = new Date();
    var elems = document.getElementById('Desde');
    const Desde = M.Datepicker.init(elems, {
        defaultDate: new Date(today.getFullYear(), today.getMonth(), 1),
        setDefaultDate: true,
        format: 'yyyy-mm-dd',
        maxDate: new Date(today.getFullYear(), today.getMonth(), today.getDate())
    });
    var elems = document.getElementById('Hasta');
    const Hasta = M.Datepicker.init(elems, {
        defaultDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
        setDefaultDate: true,
        format: 'yyyy-mm-dd',
        maxDate: new Date(today.getFullYear(), today.getMonth(), today.getDate())
    });
    //Inicializar componentes
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems);
    var elems = document.getElementById('autoCompleteClientes');
    var clientes = M.Autocomplete.init(elems);
    var elems = document.getElementById('autocompleteEmpleado');
    var empleados = M.Autocomplete.init(elems);
    var elems = document.getElementById('NombreCliente');
    var clientesModal = M.Autocomplete.init(elems);
    var elems = document.getElementById('NombreEmpleado');
    var empleadoModal = M.Autocomplete.init(elems);

    var elems = document.getElementById('modalEditar');
    var modal = M.Modal.init(elems);
    document.getElementById('Actualizar').onclick = actualizar;
    //Datos para el filtro
    let Tipo = 'Ventas';
    let Servicio = 'TodosServicios';
    let Mostrar;
    let originalData;
    let filterData;
    let idVenta;
    let Usd = 0;
    let Mxn = 0;
    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('infoCliente')) {
            obtenerDatos(e.target.id);
        } else if(e.target.classList.contains('DetallesCorte')){
            console.log('Detalles');
            RecargasCorte(e.target.id.replace('Detalles-'));
        }

    });
    document.getElementById("Consultar").addEventListener('click', Consultar);
    document.getElementById('buscarVenta').addEventListener('keypress', function(e){
       if(e.key == 'Enter'){
           obtenerDatos(document.getElementById('buscarVenta').value);
       }
    });
    obtenerEmpleados();
    obtenerClientes();

    function mostrarDetalles(data) {
        let container = document.getElementById('Detalles');
        container.innerHTML = `<p>Registros: ${data.length}</p>
        <p>Usd: $${Usd = obtenerDolares(data, 'Si')} Usd</p>
        <p>Credito Usd: $${Usd = obtenerDolares(data, 'No')} Usd</p>
        <p>Mxn: $${Mxn = obtenerPesos(data, 'Si')} Mxn</p>
        <p>Credito Mxn: $${Mxn = obtenerPesos(data, 'No')} Mxn</p>
        `;
        if (Servicio == 'Saldo') {
            //Detalles en formato de saldo
            container.innerHTML += `
                <p>Saldo utilizado: $${saldoUtilizado(data)}</p>
            `
        }
    }

    function saldoUtilizado(data) {
        let saldo = 0;
        data.filter(function (entry) {
            if (entry['Venta'] !== undefined) {
                saldo += parseInt(entry['Monto']);
            }
        });
        return saldo;
    }

    function obtenerDolares(data, Pagado) {
        Usd = 0;
        data.filter(function (entry) {
            if (entry['Venta'] !== undefined) {
                if (entry['Venta'].includes(' Usd') && entry['Pagado'] === Pagado) {
                    var aux = entry['Venta'].replace(' Usd', '');
                    Usd += parseFloat(aux);
                }
            }
        });
        return new Intl.NumberFormat().format(Usd);
    }

    function obtenerPesos(data, Pagado) {
        Mxn = 0;
        data.filter(function (entry) {
            if (entry['Venta'] !== undefined) {
                if (entry['Venta'].includes(' Mxn') && entry['Pagado'] === Pagado) {
                    var aux = entry['Venta'].replace(' Mxn', '');
                    Mxn += parseFloat(aux);
                }
            }
        });
        return new Intl.NumberFormat().format(Mxn);
    }

    function filtrar() {
        filterData = originalData;
        if (!document.getElementById('autoCompleteEmpleados').value == "") {
            filterData = filterData.filter(function (entry) {
                return entry.Empleado == document.getElementById('autoCompleteEmpleados').value;
            });
        }
        if (!document.getElementById('autoCompleteClientes').value == "") {
            filterData = filterData.filter(function (entry) {
                return entry.Cliente == document.getElementById('autoCompleteClientes').value;
            });
        }
        mostrarDetalles(filterData);
        switch (Mostrar) {
            case 'General':
                TablaGeneral(filterData);
                break;
            case 'Saldo':
                TablaSaldo(filterData);
                break;
            case 'Corte':
                TablaCorte(filterData);
                break;
        }
    }

    function Consultar() {
        const form = new FormData(document.getElementById('FormFiltro'));
        var res;
        if(document.getElementById('Corte').checked){
            consultaCorte(form);
        } else {
            res = consultaVenta(form);
        }
    }

    function consultaCorte(data){
        fetch('consultaCorte',{
            method: 'POST',
            body: data
        })
            .then(res => res.json())
            .then(res =>{
                CargarTablaCorte();
                if(document.getElementById('autocompleteEmpleado').value != ''){
                    res = res.filter(x => x.Empleado == document.getElementById('autocompleteEmpleado').value);
                }
                TablaCorte(res);
            });
    }

    function RecargasCorte(idCorte){
        const data = new FormData();
        data.append('idCorte', idCorte);
        fetch('recargasCorte',{
            method: 'POST',
            body: data
        })
            .then(res => res.json())
            .then(res => {
                //TODO añadir datos a tabla con modal
                console.log(res);
                ServiciosCorte(idCorte);
            });
    }

    function ServiciosCorte(idCorte){
        const data = new FormData();
        data.append('idCorte', idCorte);
        fetch('serviciosCorte',{
            method: 'POST',
            body: data
        })
            .then(res => res.json())
            .then(res => {
                //TODO añadir datos a tabla con modal y luego mostrar el modal
                console.log(res);
            });
    }

    function actualizar() {
        var data = new FormData(document.getElementById('dataActualizar'));
        var pagado = document.getElementById('EstaPagado').checked ? 1 : 0;
        data.append('pagado', pagado);
        data.append('idVenta', idVenta);
        fetch('actualizarVenta', {
            method: 'POST',
            body: data
        })
            .then(res => res.json())
            .then(res => {
                res.Codigo == 1 ?
                    M.toast({ html: res.Mensaje, classes: 'green white-text' }) :
                    M.toast({ html: 'Error ' + res.Mensaje, classes: 'red white-text' })
            })
    }

    function obtenerDatos(id) {
        idVenta = id;
        var data = new FormData();
        data.append('idVenta', id);
        fetch('obtenerDetalles', {
            method: 'POST',
            body: data
        })
            .then(res => res.json())
            .then(res => {
                document.getElementById('idVenta').innerText = '# ' + res[0].idVenta;
                document.getElementById("NombreEmpleado").value = res[0].Empleado;
                document.getElementById("NombreCliente").value = res[0].Cliente;
                document.getElementById("Mxn").value = res[0].Mxn;
                document.getElementById("Usd").value = res[0].Usd;
                document.getElementById("Observaciones").value = res[0].Observaciones;
                res[0].Pagado == 0 ? document.getElementById("EstaPagado").checked = false : document.getElementById("EstaPagado").checked = true;
                res[0].Corte == 0 ? document.getElementById("Actualizar").classList.remove("disabled") : document.getElementById("Actualizar").classList.add("disabled")
                modal.open();
            }).catch(function (){
            M.toast({ html: 'Venta no encontrada', classes: 'red white-text'})
        });
    }

    function TablaCorte(data) {
        CargarTablaCorte();
        for (i in data) {
            document.getElementById('TableBody').innerHTML += `
                    </tr>
                        <td>${data[i].Empleado}</td>
                        <td>${data[i].Iniciado}</td>
                        <td>${data[i].Realizado}</td>
                        <td>${data[i].Usd}</td>
                        <td>${data[i].Mxn}</td>
                        <td><a class="btn waves-effect waves-ligth green white-text DetallesCorte" id="Detalles-${data[i].idCorte}">Detalles</a></td>
                    </tr>
            `;
        }
    }

    function CargarTablaCorte() {
        LimpiarTablas();
        document.getElementById('Headers').innerHTML += `
            <th>Empleado</th>
            <th>Iniciado</th>
            <th>Realizado</th>
            <th>Usd</th>
            <th>Mxn</th>
            <th></th>
        `;
    }

    function TablaSaldo(data) {
        CargarTablaSaldo();
        for (i in data) {
            if (data[i].Empleado != undefined) {
                document.getElementById('TableBody').innerHTML += `
                    <tr>
                        <td>${data[i].Empleado}</td>
                        <td>${data[i].Cliente}</td>
                        <td>${data[i].Telefono}</td>
                        <td>${data[i].Operadora}</td>
                        <td>${data[i].Monto}</td>
                        <td>${data[i].Venta}</td>
                        <td class="${parseFloat(data[i].Utilidad) < 0 ? 'red-text' : 'green-text'}">${data[i].Utilidad}</td>
                        <td>${data[i].Verificada}</td>
                        <td>${data[i].Pagado}</td>
                        <td>${data[i].Corte}</td>
                        <td>${data[i].fecha}</td>
                        <td><a class="waves-effect waves-light yellow btn black-text infoCliente" id="${data[i].idVenta}">Editar</a></td>
                    </tr>
                `;
            }
        }
    }

    function CargarTablaSaldo() {
        LimpiarTablas();
        document.getElementById('Headers').innerHTML += `
            <th>Empleado</th>
            <th>Cliente</th>
            <th>Teléfono</th>
            <th>Operadora</th>
            <th>Saldo</th>
            <th>Ingreso</th>
            <th>Utilidad</th>
            <th>Verificado</th>
            <th>Pagado</th>
            <th>Corte</th>
            <th>Fecha</th>
            <th></th>
        `;
    }

    function TablaGeneral(data) {
        CargarTablaGeneral();
        for (i in data) {
            if (data[i].Empleado != undefined) {
                document.getElementById('TableBody').innerHTML += `
                    <tr>
                        <td>${data[i].Empleado}</td>
                        <td>${data[i].Servicio}</td>
                        <td>${data[i].Cliente}</td>
                        <td>${data[i].Venta}</td>
                        <td>${data[i].Pagado}</td>
                        <td>${data[i].Corte}</td>
                        <td>${data[i].fecha}</td>
                        <td><a class="waves-effect waves-light yellow btn black-text infoCliente" id="${data[i].idVenta}">Editar</a></td>
                    </tr>
                `;
            }
        }
    }

    function CargarTablaGeneral() {
        LimpiarTablas();
        document.getElementById('Headers').innerHTML += `
            <th>Empleado</th>
            <th>Servicio</th>
            <th>Cliente</th>
            <th>Ingreso</th>
            <th>Pagado</th>
            <th>Corte</th>
            <th>Fecha</th>
            <th></th>
        `;
    }

    function LimpiarTablas() {
        //Verificar si ya estaba inicializada y borrar
        while (document.getElementById("Headers").firstChild) {
            document.getElementById("Headers").removeChild(document.getElementById("Headers").firstChild);
        }
        while (document.getElementById("TableBody").firstChild) {
            document.getElementById("TableBody").removeChild(document.getElementById("TableBody").firstChild);
        }
    }

    function obtenerEmpleados() {
        fetch('obtenerEmpleados')
            .then(res => res.json())
            .then(res => {
                let data = {};
                for (i in res) {
                    data[res[i]] = null;
                }
                empleados.updateData(data);
                empleadoModal.updateData(data);
            })
    }

    function obtenerClientes() {
        fetch('obtenerClientes')
            .then(res => res.json())
            .then(res => {
                let data = {};
                for (i in res) {
                    data[res[i]] = null;
                }
                clientes.updateData(data);
                clientesModal.updateData(data);
            })
    }
});