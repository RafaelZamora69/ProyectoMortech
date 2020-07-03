let btnEnviar = document.getElementById('finalizarVenta');

form.addEventListener('submit', RecargaSaldo);
form.addEventListener('submit', VentaServicio);

function RecargaSaldo(e) {
    e.preventDefault();
    let pagado = document.getElementsByClassName('pagado');
    let form = document.getElementById('FormSaldo');
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
            for (var i in res) {
                res[i].Codigo == 0 ? 
                M.toast({html: 'Venta registrada, número: ' + res[i].Tel + ' cargado correctamente.', classes: 'green white-text'}) : 
                M.toast({html: 'Error con el número: ' + res[i].Tel + ' , ' + res[i].Mensaje, classes: 'red white-text'})
            }
        })
        .catch(function (e) {
            console.log(e.message);
        });
}

function VentaServicio(e){
    e.preventDefault();
    let form = document.getElementById('FormServicio');
    let pagado = document.getElementsByClassName('servicioPagado');
    var datos = new FormData(form);
    pagado[0].checked ? datos.append('Pagado', 1) : datos.append('Pagado', 0);
    fetch('servicios&action=ventaServicio', {
        method: 'POST',
        body: datos
    })
        .then(res => res.json())
        .then(res => {
            //Lógica de resultado
        })
}

document.addEventListener('DOMContentLoaded', function () {
    //modal de notificación
    var elems = document.querySelectorAll('.modal');
    var instance = M.Modal.init(elems);
    ObtenerClientes();
    function ObtenerClientes() {
        fetch('servicios&action=nombresClientes')
            .then(res => res.json())
            .then(res => {
                var autocomName = document.querySelectorAll('.autocompleteName');
                var instances = M.Autocomplete.init(autocomName, {
                    data: res
                });
            })
            .catch(function (e) {
                console.log(e.message);
            });
    }
});