document.addEventListener('DOMContentLoaded', () => {
    datosOperadoras();
    obtenerOperadoras();
    document.getElementById('agregarSims').addEventListener('click', (e) => agregarSims());
    document.getElementById('quitarSims').addEventListener('click', (e) => quitarSims());
    cargarMovimientos();

    function datosOperadoras(){
        fetch('datosOperadoras')
            .then(res => res.json())
            .then(res => {
                res.forEach(x => {
                    document.getElementById(`restantes-${x.Operadora}`).innerText = `Almacén: ${x.Almacen}`;
                    document.getElementById(`vendidas-${x.Operadora}`).innerText = `Vendidas: ${x.Vendidas}`;
                });
            });
    }

    function obtenerOperadoras(){
        fetch('obtenerOperadoras')
            .then(res => res.json())
            .then(res => {
                const operadoraAgregar = document.getElementById('operadoraAgregar');
                const operadoraQuitar = document.getElementById('operadoraQuitar');
                res.forEach(x => {
                   operadoraAgregar.innerHTML += `<option value="${x.id}">${x.Nombre}</option>`;
                   operadoraQuitar.innerHTML += `<option value="${x.id}">${x.Nombre}</option>`;
                });
                M.FormSelect.init(document.getElementById('operadoraAgregar'));
                M.FormSelect.init(document.getElementById('operadoraQuitar'));
            });
    }

    function agregarSims(){
        const data = new FormData();
        data.append('Operadora',document.getElementById('operadoraAgregar').value);
        data.append('Cantidad', document.getElementById('cantidadAgregar').value);
        data.append('Metodo', 'Agregar');
        data.append('Comentarios',document.getElementById('observacionesAgregar').value);
        fetch('modificar',{
            method: 'POST',
            body: data
        })
            .then(res => res.json())
            .then(res => {
                if(res.Code === 0){
                    M.toast({ html: res.Msg, classes: 'green white-text' });
                    datosOperadoras();
                    document.getElementById('cantidadAgregar').value = '';
                    document.getElementById('observacionesAgregar').value = '';
                    cargarMovimientos();
                } else {
                    M.toast({ html: res.Msg, classes: 'red white-text' });
                }
            });
    }

    function quitarSims(){
        const data = new FormData();
        data.append('Operadora',document.getElementById('operadoraQuitar').value);
        data.append('Cantidad', document.getElementById('cantidadQuitar').value);
        data.append('Metodo', 'Quitar');
        data.append('Comentarios',document.getElementById('observacionesQuitar').value);
        fetch('modificar',{
            method: 'POST',
            body: data
        })
            .then(res => res.json())
            .then(res => {
                if(res.Code === 0){
                    M.toast({ html: res.Msg, classes: 'green white-text' });
                    datosOperadoras();
                    document.getElementById('cantidadQuitar').value = '';
                    document.getElementById('observacionesQuitar').value = '';
                    cargarMovimientos();
                } else {
                    M.toast({ html: res.Msg, classes: 'red white-text' });
                }
            });
    }

    function cargarMovimientos(){
        const tableMovimientos = document.getElementById('Movimientos');
        fetch('logAlmacen')
            .then(res => res.json())
            .then(res =>{
                tableMovimientos.innerHTML = '';
                res.forEach(x => {
                    tableMovimientos.insertAdjacentHTML('beforeend',`
                        <tr>
                            <td>${x.Mensaje}</td>
                            <td>${x.Observaciones}</td>
                            <td>${x.Fecha}</td>
                        </tr>
                    `);
                });
            });
    }
});