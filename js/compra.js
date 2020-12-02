document.addEventListener('DOMContentLoaded', () => {
    const today = new Date();
    var elems = document.getElementById('Desde');
    const Desde = M.Datepicker.init(elems, {
        defaultDate: new Date(today.getFullYear(), today.getMonth(), 1),
        setDefaultDate: true,
        format: 'yyyy-mm-dd',
        maxDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
    });
    var elems = document.getElementById('Hasta');
    const Hasta = M.Datepicker.init(elems, {
        defaultDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
        setDefaultDate: true,
        format: 'yyyy-mm-dd',
        maxDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
    });
    var elems = document.getElementById('autocompleteEmpleado');
    const autocompleteEmp = M.Autocomplete.init(elems);
    var elems = document.getElementById('autocompleteProveedor');
    const modalCompras = M.Modal.init(document.getElementById('modalCompras'));
    const autocompleteProv = M.Autocomplete.init(elems);
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
        var res;
        const data = new FormData();
        data.append('Desde', document.getElementById('Desde').value);
        data.append('Hasta', document.getElementById('Hasta').value);
        if(document.getElementById('Pend').checked){
            cargarComprasPendientes(data);
        } else if(document.getElementById('Pagada').checked){
            cargarComprasPagadas(data);
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
                    mostrarDatos(res);
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
                    mostrarDatos(res);
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
                    mostrarDatos(res);
                }
            });
    }

    function mostrarDatos(res){
        for(i in res){
            document.getElementById('tablaCompras').innerHTML += `
                <tr>
                    <td>${res[i].Nombre}</td>
                    <td>${res[i].Proveedor}</td>
                    <td><p class="truncate">${res[i].Referencia}</p></td>
                    <td>${res[i].Total}</td>
                    <td><a class='dropdown-trigger btn' data-target='metodosPago' id="${res[i].idCompra}">${res[i].Pagada}</a></td>
                    <td>${res[i].Fecha}</td>
                    <td id="img-${res[i].idCompra}"><a href="#!" class="descargarImagen" id="img-${res[i].idCompra}">Descargar comprobante</a></td>
                    <td><a id="actualizar-${res[i].idCompra}" class="btn waves-effect waves-light yellow black-text actualizarCompra">Actualizar</a></td>
                    <td><a id="eliminar-${res[i].idCompra}" class="btn waves-effect waves-light red eliminarCompra">Eliminar</a></td>
                </tr>
            `;
        }
        document.getElementById('tablaCompras').innerHTML += `
            <ul id='metodosPago' class='dropdown-content'>
                <li><a class="metodosPago">Efectivo</a></li>
                <li><a class="metodosPago">Banco</a></li>
                <li class="divider" tabindex="-1"></li>
                <li><a class="metodosPago">Sin pagar</a></li>
            </ul>
        `;
        //Materialboxed
        var elems = document.querySelectorAll('.materialboxed');
        var instances = M.Materialbox.init(elems);
        //Dropdown
        var elem = document.querySelectorAll('.dropdown-trigger');
        var instances = M.Dropdown.init(elem);
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
                document.getElementById('img-'+idCompra).innerHTML += `
                    <img src="data:image/png;base64,${res.Imagen}" class="responsive-img materialboxed" width="100px" data-caption="Comprobante compra #${idCompra}">
                `;
                var elems = document.querySelectorAll('.materialboxed');
                var instances = M.Materialbox.init(elems);
            });
    }

    function limpiarRegistros(){
        while(document.getElementById('tablaCompras').firstChild){
            document.getElementById('tablaCompras').removeChild(document.getElementById('tablaCompras').firstChild);
        }
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
        for(i in res){
            total += res[i].Total;
        }
        return total;
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
                    document.getElementById('modalComprasBody').innerHTML += `
                        <h5>No hay nada que registrar</h5>
                    `;
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