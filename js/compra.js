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
    const autocompleteProv = M.Autocomplete.init(elems);
    initComponents();
    cargarComprasPagadas();
    cargarComprasNoPagadas();
    document.getElementById('FiltrarPendientes').addEventListener('click', () => {
        limpiarRegistros('Pendientes');
        cargarComprasNoPagadas();
    })
    document.getElementById('FiltrarPagados').addEventListener('click', () => {
        limpiarRegistros('Pagadas');
        cargarComprasPagadas();
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
    });
    //TODO implementar indice en la bd compra => fecha

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

    function cargarComprasPagadas() {
        const data = new FormData();
        data.append('Desde', document.getElementById('Desde').value);
        data.append('Hasta', document.getElementById('Hasta').value);
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
                        document.getElementById('Efect').checked ? res = res.filter(x => x.Pagada == 'Efectivo') : res = res.filter(x => x.Pagada == 'Deposito')
                    }
                    document.getElementById('detallesPagadas').innerHTML = `
                        <p>Registros: ${res.length}</p>
                        <p>Efectivo: $${total(res.filter(x => x.Pagada == 'Efectivo'))}</p>
                        <p>Deposito: $${total(res.filter(x => x.Pagada == 'Deposito'))}</p>
                        <p>Total: $${total(res)}</p>
                    `;
                    for (i in res) {
                        document.getElementById('comprasPagadas').innerHTML += `
                        <tr>
                            <td>${res[i].Nombre}</td>
                            <td>${res[i].Proveedor}</td>
                            <td><p class="truncate">${res[i].Referencia}</p></td>
                            <td>${res[i].Total}</td>
                            <td>
                                 <a class='dropdown-trigger btn' data-target='metodosPago' id="${res[i].idCompra}">${res[i].Pagada}</a>
                            </td>
                            <td>${res[i].Fecha}</td>
                            <td><img src="data:image/png;base64,${res[i].Imagen}" class="responsive-img materialboxed" width="100px" data-caption="Comprobante compra #${res[i].idCompra}"></td>
                            <td><a id="actualizar-${res[i].idCompra}" class="btn waves-effect waves-light yellow black-text actualizarCompra">Actualizar</a></td>
                        </tr>
                    `;
                    }
                    //Materialboxed
                    var elems = document.querySelectorAll('.materialboxed');
                    var instances = M.Materialbox.init(elems);
                    //Dropdown
                    var elems = document.querySelectorAll('.dropdown-trigger');
                    console.log(elems);
                    var instances = M.Dropdown.init(elems);
                }
            });
    }

    function cargarComprasNoPagadas() {
        const data = new FormData();
        data.append('Desde', document.getElementById('Desde').value);
        data.append('Hasta', document.getElementById('Hasta').value);
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
                    document.getElementById('detallesPendientes').innerHTML = `
                        <p>Registros: ${res.length}</p>
                        <p>Total: $${total(res)}</p>
                    `;
                    for (i in res) {
                        document.getElementById('comprasNoPagadas').innerHTML += `
                        <tr>
                            <td>${res[i].Nombre}</td>
                            <td>${res[i].Proveedor}</td>
                            <td><p class="truncate">${res[i].Referencia}</p></td>
                            <td>${res[i].Total}</td>
                            <td>
                                 <a class='dropdown-trigger btn' data-target='metodosPago' id="${res[i].idCompra}">${res[i].Pagada}</a>
                            </td>
                            <td>${res[i].Fecha}</td>
                            <td><img src="data:image/png;base64,${res[i].Imagen}" class="responsive-img materialboxed" width="100px" data-caption="Comprobante compra #${res[i].idCompra}"></td>
                            <td><a id="actualizar-${res[i].idCompra}" class="btn waves-effect waves-light yellow black-text actualizarCompra">Actualizar</a></td>
                        </tr>
                    `;
                    }
                    //Materialboxed
                    var elems = document.querySelectorAll('.materialboxed');
                    var instances = M.Materialbox.init(elems);
                    //Dropdown
                    var elems = document.querySelectorAll('.dropdown-trigger');
                    console.log(elems);
                    var instances = M.Dropdown.init(elems);
                }
            })
    }

    function limpiarRegistros(opcion){
        switch(opcion){
            case 'Pagadas':
                while(document.getElementById('comprasPagadas').firstChild){
                    document.getElementById('comprasPagadas').removeChild(document.getElementById('comprasPagadas').firstChild);
                }
                break;
            case 'Pendientes':
                while(document.getElementById('comprasNoPagadas').firstChild){
                    document.getElementById('comprasNoPagadas').removeChild(document.getElementById('comprasNoPagadas').firstChild);
                }
                break;
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

    function total(res){
        var total = 0;
        for(i in res){
            total += res[i].Total;
        }
        return total;
    }
});