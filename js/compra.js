document.addEventListener('DOMContentLoaded', () => {

    cargarComprasPagadas();
    cargarComprasNoPagadas();

    function cargarComprasPagadas() {
        fetch('cargarComprasPagadas')
            .then(res => res.json())
            .then(res => {
                for(i in res){
                    document.getElementById('comprasPagadas').innerHTML += `
                        <tr>
                            <td>${res[i].Nombre}</td>
                            <td>${res[i].Proveedor}</td>
                            <td class="truncate">${res[i].Referencia}</td>
                            <td>${res[i].Total}</td>
                            <td>${res[i].Fecha}</td>
                            <td><a id="detalles" value="${res[i].idCompra}" class="btn waves-effect waves-light yellow black-text">Detalles</a></td>
                        </tr>
                    `;
                }
                document.getElementById('detalles').addEventListener('click', (e) => {
                    infoCompra(e.target.attributes.value.nodeValue)
                });
            })
    }

    function cargarComprasNoPagadas() {
        fetch('cargarComprasNoPagadas')
            .then(res => res.json())
            .then(res => {
                console.log(res);
                for(i in res){
                    document.getElementById('comprasNoPagadas').innerHTML += `
                        <tr>
                            <td>${res[i].Nombre}</td>
                            <td>${res[i].Proveedor}</td>
                            <td class="truncate">${res[i].Referencia}</td>
                            <td>${res[i].Total}</td>
                            <td>${res[i].Fecha}</td>
                            <td><a id="detalles" value="${res[i].idCompra}" class="btn waves-effect waves-light yellow black-text">Detalles</a></td>
                        </tr>
                    `;
                }
                document.getElementById('detalles').addEventListener('click', (e) => {
                    infoCompra(e.target.attributes.value.nodeValue)
                });
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
                console.log(res);
            })
    }
});