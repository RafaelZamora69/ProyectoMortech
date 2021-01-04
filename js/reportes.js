document.addEventListener('DOMContentLoaded', () => {
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
    const operadoraSelect = M.FormSelect.init(document.getElementById('Operadora'));
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
    const modalDetalles = M.Modal.init(document.getElementById('modalDetalles'));
    document.getElementById('Actualizar').onclick = actualizar;
    //
    let idVenta;
    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('infoVenta')) {
            obtenerDatos(e.target.id.replace('detalles-', ''));
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
            RecargasCorte((document.getElementById('buscarCorte').value).replace('/\s/g',''));
        }
    })
    document.getElementById('buscarNumero').addEventListener('keypress', (e) => {
        if(e.key == 'Enter'){
            infoNumero((document.getElementById('buscarNumero').value).replace('/\s/g',''));
        }
    });
    document.getElementById('facturaStel').addEventListener('click', () => {
        cargarDetalles();
    });
    document.getElementById('NumsNemi').addEventListener('click', () => {
       reporteNemi();
    });
    obtenerEmpleados();
    obtenerClientes();

    function reporteNemi(){
        fetch('reporteNemi')
            .then(res => res.json())
            .then(res => {
                document.getElementById('Tabla').innerHTML = `
                    <table class="centered">
                        <thead>
                            <tr>
                                <th>N° Serie</th>
                                <th>N° Nemi</th>
                                <th>Activada</th>
                            </tr>
                        </thead>
                        <tbody id="reporteNemiTable"></tbody>
                    </table>
                `;
                const reporteNemiTable = document.getElementById('reporteNemiTable');
                res.map(x => {
                   reporteNemiTable.insertAdjacentHTML('beforeend',`
                        <tr>
                            <td>${x.Serie}</td>
                            <td>${x.Num}</td>
                            <td>${x.Activada}</td>
                        </tr>
                   `);
                });
            })
    }

    function cargarDetalles(){

        fetch('serviciosStel')
            .then(res => res.json())
            .then(res => {
                console.log(res);
                fetch('recargasStel')
                    .then(res => res.json())
                    .then(res => {
                        console.log(res);
                    });
            });
    }

    function mostrarDetalles(data, Servicio) {
        if(Servicio == 'Corte'){
            document.getElementById('Detalles').innerHTML = `
                <p>Registros: ${data.length}</p>
                <p>Usd: $${obtenerDolares(data,'Corte')}</p>
                <p>Mxn: $${obtenerPesos(data, 'Corte')}</p>
            `;
        } else {
            document.getElementById('Detalles').innerHTML = `
                <p>Registros: ${data.length}</p>
                <p>Usd: $${obtenerDolares(data, 'Si')} Usd</p>
                <p>Credito Usd: $${obtenerDolares(data, 'No')} Usd</p>
                <p>Mxn: $${obtenerPesos(data, 'Si')} Mxn</p>
                <p>Credito Mxn: $${obtenerPesos(data, 'No')} Mxn</p>
            `;
            if (Servicio == 'Saldo') {
                document.getElementById('Detalles').innerHTML += `
                <p>Saldo utilizado: $${saldoUtilizado(data)}</p>
            `
            }
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
        let Usd = 0;
        if(Pagado == 'Corte'){
            data.filter(entry => Usd += parseFloat(entry['Usd']));
        } else {
            data.filter((entry) => {
                if (entry['Venta'] !== undefined) {
                    if (entry['Venta'].includes(' Usd') && entry['Pagado'] === Pagado) {
                        const aux = entry['Venta'].replace(' Usd', '');
                        Usd += parseFloat(aux);
                    }
                }
            });
        }
        return new Intl.NumberFormat().format(Usd);
    }

    function obtenerPesos(data, Pagado) {
        let Mxn = 0;
        if(Pagado == 'Corte'){
            data.filter(entry => Mxn += parseFloat(entry['Mxn']));
        } else {
            data.filter(entry => {
                if (entry['Venta'] !== undefined) {
                    if (entry['Venta'].includes(' Mxn') && entry['Pagado'] === Pagado) {
                        const aux = entry['Venta'].replace(' Mxn', '');
                        Mxn += parseFloat(aux);
                    }
                }
            });
        }
        return new Intl.NumberFormat().format(Mxn);
    }

    function filtrar(res, tipo) {
        if (document.getElementById('autocompleteEmpleado').value !== "") {
            res = res.filter(x => x.Empleado === document.getElementById('autocompleteEmpleado').value);
        }
        if (document.getElementById('autoCompleteClientes').value !== "") {
            res = res.filter(x => x.Cliente === document.getElementById('autoCompleteClientes').value);
        }
        if(tipo === 'Corte'){
            mostrarDetalles(res,tipo);
            return res;
        }
        if(document.getElementById('Pagado').checked){
            res = res.filter(x => x.Pagado === 'Si');
        } else if(document.getElementById('Credito').checked){
            res = res.filter(x => x.Pagado === 'No');
        }
        if(document.getElementById('Verificadas').checked){
            res = res.filter(x => x.Verificada === 'Si');
        } else if(document.getElementById('NoVerificadas').checked){
            res = res.filter(x => x.Verificada === 'No');
        }
        if(document.getElementById('EnCorte').checked){
            res = res.filter(x => x.Corte === 'Si');
        } else if(document.getElementById('SinCorte').checked){
            res = res.filter(x => x.Corte === 'No');
        }
        if(tipo === 'Saldo'){
            const OperadoraValue = document.getElementById('Operadora').value;
            if(OperadoraValue !== 'N/A'){
                const values = OperadoraValue.split(" ");
                res = res.filter(x => x.Operadora === values[0]);
                if(values[1] !== 'ALL'){
                    res = res.filter(x => x.Monto === parseInt(values[1]));
                }
            }
        }
        mostrarDetalles(res, tipo);
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

    function consultaServicios(data){
        fetch('consultaServicios', {
            method: 'POST',
            body: data
        })
            .then(res => res.json())
            .then(res => {
                res = filtrar(res);
                if(res.length > 0) {
                    document.getElementById('Tabla').innerHTML = `
                        <table class="centered responsive-table">
                            <thead>
                                <tr>
                                    <th>Empleado</th>
                                    <th>Cliente</th>
                                    <th>Servicio</th>
                                    <th>Venta</th>
                                    <th>Fecha</th>
                                    <th>Pagada</th>
                                    <th>Verificada</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody id="serviciosBody"></tbody>
                        </table>
                    `;
                    for(i in res){
                        document.getElementById('serviciosBody').innerHTML += `
                            <tr>
                                <td>${res[i].Empleado}</td>
                                <td>${res[i].Cliente}</td>
                                <td>${res[i].Servicio}</td>
                                <td>${res[i].Venta}</td>
                                <td>${res[i].Fecha}</td>
                                <td>${res[i].Pagado}</td>
                                <td>${res[i].Verificada}</td>
                                <td><a class="infoVenta btn waves-effect yellow black-text" id="detalles-${res[i].idVenta}">Detalles</a></td>
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

    function consultaRecargas(data){
        fetch('consultaRecargas',{
            method: 'POST',
            body: data
        })
            .then(res => res.json())
            .then(res => {
                res = filtrar(res, 'Saldo');
                if(res.length > 0){
                    document.getElementById('Tabla').innerHTML = `
                        <table class="responsive-table centered">
                            <thead>
                                <tr>
                                    <th>Empleado</th>
                                    <th>Cliente</th> 
                                    <th>Teléfono</th>
                                    <th>Operadora</th>
                                    <th>Monto</th>
                                    <th>Venta</th>
                                    <th>fecha</th>
                                    <th><a class="btn waves-effect waves-light" id="Copiar">Copiar números</a></th>
                                </tr>
                            </thead>
                            <tbody id="recargasBody"></tbody>
                        </table>
                    `;
                    document.getElementById('Copiar').addEventListener('click',(e) => {
                        document.getElementById('Tabla').innerHTML += `
                            <input type="text" value="${Numeros(res)}" id="Nums">
                        `;
                        const cop = document.getElementById('Nums');
                       cop.select();
                       document.execCommand('selectAll');
                       document.execCommand('copy');
                       cop.style.visibility = 'hidden';
                       M.toast({ html: 'Numeros copiados', classes: 'green white-text' });
                    });
                    const recargasBody = document.getElementById('recargasBody');
                    res.map(i => recargasBody.insertAdjacentHTML('beforeend', `
                            <tr>
                                <td>${i.Empleado}</td>
                                <td>${i.Cliente}</td>
                                <td>${i.Telefono}</td>
                                <td>${i.Operadora}</td>
                                <td>${i.Monto}</td>
                                <td>${i.Venta}</td>
                                <td>${i.Fecha}</td>
                                <td><a class="infoVenta btn waves-effect yellow black-text" id="detalles-${i.idVenta}">Detalles</a></td>
                            </tr>
                        `));
                } else {
                    document.getElementById('Tabla').innerHTML = `
                        <h4 class="center-align">No hay datos que mostrar</h4>
                    `;
                }
            });
    }

    function consultaTodosServicios(data){
        fetch('consultaTodosServicios',{
            method: 'POST',
            body: data
        })
            .then(res => res.json())
            .then(res => {
                res = filtrar(res);
                if(res.length > 0){
                    document.getElementById('Tabla').innerHTML = `
                        <table class="centered responsive-table">
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
                    const todoServiciosBody = document.getElementById('todoServiciosBody');
                    res.map( i => todoServiciosBody.insertAdjacentHTML('beforeend', `
                        <tr>
                                <td>${i.Empleado}</td>
                                <td>${i.Cliente}</td>
                                <td>${i.Servicio}</td>
                                <td>${i.Venta}</td>
                                <td>${i.Pagado}</td>
                                <td><a class="infoVenta btn waves-effect yellow black-text" id="detalles-${i.idVenta}">Detalles</a></td>
                        </tr>
                    `));
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
                res = filtrar(res, 'Corte');
                if(res.length > 0){
                    document.getElementById('Tabla').innerHTML = `
                        <table class="responsive-table centered">
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
                    for (i in res) {
                        document.getElementById('tablaCorte').innerHTML += `
                            </tr>
                                <td>${res[i].Empleado}</td>
                                <td>${res[i].Iniciado}</td>
                                <td>${res[i].Realizado}</td>
                                <td>${res[i].Usd}</td>
                                <td>${res[i].Mxn}</td>
                                <td><a class="btn waves-effect waves-ligth green white-text DetallesCorte" id="Detalles-${res[i].idCorte}">Detalles</a></td>
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
        const data = new FormData(document.getElementById('dataActualizar'));
        const pagado = document.getElementById('EstaPagado').checked ? 1 : 0;
        const verificada = document.getElementById('Verificada').checked ? 1 : 0;
        data.append('pagado', pagado);
        data.append('idVenta', idVenta);
        data.append('Verificada', verificada);
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
                document.getElementById("EstaPagado").checked = res[0].Pagado == 0 ?  false : true;
                res[0].Corte == 0 ? document.getElementById("Actualizar").classList.remove("disabled") : document.getElementById("Actualizar").classList.add("disabled")
                document.getElementById('Verificada').checked = res[0].Verificada == 0 ?  false : true;
                modal.open();
            }).catch(function (){
            M.toast({ html: 'Venta no encontrada', classes: 'red white-text'})
        });
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

    function infoNumero(Numero){
        const data = new FormData();
        data.append('Numero', Numero);
        fetch('infoNumero', {
            method: 'POST',
            body: data
        })
            .then(res => res.json())
            .then(res => {
                document.getElementById('modalDetallesCuerpo').innerHTML = `
                    <h4>Detalles</h4>
                    <table class="striped responsive-table">
                        <thead>
                            <tr>
                                <th># Venta</th>
                                <th>Cliente</th>
                                <th>Empleado</th> 
                                <th>Número</th>
                                <th>Operadora</th>
                                <th>Monto</th>
                                <th>Ingreso</th>
                                <th>Pagado</th>
                                <th>Fecha</th>
                            </tr> 
                        </thead>
                        <tbody id="detalleNumero"></tbody>
                    </table>
                `;
                for(i in res){
                    document.getElementById('detalleNumero').innerHTML += `
                        <tr>
                            <td><a id="detalles-${res[i].idVenta}" class="infoVenta">${res[i].idVenta}</a></td> 
                            <td>${res[i].Cliente}</td>
                            <td>${res[i].Empleado}</td>
                            <td>${res[i].NumeroTelefono}</td>
                            <td>${res[i].Operadora}</td>
                            <td>${res[i].Monto}</td>
                            <td>$${res[i].Usd} Usd, $${res[i].Mxn} Mxn</td>
                            <td>${res[i].Pagado}</td>
                            <td>${res[i].Fecha}</td>
                        </tr>
                    `;
                }
                modalDetalles.open();
            });
    }

    function Numeros(res){
        var numeros = '';
        for(i in res){
            numeros = numeros.concat(res[i].Telefono,',');
        }
        return numeros;
    }
});