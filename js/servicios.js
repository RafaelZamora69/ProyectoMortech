document.addEventListener('DOMContentLoaded', function () {
    //Modal de aviso
    var elems = document.getElementById('modal1');
    var modalAviso = M.Modal.init(elems);
    //Números de teléfono
    var chips = document.querySelectorAll('.chips');
    var telefonos = M.Chips.init(chips, {
        placeholder: "Numeros",
        secondaryPlaceholder: "+Numero"
    });
    let btnEnviar = document.getElementById('finalizarVenta');
    let formSaldo = document.getElementById('FormSaldo');
    let formServicio = document.getElementById('FormServicio');

    formSaldo.addEventListener('submit', RecargaSaldo);
    formServicio.addEventListener('submit', VentaServicio);
    
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
                    var tr = document.createElement("tr");
                    var Numero = document.createElement("td");
                    var Mensaje = document.createElement("td");
                    res[i].Codigo == 0 ? 
                    Numero.classList.add("green-text") :
                    Numero.classList.add("red-text");
                    Numero.innerText = res[i].Tel;
                    Mensaje.innerText = res[i].Mensaje;
                    tr.appendChild(Numero);
                    tr.appendChild(Mensaje);
                    var table = document.getElementById("table");
                    table.appendChild(tr);
                }
                modalAviso.open();
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
                res[0].Codigo == 0 ?
                M.toast({html: res[0].Mensaje, classes: 'green white-text'}) :
                M.toast({html: 'Error ' + res[0].Mensaje, classes: 'red white-text'})
                if(res[0].Codigo == 0){
                    formServicio.reset();
                }
            })
    }
});