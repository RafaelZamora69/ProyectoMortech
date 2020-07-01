var data = ObtenerClientes();
let btnEnviar = document.getElementById('finalizarVenta');
let form = document.getElementById('FormSaldo');

form.addEventListener('submit', RecargaSaldo);

function ObtenerClientes() {
    fetch('servicios&action=nombresClientes')
        .then(res => res.json())
        .then(res => {
            console.log(res);
            var text = "";
            for (var i in res) {
                text += '"' + res[i].Nombre + '": ' + res[i].Img + ',';
            }
            return text;
        })
        .catch(function (e) {
            console.log(e.message);
        });
}

function RecargaSaldo(e) {
    e.preventDefault();
    let pagado = document.getElementsByClassName('pagado');
    var datos = new FormData(form);
    let numeros = document.getElementsByClassName('chips')[0].M_Chips.chipsData;
    datos.append('numeros', JSON.stringify(numeros));
    pagado[0].checked ? datos.append('Pagado', 1) : datos.append('Pagado', 0);
    fetch('servicios&action=recargaSaldo', {
        method: 'POST',
        body: datos
    })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            for (var i in res) {
                console.log(res[i].Tel);
                console.log(res[i].Codigo);
                console.log(res[i].Mensaje);
            }
        })
        .catch(function (e) {
            console.log(e.message);
        });
}

document.addEventListener('DOMContentLoaded', function () {
    //modal de notificación
    var elems = document.querySelectorAll('.modal');
    var instance = M.Modal.init(elems);
    //Nombres de clientes
    var autocomName = document.querySelectorAll('.autocompleteName');
    var instances = M.Autocomplete.init(autocomName, {
        data: { data }
    });
});