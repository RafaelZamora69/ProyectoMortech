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
    let idVenta;
    let Usd = 0;
    let Mxn = 0;
    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('infoCliente')) {
            obtenerDatos(e.target.id);
        } else if(e.target.classList.contains('DetallesCorte')){
            RecargasCorte(e.target.id.replace('Detalles-',''));
        }

    });
    document.getElementById("Consultar").addEventListener('click', Consultar);
    document.getElementById('buscarVenta').addEventListener('keypress', function(e){
       if(e.key == 'Enter'){
           obtenerDatos(document.getElementById('buscarVenta').value);
       }
    });
    document.getElementById('buscarCorte').addEventListener('keypress', (e) => {
        if(e.key == 'Enter'){
            RecargasCorte(document.getElementById('buscarCorte').value);
        }
    })
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

    function filtrar(res, tipo) {
        if (document.getElementById('autocompleteEmpleado').value != "") {
            res = res.filter(x => x.Empleado == document.getElementById('autocompleteEmpleado').value);
        }
        if (document.getElementById('autoCompleteClientes').value != "") {
            res = res.filter(x => x.Cliente == document.getElementById('autoCompleteClientes').value);
        }
        if(tipo == 'Corte'){
            mostrarDetalles(res);
            return res;
        }
        if(document.getElementById('Pagado').checked){
            res = res.filter(x => x.Pagado == 'Si');
        } else if(document.getElementById('Credito').checked){
            res = res.filter(x => x.Pagado == 'No');
        }
        if(document.getElementById('Verificadas').checked){
            res = res.filter(x => x.Verificada == 'Si');
        } else if(document.getElementById('NoVerificadas').checked){
            res = res.filter(x => x.Verificada == 'No');
        }
        if(document.getElementById('EnCorte').checked){
            res = res.filter(x => x.Corte == 'Si');
        } else if(document.getElementById('SinCorte').checked){
            res = res.filter(x => x.Corte == 'No');
        }
        mostrarDetalles(res);
        return res;
    }

    function Consultar() {
        const form = new FormData(document.getElementById('FormFiltro'));
        if(document.getElementById('Corte').checked){
            consultaCorte(form);
            return;
        }
        if(document.getElementById('TodosServicios').checked){
            consultaTodosServicios(form);
            return;
        }
        if(document.getElementById('Saldo').checked){
            consultaRecargas(form);
            return;
        }
        if(document.getElementById('Servicios').checked){
            consultaServicios(form);
            return;
        }
    }

    function consultaTodosServicios(data){
        fetch('consultaTodosServicios',{
            method: 'POST',
            body: data
        })
            .then(res => res.json())
            .then(res => {
                res = filtrar(res);
                console.log(res);
                if(res.length > 0){
                    document.getElementById('Tabla').innerHTML = `
                        <table>
                            <thead>
                                <tr>
                                    <th>Empleado</th>
                                    <th>Cliente</th>
                                    <th>Servicio</th>
                                    <th>Venta</th>
                                    <th>Pagado</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody id="todoServiciosBody"></tbody>
                        </table>
                    `;
                    for(i in res){
                        document.getElementById('todoServiciosBody').innerHTML += `
                            <tr>
                                <td>${res[i].Empleado}</td>
                                <td>${res[i].Cliente}</td>
                                <td>${res[i].Servicio}</td>
                                <td>${res[i].Venta}</td>
                                <td>${res[i].Pagado}</td>
                            </tr>
                        `;
                    }
                } else {
                    document.getElementById('Tabla').innerHTML = `
                        <h4 class="center-align">No hay datos que mostrar</h4>
                    `;
                }

            });
    }

    function consultaCorte(data){
        fetch('consultaCorte',{
            method: 'POST',
            body: data
        })
            .then(res => res.json())
            .then(res =>{
                CargarTablaCorte();
                res = filtrar(res, 'Corte');
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
                document.getElementById('modalDetallesCuerpo').innerHTML = `
                    <h4>Detalles corte #${idCorte}</h4>
                    <h5>Recargas</h5>
                `;
                if(res.length > 0){
                    document.getElementById('modalDetallesCuerpo').innerHTML += `
                            <table class="responsive-table">
                                <thead>
                                    <tr>
                                        <th>#venta</th>
                                        <th>Cliente</th>
                                        <th>Teléfono</th>
                                        <th>Monto</th>
                                        <th>Operadora</th>
                                        <th>Usd</th>
                                        <th>Mxn</th>
                                        <th>Utilidad</th>
                                        <th>Fecha</th>
                                        <th>Observaciones</th>
                                    </tr>
                                </thead>
                                <tbody id="recargasCorte"></tbody>
                            </table>
                        `;
                    for(i in res){
                        document.getElementById('recargasCorte').innerHTML += `
                            <tr>
                                <td>${res[i].idVenta}</td>
                                <td>${res[i].Cliente}</td>
                                <td>${res[i].Telefono}</td>
                                <td>${res[i].Monto}</td>
                                <td>${res[i].Operadora}</td>
                                <td>${res[i].Usd}</td>
                                <td>${res[i].Mxn}</td>
                                <td>${res[i].Utilidad}</td>
                                <td>${res[i].Fecha}</td>
                                <td>${res[i].Observaciones}</td>
                            </tr>
                        `;
                    }
                } else {
                    document.getElementById('modalDetallesCuerpo').innerHTML += `
                        <h6 class="center-align">No hay datos que mostrar</h6>
                    `;
                }
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
                if(res.length > 0){
                    document.getElementById('modalDetallesCuerpo').innerHTML += `
                        <h5>Servicios</h5>
                        <table class="responsive-table">
                            <thead>
                                <tr>
                                    <th>#venta</th>
                                    <th>Cliente</th>
                                    <th>Servicio</th>
                                    <th>Usd</th>
                                    <th>Mxn</th>
                                    <th>Fecha</th>
                                    <th>Verificada</th>
                                    <th>Observaciones</th>
                                </tr>
                            </thead>
                            <tbody id="serviciosCorte"></tbody>
                        </table>
                    `;
                    for(i in res){
                        document.getElementById('serviciosCorte').innerHTML += `
                            <tr>
                                <td>${res[i].idVenta}</td>
                                <td>${res[i].Cliente}</td>
                                <td>${res[i].Servicio}</td>
                                <td>${res[i].Usd} Usd</td>
                                <td>${res[i].Mxn} Mxn</td>
                                <td>${res[i].Fecha}</td>
                                <td><p class="${res[i].Verificada == 1 ? 'green-text' : 'red-text'}">${res[i].Verificada == 1 ? 'Si' : 'No'}</p></td>
                                <td>${res[i].Observaciones}</td>
                            </tr>
                        `;
                    }
                } else {
                    document.getElementById('modalDetallesCuerpo').innerHTML += `
                        <h6 class="center-align">No hay datos que mostrar</h6>
                    `;
                }
                const modal = document.getElementById('modalDetalles');
                const instance = M.Modal.init(modal);
                instance.open();
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
            document.getElementById('tablaCorte').innerHTML += `
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
        document.getElementById('Tabla').innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Empleado</th>
                        <th>Iniciado</th>
                        <th>Realizado</th>
                        <th>Usd</th>
                        <th>Mxn</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody id="tablaCorte"></tbody>
            </table>
        `;
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