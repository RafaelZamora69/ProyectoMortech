document.addEventListener('DOMContentLoaded', () => {
    const today = new Date();
    M.Datepicker.init(document.getElementById('Desde'), {
        defaultDate: new Date(today.getFullYear(), today.getMonth(), 1),
        setDefaultDate: true,
        format: 'yyyy-mm-dd',
        maxDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
    });
    M.Datepicker.init(document.getElementById('Hasta'), {
        defaultDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
        setDefaultDate: true,
        format: 'yyyy-mm-dd',
        maxDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
    });
    M.Autocomplete.init(document.getElementById('autocompleteEmpleado'));
    M.Modal.init(document.getElementById('modalCompras'));
    M.Autocomplete.init(document.getElementById('autocompleteProveedor'));
    let Compras = null;
    initComponents();
    cargarCompras();
    document.getElementById('Filtrar').addEventListener('click', () => {
        limpiarRegistros();
        cargarCompras();
    });
    document.body.addEventListener('click', (e) => {
        //Obtener el ID de compra que se cambiará la información de pago
        if(e.target.classList.contains('dropdown-trigger')){
            idCompra = e.target.id;
        }
        //Modificar la información de pago
        if(e.target.classList.contains('metodosPago')){
            document.getElementById(idCompra).textContent = e.target.textContent;
            document.getElementById(idCompra).value = e.target.textContent;
        }
        if(e.target.classList.contains('actualizarCompra')){
            actualizarCompra(e.target.id.replace('actualizar-',''));
        }
        if(e.target.classList.contains('eliminarCompra')){
            eliminarCompra(e.target.id.replace('eliminar-',''));
        }
        if(e.target.classList.contains('descargarImagen')){
            descargarImagen(e.target.id.replace('img-',''));
        }
    });
    document.getElementById('facturaStel').addEventListener('click', () => {
        mostrarCompras();
    })
    document.getElementById('registrarCompras').addEventListener('click', () => {
       registrarComprasStel();
    });

    function initComponents(){
        fetch('obtenerEmpleados')
            .then(res => res.json())
            .then(res => {
                let data = {};
                for (i in res) {
                    data[res[i]] = null;
                }
                autocompleteEmp.updateData(data);
            });
        fetch('obtenerProveedores')
            .then(res => res.json())
            .then(res => {
                var data = {};
                for(i in res){
                    data[res[i]] = null;
                }
                autocompleteProv.updateData(data);
            });
    }

    function cargarCompras() {
        const data = new FormData();
        data.append('Desde', document.getElementById('Desde').value);
        data.append('Hasta', document.getElementById('Hasta').value);
        if(document.getElementById('Pend').checked){
            cargarComprasPendientes(data);
        } else if(document.getElementById('Pagada').checked){
            cargarComprasPagadas(data);1
        } else {
            cargarAmbasCompras(data);
        }
    }

    function cargarComprasPendientes(data){
        fetch('cargarComprasNoPagadas',{
            method: 'POST',
            body: data
        })
            .then(res => res.json())
            .then(res => {
                if(res.length > 0) {
                    if(document.getElementById('autocompleteEmpleado').value != ''){
                        res = res.filter(x => x.Nombre == document.getElementById('autocompleteEmpleado').value);
                    }
                    if(document.getElementById('autocompleteProveedor').value != ''){
                        res = res.filter(x => x.Proveedor == document.getElementById('autocompleteProveedor').value);
                    }
                    document.getElementById('detallesCompras').innerHTML = `
                        <p>Registros: ${res.length}</p>
                        <p>Total: $${total(res)}</p>
                    `;
                    document.getElementById('theadDetalleCompra').innerHTML = `
                        <tr>
                            <th>Empleado</th>
                            <th>Proveedor</th>
                            <th>Referencia</th>
                            <th>Total</th>
                            <th>Método de pago</th>
                            <th>Fecha</th>
                            <th>Comprobante</th>
                            <th></th>
                            <th></th>
                        </tr>
                    `;
                    mostrarDatos(res,'normal');
                }
            });
    }

    function cargarComprasPagadas(data){
        fetch('cargarComprasPagadas',{
            method: 'POST',
            body: data
        })
            .then(res => res.json())
            .then(res => {
                if(res.length > 0) {
                    if(document.getElementById('autocompleteEmpleado').value != ''){
                        res = res.filter(x => x.Nombre == document.getElementById('autocompleteEmpleado').value);
                    }
                    if(document.getElementById('autocompleteProveedor').value != ''){
                        res = res.filter(x => x.Proveedor == document.getElementById('autocompleteProveedor').value);
                    }
                    if(!document.getElementById('Ambos').checked){
                        document.getElementById('Efect').checked ? res = res.filter(x => x.Pagada == 'Efectivo') : res = res.filter(x => x.Pagada == 'Banco')
                    }
                    document.getElementById('detallesCompras').innerHTML = `
                        <p>Registros: ${res.length}</p>
                        <p>Efectivo: $${total(res.filter(x => x.Pagada == 'Efectivo'))}</p>
                        <p>Banco: $${total(res.filter(x => x.Pagada == 'Banco'))}</p>
                        <p>Total: $${total(res)}</p>
                    `;
                    document.getElementById('theadDetalleCompra').innerHTML = `
                        <tr>
                            <th>Empleado</th>
                            <th>Proveedor</th>
                            <th>Referencia</th>
                            <th># Stel</th>
                            <th>Total</th>
                            <th>Método de pago</th>
                            <th>Fecha</th>
                            <th>Comprobante</th>
                            <th></th>
                            <th></th>
                        </tr>
                    `;
                    mostrarDatos(res,'stel');
                }
            });
    }

    function cargarAmbasCompras(data){
        fetch('cargarAmbasCompras',{
            method: 'POST',
            body: data
        })
            .then(res => res.json())
            .then(res => {
                if(res.length > 0) {
                    if(document.getElementById('autocompleteEmpleado').value != ''){
                        res = res.filter(x => x.Nombre == document.getElementById('autocompleteEmpleado').value);
                    }
                    if(document.getElementById('autocompleteProveedor').value != ''){
                        res = res.filter(x => x.Proveedor == document.getElementById('autocompleteProveedor').value);
                    }
                    if(!document.getElementById('Ambos').checked){
                        document.getElementById('Efect').checked ? res = res.filter(x => x.Pagada == 'Efectivo') : res = res.filter(x => x.Pagada == 'Banco');
                    }
                    document.getElementById('detallesCompras').innerHTML = `
                        <p>Registros: ${res.length}</p>
                        <p>Efectivo: $${total(res.filter(x => x.Pagada == 'Efectivo'))}</p>
                        <p>Banco: $${total(res.filter(x => x.Pagada == 'Banco'))}</p>
                        <p>Total: $${total(res)}</p>
                        <p>Pendiente: $${total(res.filter(x => x.Pagada == 'Sin pagar'))}</p>
                    `;
                    document.getElementById('theadDetalleCompra').innerHTML = `
                        <tr>
                            <th>Empleado</th>
                            <th>Proveedor</th>
                            <th>Referencia</th>
                            <th>Total</th>
                            <th>Método de pago</th>
                            <th>Fecha</th>
                            <th>Comprobante</th>
                            <th></th>
                            <th></th>
                        </tr>
                    `;
                    mostrarDatos(res,'normal');
                }
            });
    }

    function mostrarDatos(res,modo){
        const tablaCompras = document.getElementById('tablaCompras');
        if(modo === 'normal'){
            res.map(x => {
                tablaCompras.insertAdjacentHTML('beforeend',`
                    <tr>
                        <td>${x.Nombre}</td>
                        <td>${x.Proveedor}</td>
                        <td><p class="truncate">${x.Referencia}</p></td>
                        <td>${x.Total}</td>
                        <td><a class='dropdown-trigger btn' data-target='metodosPago' id="${x.idCompra}">${x.Pagada}</a></td>
                        <td>${x.Fecha}</td>
                        <td id="img-${x.idCompra}"><a href="#!" class="descargarImagen" id="img-${x.idCompra}">Descargar comprobante</a></td>
                        <td><a id="actualizar-${x.idCompra}" class="btn waves-effect waves-light yellow black-text actualizarCompra">Actualizar</a></td>
                        <td><a id="eliminar-${x.idCompra}" class="btn waves-effect waves-light red eliminarCompra">Eliminar</a></td>
                    </tr>
                `);
            });
        } else {
            res.map(x => {
                tablaCompras.insertAdjacentHTML('beforeend',`
                    <tr>
                        <td>${x.Nombre}</td>
                        <td>${x.Proveedor}</td>
                        <td><p class="truncate">${x.Referencia}</p></td>
                        <td>${x.Stel}</td>
                        <td>${x.Total}</td>
                        <td><a class='dropdown-trigger btn' data-target='metodosPago' id="${x.idCompra}">${x.Pagada}</a></td>
                        <td>${x.Fecha}</td>
                        <td id="img-${x.idCompra}"><a href="#!" class="descargarImagen" id="img-${x.idCompra}">Descargar comprobante</a></td>
                        <td><a id="actualizar-${x.idCompra}" class="btn waves-effect waves-light yellow black-text actualizarCompra">Actualizar</a></td>
                        <td><a id="eliminar-${x.idCompra}" class="btn waves-effect waves-light red eliminarCompra">Eliminar</a></td>
                    </tr>
                `);
            })
        }
        document.getElementById('tablaCompras').insertAdjacentHTML('beforeend',`
            <ul id='metodosPago' class='dropdown-content'>
                <li><a class="metodosPago">Efectivo</a></li>
                <li><a class="metodosPago">Banco</a></li>
                <li class="divider" tabindex="-1"></li>
                <li><a class="metodosPago">Sin pagar</a></li>
            </ul>
        `);
        //Materialboxed
        M.Materialbox.init(document.querySelectorAll('.materialboxed'));
        //Dropdown
        M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'));
    }

    function descargarImagen(idCompra){
        const data = new FormData();
        data.append('idCompra', idCompra);
        fetch('descargarImagen',{
            method:'POST',
            body: data
        })
            .then(res => res.json())
            .then(res => {
                while(document.getElementById('img-'+idCompra).firstChild){
                    document.getElementById('img-'+idCompra).removeChild(document.getElementById('img-'+idCompra).firstChild);
                }
                document.getElementById('img-'+idCompra).insertAdjacentHTML('beforeend',`
                    <img src="data:image/png;base64,${res.Imagen}" class="responsive-img materialboxed" width="100px" data-caption="Comprobante compra #${idCompra}">
                `);
                M.Materialbox.init(document.querySelectorAll('.materialboxed'));
            });
    }

    function limpiarRegistros(){
        document.getElementById('tablaCompras').innerHTML = '';
    }

    function actualizarCompra(idCompra){
        const data = new FormData();
        data.append('idCompra', idCompra);
        data.append('Pagada', document.getElementById(idCompra).value);
        fetch('actualizarCompra',{
            method: 'POST',
            body: data
        })
            .then(res => res.json())
            .then(res => {
                res.Codigo == 0 ?
                    M.toast({ html: res.Mensaje, classes: 'green white-text' }) :
                    M.toast({ html: 'Error ' + res.Mensaje, classes: 'red white-text' });
            });
    }

    function eliminarCompra(idCompra){
        const data = new FormData();
        data.append('idCompra', idCompra);
        fetch('eliminarCompra',{
            method: 'POST',
            body: data
        })
            .then(res => res.json())
            .then(res => {
                res.Codigo == 0 ?
                    M.toast({ html: res.Mensaje, classes: 'green white-text' }) :
                    M.toast({ html: 'Error ' + res.Mensaje, classes: 'red white-text' });
            });
    }

    function total(res){
        var total = 0;
        res.map(x => total += x.Total);
        console.log(total);
        return total.toFixed(2);
    }

    function mostrarCompras(){
        fetch('comprasPagadas')
            .then(res => res.json())
            .then(res =>{
                if(res.length > 0){
                    const modalComprasBody = document.getElementById('modalComprasBody');
                    modalComprasBody.innerHTML = '<table class="centered-table">\n' +
                        '                <thead>\n' +
                        '                <tr>\n' +
                        '                    <th>idVenta</th>\n' +
                        '                    <th>Método de pago</th>\n' +
                        '                    <th>Total</th>\n' +
                        '                </tr>\n' +
                        '                </thead>\n' +
                        '                <tbody id="tablaComprasStel"></tbody>\n' +
                        '            </table>';
                    const tablaComprasStel = document.getElementById('tablaComprasStel');
                    res.map(i => tablaComprasStel.insertAdjacentHTML('beforeend',`
                       <tr>
                            <td>${i.idCompra}</td>
                            <td>${i.Pagada}</td>
                            <td>${i.Total}</td>
                       </tr>
                    `));
                    Compras = res;
                    document.getElementById('registrarCompras').classList.remove('disabled');
                } else {
                    document.getElementById('modalComprasBody').insertAdjacentHTML('beforeend',`
                        <h5>No hay nada que registrar</h5>
                    `);
                    document.getElementById('registrarCompras').classList.add('disabled');
                }
                modalCompras.open();
            });
    }

    function registrarComprasStel(){
        const Efectivo = Compras.filter(x => x.Pagada === 'Efectivo');
        const Bancario = Compras.filter(x => x.Pagada === 'Banco');
        const url = 'https://app.stelorder.com/app/purchaseInvoices?APIKEY=n5biArG4wjqpL5hP74wMqBYLunuQddWwn8OhHlva'
        const comprasStel = {
            "account-id": 2381072,
            "lines": []
        };
        if(Efectivo.length > 0){
            let total = 0;
            Efectivo.map(i => total += parseFloat(i.Total));
            let compras = 'Efectivo: ';
            Efectivo.map(i => compras += '#' + i.idCompra +',');
            comprasStel.lines.push({
                "line-type": "ITEM",
                "item-id": 7435287,
                "item-description": compras,
                "item-base-price": total
            });
        }
        if(Bancario.length > 0){
            let total = 0;
            Bancario.map(i => total += parseFloat(i.Total));
            let compras = 'Transferencia: ';
            Bancario.map(i => compras += '#' + i.idCompra +',');
            comprasStel.lines.push({
                "line-type": "ITEM",
                "item-id": 7435287,
                "item-description": compras,
                "item-base-price": total
            });
        }
        //Subir los datos a la API de stel
        fetch(url,{
            method: 'POST',
            body: JSON.stringify(comprasStel)
        })
            .then(res => res.json())
            .then(res => {
                const data = new FormData();
                data.append('referenciaStel', res[0]['full-reference']);
                fetch('actualizarCompras',{
                    method: 'POST',
                    body: data
                })
                    .then(res => res.json())
                    .then(res => {
                        res.Codigo === 0 ?
                        M.toast({ html: res.Mensaje, classes: 'green white-text' }) :
                        M.toast({ html: 'Error ' + res.Mensaje, classes: 'red white-text' });
                        modalCompras.close();
                    });
            })
    }
});