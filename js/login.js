document.getElementById("Login").addEventListener('submit', Logear);


function Logear(e){
    e.preventDefault();
    var datos = new FormData(document.getElementById("FormLogin"));
    fetch('login', {
        method: 'POST',
        body: datos
    })
        .then(res => res.json())
        .then(res => {
            res == "Logeado" ? window.location = 'Servicios' : 
            M.toast({ html: 'Usuario o contraseña incorrecto ', classes: 'red white-text' })
        }).catch(function (e) {
            M.toast({ html: e.message, classes: 'red white-text' });
        });
}