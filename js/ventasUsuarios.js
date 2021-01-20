document.addEventListener('DOMContentLoaded', () => {
    let ventas;
    cargarVentas();
    obtenerClientes();
    const modal = M.Modal.init(document.getElementById('modalCliente'));
    const confirmacion = M.Modal.init(document.getElementById('modalConfirmar'));
    const clientes = M.Autocomplete.init(document.getElementById('cliente'));
    const numeros = M.Autocomplete.init(document.getElementById('Telefono'),{
        onAutocomplete: (e) => {
            mostrarVentas(ventas.filter(x => x.Telefono === document.getElementById('Telefono').value));
        }
    });
    const clientesFiltro = M.Autocomplete.init(document.getElementById('clienteFiltro'),{
        onAutocomplete: (e) => {
            mostrarVentas(ventas.filter(x => x.Cliente === document.getElementById('clienteFiltro').value));
        }
    });
    document.addEventListener('click',(e) => {
        if(e.target.classList.contains('confirmarPendiente')){
            document.getElementById('confirmationContent').innerHTML = `
                <p>Esta venta pasará a tener un cliente pendiente</p>
                <p>${document.getElementById(`TableCliente-${e.target.id.replace('pendiente-','')}`).textContent} => Pendiente</p>
            `;
            document.getElementById('footerConfirmar').innerHTML = `
                <a id="${e.target.id}" class="yellow black-text waves-effect pendiente btn">Confirmar</a>
            `;
            confirmacion.open();
        }
        if(e.target.classList.contains('confirmarParaMi')){
            document.getElementById('confirmationContent').innerHTML = `
                <p>Esta venta pasará a estar a tu nombre</p>
            `;
            document.getElementById('footerConfirmar').innerHTML = `
                <a id="${e.target.id}" class="yellow black-text waves-effect paraMi btn">Confirmar</a>
            `;
            confirmacion.open();
        }
        if(e.target.classList.contains('confirmarPagada')){
            const pagada = document.getElementById(`TablePagada-${e.target.id.replace('pagada-','')}`).firstChild.textContent;
            document.getElementById('confirmationContent').innerHTML = `
                <p>Esta venta pasará de ${pagada === 'Si' ? `<span class="green-text">${pagada}</span>` : `<span class="red-text">${pagada}</span>`} estar pagada a ${pagada === 'Si' ? `<span class="red-text">No</span>` : `<span class="green-text">Si</span>`}</p>
            `;
            document.getElementById('footerConfirmar').innerHTML = `
                <a id="${e.target.id}" class="yellow black-text waves-effect cambiarPagada btn">Confirmar</a>
            `;
            confirmacion.open();
        }
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
        }
    });
    document.getElementById('eliminarFiltro').addEventListener('click', (e) => {
        document.getElementById('clienteFiltro').value = '';
        document.getElementById('Telefono').value = '';
        mostrarVentas(ventas);
    });
    document.getElementById('clienteFiltro').addEventListener('keydown', (e) => {
        if(e.code === 'Enter'){
            mostrarVentas(ventas.filter(x => x.Cliente === document.getElementById('clienteFiltro').value));
        }
    });
    document.getElementById('Telefono').addEventListener('keydown', (e) => {
        if(e.code === 'Enter'){
            mostrarVentas(ventas.filter(x => x.Telefono === document.getElementById('Telefono').value));
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
                confirmacion.close();
                if(res.Code === 0){
                    M.toast({ html: res.Msg, classes: 'green white-text' });
                    cargarVentas();
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
                    cargarVentas();
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
                confirmacion.close();
                if(res.Code === 0){
                    M.toast({ html: res.Msg, classes: 'green white-text' });
                    cargarVentas();
                } else {
                    M.toast({ html: res.Msg, classes: 'red white-text' });
                }
            });
    }

    function pagada(idVenta){
        cambiarCliente(idVenta);
        const data = new FormData();
        data.append('idVenta', idVenta);
        fetch('pagada',{
            method: 'POST',
            body: data
        })
            .then(res => res.json())
            .then(res => {
                confirmacion.close();
                if(res.Code === 0){
                    M.toast({ html: res.Msg, classes: 'green white-text' });
                    cargarVentas();
                } else {
                    M.toast({ html: res.Msg, classes: 'red white-text' });
                }
            });
    }

    function cargarVentas(){
        fetch('ventasUsuarios')
            .then(res => res.json())
            .then(res => {
                ventas = res;
                mostrarVentas(res);
                const dataNumeros = {};
                const dataClientes = {};
                res.forEach(x => {
                    dataClientes[x.Cliente] = null;
                    dataNumeros[x.Telefono] = null;
                });
                numeros.updateData(dataNumeros);
                clientesFiltro.updateData(dataClientes);
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

    function mostrarVentas(res){
        const tableVentas = document.getElementById('tableVentas');
        tableVentas.innerHTML = '';
        res.forEach(x => {
            tableVentas.insertAdjacentHTML('beforeend',`
                        <tr>
                            <td id="TableCliente-${x.idVenta}">${x.Cliente}</td>
                            <td>${x.Telefono == null ? '- - -' : x.Telefono}</td>
                            <td id="TablePagada-${x.idVenta}">${x.Pagado === 1 ? '<span class="green-text">Si</span>' : '<span class="red-text">No</span>'}</td>
                            <td>
                                ${x.Cliente !== 'PENDIENTE' ? `<div class="row"><div class="col s12"><a id="pendiente-${x.idVenta}" class="btn waves-effect waves-light purple darken-1 white-text confirmarPendiente">Pendiente</a></div></div>` : ''}
                                <div class="row"><div class="col s12"><button id="cliente-${x.idVenta}" class="btn waves-effect waves-light yellow black-text abrirModal ${x.Propia === 0 ? 'disabled' : ''}" data-target="modalCliente">Cliente</button></div></div>
                                ${x.Propia === 0 ? `<div class="row"><div class="col s12"><a id="yo-${x.idVenta}" class="btn waves-effect waves-light grey black-text confirmarParaMi">P.M</a></div></div>` : ''}
                                <div class="row"><div class="col s12"><a id="pagada-${x.idVenta}" class="btn waves-effect waves-light ${x.Pagado === 0 ? 'green white-text' : 'red white-text'} confirmarPagada">${x.Pagado === 0 ? 'Pagada' : 'Sin pagar'}</a></div></div>
                            </td>
                        </tr>
            `);
        });
    }
});