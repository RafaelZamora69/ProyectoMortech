let btnEnviar = document.getElementById('finalizarVenta');
let form = document.getElementById('FormSaldo');
console.log(btnEnviar);
console.log(form);

form.addEventListener('submit', RecargaSaldo);

function RecargaSaldo(e) {
    e.preventDefault();
    var datos = new FormData(form);
    fetch('servicios&action=recargaSaldo', {
        method: 'POST',
        body: datos
    })
        .then(res => res.json())
        .then(res => {
            if(res.succes){
                console.log('Correcto');
            } else {
                console.log('Error');
            }
        })
        .catch(function(e){
            console.log(e.message);
        });
    /*
    let chips = document.getElementsByClassName("chips");
    let data = chips[0].M_Chips.chipsData;
    if (data.length == 0) {
        alert("Introduzca un número telefónico");
    }*/
}