document.addEventListener('DOMContentLoaded', () => {
    const elem = document.getElementById('modalCompra');
    const modal = M.Modal.init(elem);
    cargarComprasPagadas();
    cargarComprasNoPagadas();
    document.body.addEventListener('click', (e) => {
        if(e.target.classList.contains('detallesCompra')){
            infoCompra(e.target.id);
        }
    });

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
                            <td class="truncate">${res[i].Referencia}</td>
                            <td>${res[i].Total}</td>
                            <td>${res[i].Fecha}</td>
                            <td><a id="${res[i].idCompra}" class="btn waves-effect waves-light yellow black-text detallesCompra">Detalles</a></td>
                        </tr>
                    `;
                    }
                }
            })
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
                            <td class="truncate">${res[i].Referencia}</td>
                            <td>${res[i].Total}</td>
                            <td>${res[i].Fecha}</td>
                            <td><a id="${res[i].idCompra}" class="btn waves-effect waves-light yellow black-text detallesCompra">Detalles</a></td>
                        </tr>
                    `;
                    }
                }
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
        modal.open();
        var elems = document.querySelectorAll('.materialboxed');
        var instances = M.Materialbox.init(elems,{});
    }
});