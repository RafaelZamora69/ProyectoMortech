document.addEventListener('DOMContentLoaded', function () {
    //Inicializar componentes
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems);
    var elems = document.getElementById('autoCompleteClientes');
    var clientes = M.Autocomplete.init(elems);
    var elems = document.getElementById('autoCompleteEmpleados');
    var empleados = M.Autocomplete.init(elems);
    var elems = document.querySelectorAll('.datepicker');
    var today = new Date();
    var fechas = M.Datepicker.init(elems, {
        format: 'yyyy-mm-dd',
        maxDate: new Date(today.getFullYear(), today.getMonth(), today.getDate())
    });

    //Datos para el filtro
    let Tipo = 'Ventas';
    let Servicio = 'TodosServicios';
    let Estado = 3;
    let data;
    //Carga de métodos
    document.getElementById("Filtrar").addEventListener('click', filtrar);
    radioButtons();
    obtenerEmpleados();
    obtenerClientes();

    function filtrar(e){
        e.preventDefault();
        var form = new FormData(document.getElementById('FormFiltro'));
        form.append('Estado', Estado);
        form.append('Servicio', Servicio);
        form.append('Tipo', Tipo);
        fetch('filtro', {
            body: form,
            method: 'POSt'
        })
            .then(res => res.json())
            .then(res => {
                data = res;
                console.log(data.filter(function(entry){
                    return entry.Vendedor === 'Daniel Moreno Rodriguez';
                }));
            })
    }

    function radioButtons() {
        document.getElementById("Saldo").addEventListener('click', function () {
            servicio();
        });
        document.getElementById("Servicios").addEventListener('click', function () {
            servicio();
        });
        document.getElementById("Ventas").addEventListener('click', function () {
            tipo('Ventas');
        });
        document.getElementById("Cortes").addEventListener('click', function () {
            tipo('Cortes');
        });
        document.getElementById("Todos").addEventListener('click', estado);
        document.getElementById("Pagado").addEventListener('click', estado);
        document.getElementById("Credito").addEventListener('click', estado);
    }

    function obtenerEmpleados() {
        fetch('obtenerEmpleados')
            .then(res => res.json())
            .then(res => {
                let data = {};
                for (i in res) {
                    data[res[i]] = null;
                }
                empleados.updateData(data);
            })
    }

    function obtenerClientes() {
        fetch('obtenerClientes')
            .then(res => res.json())
            .then(res => {
                let data = {};
                for (i in res) {
                    data[res[i]] = null;
                }
                clientes.updateData(data);
            })
    }

    function tipo(tipo) {
        Tipo = tipo;
    }

    function estado(){
        let array = Array.from(document.getElementsByName("Estado"));
        for (i in array) {
            if (array[i].checked == true) {
                Estado = array[i].value;
            }
        }
    }

    function servicio() {
        let array = Array.from(document.getElementsByName("Servicio"));
        for (i in array) {
            if (array[i].checked == true) {
                Servicio = array[i].id;
            }
        }
    }
});