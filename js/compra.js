document.addEventListener('DOMContentLoaded', () => {
    const today = new Date();
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
    var elems = document.getElementById('autocompleteEmpleado');
    const autocompleteEmp = M.Autocomplete.init(elems);
    var elems = document.getElementById('autocompleteProveedor');
    const autocompleteProv = M.Autocomplete.init(elems);
    initComponents();
    cargarComprasPagadas();
    cargarComprasNoPagadas();
    document.body.addEventListener('click', (e) => {
        if(e.target.classList.contains('actualizarCompra')){
            actualizarCompra(e.target.id);
            return;
        }
        if(e.target.classList.contains('metodosPago')){
            document.getElementById(e.target.name).textContent = e.target.textContent;
        }
    });
    //TODO implementar filtro, se filtra en la bd con la fecha [desde, hasta] luego se aplican filtros(si los hay) con array.filter
    //TODO implementar leyenda como reporte, mostrar total registros, total acumulado => (Total depósito, Total Efectívo), Total deudas
    //TODO Corregir error al escoger el método de pago, no se crea bien el componente y se bugea

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
        fetch('cargarComprasPagadas')
            .then(res => res.json())
            .then(res => {
                if(res.length > 0) {
                    for (i in res) {
                        document.getElementById('comprasPagadas').innerHTML += `
                        <tr>
                            <td>${res[i].Nombre}</td>
                            <td>${res[i].Proveedor}</td>
                            <td><p class="truncate">${res[i].Referencia}</p></td>
                            <td>${res[i].Total}</td>
                            <td>
                                 <a class='dropdown-trigger btn' href='#' data-target='metodosPago' id="${res[i].idCompra}">${res[i].Pagada}</a>
                                 <ul id='metodosPago' class='dropdown-content'>
                                   <li><a href="#!" class="metodosPago" name="${res[i].idCompra}">Efectivo</a></li>
                                   <li><a href="#!" class="metodosPago" name="${res[i].idCompra}">Deposito</a></li>
                                   <li class="divider" tabindex="-1"></li>
                                   <li><a href="#!" class="metodosPago" name="${res[i].idCompra}">Sin pagar</a></li>
                                 </ul>
                            </td>
                            <td>${res[i].Fecha}</td>
                            <td><img src="data:image/png;base64,${res[i].Imagen}" class="responsive-img materialboxed" width="100px" data-caption="Comprobante compra #${res[i].idCompra}"></td>
                            <td><a id="${res[i].idCompra}" class="btn waves-effect waves-light yellow black-text actualizarCompra">Actualizar</a></td>
                        </tr>
                    `;
                    }
                    //Materialboxed
                    var elems = document.querySelectorAll('.materialboxed');
                    var instances = M.Materialbox.init(elems);
                    //Dropdown
                    var elems = document.querySelectorAll('.dropdown-trigger');
                    var instances = M.Dropdown.init(elems);
                }
            });
    }

    function cargarDropdown(MetodoPago, idCompra){
        return `
              
        `;
    }

    function cargarComprasNoPagadas() {
        fetch('cargarComprasNoPagadas')
            .then(res => res.json())
            .then(res => {
                if(res.length > 0) {
                    for (i in res) {
                        document.getElementById('comprasNoPagadas').innerHTML += `
                        <tr>
                            <td>${res[i].Nombre}</td>
                            <td>${res[i].Proveedor}</td>
                            <td><p class="truncate">${res[i].Referencia}</p></td>
                            <td>${res[i].Total}</td>
                            <td>
                                 <a class='dropdown-trigger btn' href='#' data-target='metodosPago' id="${res[i].idCompra}">${res[i].Pagada}</a>
                                 <ul id='metodosPago' class='dropdown-content'>
                                   <li><a href="#!" class="metodosPago" name="${res[i].idCompra}">Efectivo</a></li>
                                   <li><a href="#!" class="metodosPago" name="${res[i].idCompra}">Deposito</a></li>
                                   <li class="divider" tabindex="-1"></li>
                                   <li><a href="#!" class="metodosPago" name="${res[i].idCompra}">Sin pagar</a></li>
                                 </ul>
                            </td>
                            <td>${res[i].Fecha}</td>
                            <td><img src="data:image/png;base64,${res[i].Imagen}" class="responsive-img materialboxed" width="100px" data-caption="Comprobante compra #${res[i].idCompra}"></td>
                            <td><a id="${res[i].idCompra}" class="btn waves-effect waves-light yellow black-text actualizarCompra">Actualizar</a></td>
                        </tr>
                    `;
                    }
                }
                //Materialboxed
                var elems = document.querySelectorAll('.materialboxed');
                var instances = M.Materialbox.init(elems);
                //Dropdown
                var elems = document.querySelectorAll('.dropdown-trigger');
                var instances = M.Dropdown.init(elems);
            })
    }

    function infoCompra(id){
        const data = new FormData();
        data.append('id', id);
        fetch('infoCompra', {
            method: 'POST',
            body: data
        })
            .then(res => res.json())
            .then(res => {
                document.getElementById('contenidoCompra').innerHTML = `
                    <div class="row">
                        <div class="col s12 m6"><h4>Compra #${res.idCompra}</h4></div>
                        <div class="col s12 m6"><h5>${res.Fecha}</h5></div>
                    </div>
                    <div class="row">
                    <div class="col s12 m6">
                        <p>Registrada por: ${res.Nombre}</p>
                        <p>Proveedor: ${res.Proveedor}</p>
                        <p>Referencia: ${res.Referencia}</p>
                    </div>
                    <div class="col s12 m6">
                        <p>Total: $${res.Total}</p>
                        <p><label><input id="Pagada" type="checkbox"${res.Pagada != 0 ? 'checked' : null}/><span>Pagado</span></label></p>
                        <p>Comprobante:<img src="data:image/png;base64,${res.Imagen}" class="responsive-img materialboxed" id="img"></p>
                    </div>
                    </div>
                `;
                const actualizar = document.getElementById('actualizarCompra').addEventListener('click', () => {
                    const pagada = document.getElementById('Pagada').checked != 0 ? 1 : 0;
                    const data = new FormData();
                    data.append('Pagado', pagada);
                    data.append('idCompra', res.idCompra);
                    fetch('actualizarCompra', {
                        method: 'POST',
                        body: data
                    })
                        .then(res => res.json())
                        .then(res => {
                            res.Codigo == 0 ? M.toast({ html: res.Mensaje, classes: 'green white-text' }) :
                                M.toast({ html: 'Error ' + res.Mensaje, classes: 'red white-text' });
                            modal.close();
                        })
                });
            });
    }
});