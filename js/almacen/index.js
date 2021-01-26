document.addEventListener('DOMContentLoaded', () => {
    datosOperadoras();
    obtenerOperadoras();
    document.getElementById('agregarSims').addEventListener('click', (e) => agregarSims());
    document.getElementById('quitarSims').addEventListener('click', (e) => quitarSims());

    function detallesOperadoras(){
        fetch('detallesOperadoras')
            .then(res => res.json())
            .then(res => {
                let nemi = document.getElementById('detalles-Nemi');
                let space = document.getElementById('detalles-Space');
                nemi.innerHTML = `<span class="card-title grey-text text-darken-4"><i class="material-icons right">close</i></span>`;
                space.innerHTML = `<span class="card-title grey-text text-darken-4"><i class="material-icons right">close</i></span>`;
                res.forEach(x => {
                    if(document.getElementById(`detalles-${x.Operadora}`) != undefined){
                        document.getElementById(`detalles-${x.Operadora}`).innerHTML += `
                            <p>${x.Plan}: ${x.Inventario}</p>
                        `;
                    }
                })
            });
    }

    function datosOperadoras(){
        fetch('datosOperadoras')
            .then(res => res.json())
            .then(res => {
                res.forEach(x => {
                    document.getElementById(`restantes-${x.Operadora}`).innerText = `Almacén: ${x.Almacen}`;
                    document.getElementById(`vendidas-${x.Operadora}`).innerText = `Vendidas: ${x.Vendidas}`;
                });
                detallesOperadoras();
            });
    }

    function obtenerOperadoras(){
        fetch('obtenerOperadoras')
            .then(res => res.json())
            .then(res => {
                const operadoraAgregar = document.getElementById('operadoraAgregar');
                const operadoraQuitar = document.getElementById('operadoraQuitar');
                res.forEach(x => {
                   operadoraAgregar.innerHTML += `<option value="${x.id}">${x.Operadora} ${x.Plan}</option>`;
                   operadoraQuitar.innerHTML += `<option value="${x.id}">${x.Operadora} ${x.Plan}</option>`;
                });
                M.FormSelect.init(document.getElementById('operadoraAgregar'));
                M.FormSelect.init(document.getElementById('operadoraQuitar'));
            });
    }

    function agregarSims(){
        const data = new FormData();
        data.append('Plan',document.getElementById('operadoraAgregar').value);
        data.append('Cantidad', document.getElementById('cantidadAgregar').value);
        data.append('Metodo', 'Agregar');
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
                } else {
                    M.toast({ html: res.Msg, classes: 'red white-text' });
                }
            });
    }

    function quitarSims(){
        const data = new FormData();
        data.append('Plan',document.getElementById('operadoraQuitar').value);
        data.append('Cantidad', document.getElementById('cantidadQuitar').value);
        data.append('Metodo', 'Quitar');
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
                } else {
                    M.toast({ html: res.Msg, classes: 'red white-text' });
                }
            });
    }
});