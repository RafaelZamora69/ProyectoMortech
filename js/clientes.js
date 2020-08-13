document.addEventListener('DOMContentLoaded', function () {
    obtenerClientes();

    function obtenerClientes() {
        fetch('creditoClientes', {
            method: 'POST'
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                cargarTabla(res);
            });
    }

    function cargarTabla(res) {
        for (i in res) {
            document.getElementById('TablaDeudas').innerHTML += `
                <tr>
                    <td>${res[i].Nombre}</td>
                    <td>${res[i].Deudas}</td>
                    <td>$${res[i].Usd} Usd, $${res[i].Mxn} Mxn</td>
                    <td><a class="waves-effect waves-light yellow btn black-text" id=${res[i].idCliente}>Editar</a></td>
                </tr>
            `;
            const editar = document.getElementById(`${res[i].idCliente}`);
            editar.onclick = function () {
                console.log('Hola je');
            };
            console.log(document.getElementById(res[i].idCliente));
        }

    }

    function funcion(idCliente) {
        console.log('Hola je ' + idCliente);
    }
});