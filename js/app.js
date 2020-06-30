let btnEnviar = document.getElementById('finalizarVenta');
let form = document.getElementById('FormSaldo');

form.addEventListener('submit', RecargaSaldo);

function RecargaSaldo(e) {
    e.preventDefault();
    let pagado = document.getElementsByClassName('pagado');
    console.log(pagado[0].checked);
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
        })
        .catch(function (e) {
            console.log(e.message);
        });
    /*
    let chips = document.getElementsByClassName("chips");
    let data = chips[0].M_Chips.chipsData;
    if (data.length == 0) {
        alert("Introduzca un número telefónico");
    }*/
}