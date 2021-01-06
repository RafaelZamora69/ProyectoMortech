document.addEventListener('DOMContentLoaded', () => {
    const modal = M.Modal.init(document.getElementById('modalCliente'));
    const clientes = M.Autocomplete.init(document.getElementById('cliente'));
    obtenerClientes();
    cargarVentas();
    document.addEventListener('click',(e) => {
       if(e.target.classList.contains('abrirModal')){
            cliente(e.target.id.replace('cliente-',''));
       }
       if(e.target.classList.contains('pendiente')){
           pendiente(e.target.id.replace('pendiente-',''));
           return;
       }
       if(e.target.classList.contains('cambiarCliente')){
           cambiarCliente(e.target.id);
           return;
       }
       if(e.target.classList.contains('paraMi')){
           miVenta(e.target.id.replace('yo-',''));
           return;
       }
       if(e.target.classList.contains('cambiarPagada')){
           pagada(e.target.id.replace('pagada-',''));
           return;
       }
    });

    function pendiente(idVenta){
        const data = new FormData();
        data.append('idVenta', idVenta);
        fetch('pendiente',{
            method: 'POST',
            body: data
        })
            .then(res => res.json())
            .then(res => {
                if(res.Code === 0){
                    M.toast({ html: res.Msg, classes: 'green white-text' });
                } else {
                    M.toast({ html: res.Msg, classes: 'red white-text' });
                }
            });
    }

    function cambiarCliente(idVenta){
        const data = new FormData();
        data.append('idVenta', idVenta);
        data.append('Cliente', document.getElementById('cliente').value);
        fetch('cambiarCliente', {
            method: 'POST',
            body: data
        })
            .then(res => res.json())
            .then(res => {
                if(res.Code === 0){
                    M.toast({ html: res.Msg, classes: 'green white-text' });
                } else {
                    M.toast({ html: res.Msg, classes: 'red white-text' });
                }
            })
    }

    function cliente(idVenta){
        document.getElementById('modalFooter').innerHTML = `
            <a class="modal-close cambiarCliente" id="${idVenta}">Aceptar</a>
        `;
        modal.open();
    }

    function miVenta(idVenta){
        const data = new FormData();
        data.append('idVenta', idVenta);
        fetch('miVenta',{
            method: 'POST',
            body: data
        })
            .then(res => res.json())
            .then(res => {
                if(res.Code === 0){
                    M.toast({ html: res.Msg, classes: 'green white-text' });
                } else {
                    M.toast({ html: res.Msg, classes: 'red white-text' });
                }
            });
    }

    function pagada(idVenta){
        const data = new FormData();
        data.append('idVenta', idVenta);
        fetch('pagada',{
            method: 'POST',
            body: data
        })
            .then(res => res.json())
            .then(res => {
                if(res.Code === 0){
                    M.toast({ html: res.Msg, classes: 'green white-text' });
                } else {
                    M.toast({ html: res.Msg, classes: 'red white-text' });
                }
            });
    }

    function cargarVentas(){
        fetch('ventasUsuarios')
            .then(res => res.json())
            .then(res => {
                const tableVentas = document.getElementById('tableVentas');
                res.forEach(x => {
                   tableVentas.insertAdjacentHTML('beforeend',`
                        <tr>
                            <td>${x.Cliente}</td>
                            <td>${x.Empleado}</td>
                            <td>${x.Servicio}</td>
                            <td>${x.Telefono == null ? '- - -' : x.Telefono}</td>
                            <td>${parseFloat(x.Usd).toFixed(2)} Usd, ${parseFloat(x.Mxn).toFixed(2)} Mxn</td>
                            <td>${x.Pagado === '1' ? '<span class="green-text">Si</span>' : '<span class="red-text">No</span>'}</td>
                            <td>
                                <a id="pendiente-${x.idVenta}" class="btn waves-effect waves-light purple darken-1 white-text pendiente">Pendiente</a>
                                <button id="cliente-${x.idVenta}" class="btn waves-effect waves-light yellow black-text abrirModal" data-target="modalCliente">Cliente</button>
                                <a id="yo-${x.idVenta}" class="btn waves-effect waves-light grey black-text paraMi">P.M</a>
                                <a id="pagada-${x.idVenta}" class="btn waves-effect waves-light green black-text cambiarPagada">Pagada</a>
                            </td>
                        </tr>
                   `);
                });
            });
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
            })
    }
});