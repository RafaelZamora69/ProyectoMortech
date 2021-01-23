document.addEventListener('DOMContentLoaded', () => {
    datosOperadoras();
    obtenerOperadoras();
    document.getElementById('agregarSims').addEventListener('click', (e) => agregarSims());
    document.getElementById('quitarSims').addEventListener('click', (e) => quitarSims());
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
                console.log(res);
                const operadoraAgregar = document.getElementById('operadoraAgregar');
                const operadoraQuitar = document.getElementById('operadoraQuitar');
                res.forEach(x => {
                   operadoraAgregar.innerHTML += `<option value="${x.id}">${x.Operadora}</option>`;
                   operadoraQuitar.innerHTML += `<option value="${x.id}">${x.Operadora}</option>`;
                });
                M.FormSelect.init(document.getElementById('operadoraAgregar'));
                M.FormSelect.init(document.getElementById('operadoraQuitar'));
            });
    }

    function agregarSims(){
        const data = new FormData();
        data.append('Operadora',document.getElementById('agregarSims').value);
        data.append('Cantidad', document.getElementById('cantidadAgregar').value);
        console.log(document.getElementById('agregarSims'));
    }

    function quitarSims(){

    }
});