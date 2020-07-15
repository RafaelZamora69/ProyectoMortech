document.addEventListener('DOMContentLoaded', function () {
    let elems = document.getElementById('CorteOption');
    var instances;
    getEmpleados();
    document.getElementById("CargarCorte").addEventListener('click', prueba);



    //Funciones 
    function getEmpleados() {
        fetch('getEmpleados')
            .then(res => res.json())
            .then(res => {
                for (i in res) {
                    console.log("Id: " + res[i].Id + ", Nombre: " + res[i].Nombre + ", Por pagar: $ " + res[i].Pagar);
                    var option = document.createElement("option");
                    option.value = res[i].Id;
                    option.innerText = res[i].Nombre + ": $ " + res[i].Pagar;
                    elems.appendChild(option);
                }
                instances = M.FormSelect.init(elems);
            }).catch(function (e) {
                console.log(e.message);
            });
    }
    function prueba(e) {
        e.preventDefault();
        var datos = new FormData(document.getElementById("FormCorte"));
        datos.append('IdVendedor', document.getElementById("CorteOption").value);
        fetch('DetallesCorte', {
            method: 'POST',
            body: datos
        })
            .then(res => res.json())
            .then(res => {

            }).catch(function (e) {
                console.log(e.message);
            })
    }
});