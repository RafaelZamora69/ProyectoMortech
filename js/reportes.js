document.addEventListener('DOMContentLoaded', function () {
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
    radioButtons();
    obtenerEmpleados();
    obtenerClientes();

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

    function consulta(servicio) {
        var array = Array.from(document.getElementsByName("Filtro"));
        for (i in array) {
            if (array[i].checked) {
                document.getElementsByName("Tipo")[0].checked ?
                    reporteVentas(servicio, array[i].id) :
                    reporteCorte();
            }
        }
    }

    function reporteVentas(servicio, filtro) {
        let datos = new FormData();
        datos.append('servicio', servicio);
        datos.append('filtro', filtro);
        fetch('reporteVentas', {
            method: 'POST',
            body: datos
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
            })
    }

    function cargar(tipo) {
        console.log(tipo);
    }

    function radioButtons() {
        document.getElementById("Saldo").addEventListener('click', function () {
            consulta('Saldo');
        });
        document.getElementById("Servicios").addEventListener('click', function () {
            consulta('Servicios');
        });
        document.getElementById("Ventas").addEventListener('click', function () {
            cargar('Ventas');
        });
        document.getElementById("Cortes").addEventListener('click', function () {
            cargar('Cortes');
        });
        document.getElementById("All").addEventListener('click', getFilter);
        document.getElementById("Pagado").addEventListener('click', getFilter);
        document.getElementById("Credito").addEventListener('click', getFilter);
    }

    function getFilter() {
        let array = Array.from(document.getElementsByName("Servicio"));
        for (i in array) {
            if (array[i].checked == true) {
                consulta(array[i].id);
            }
        }
    }
});