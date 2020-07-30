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
    let originalData;
    let idVenta;
    //Carga de métodos
    document.getElementById("Filtrar").addEventListener('click', filtrar);
    radioButtons();
    obtenerEmpleados();
    obtenerClientes();

    function filtrar(e) {
        e.preventDefault();
        var form = new FormData(document.getElementById('FormFiltro'));
        form.append('Estado', Estado);
        form.append('Servicio', Servicio);
        form.append('Tipo', Tipo);
        fetch('filtro', {
            body: form,
            method: 'POST'
        })
            .then(res => res.json())
            .then(res => {
                originalData = res;
                switch (originalData[0].Tipo) {
                    case 'General':
                        TablaGeneral(originalData);
                        break;
                    case 'Saldo':
                        TablaSaldo(originalData);
                        break;
                    case 'Corte':
                        TablaCorte(originalData);
                        break;
                }
                /*console.log(data.filter(function (entry) {
                    return entry.Vendedor === 'Daniel Moreno Rodriguez';
                }));*/
            })
    }

    function obtenerDatos(id){
        console.log(id);
    }

    function TablaCorte(data) {
        CargarTablaCorte();
        for (var i = 1; i < data.length; i++) {
            var tr = document.createElement("tr");
            var td = document.createElement("td");
            td.innerText = data[i].Nombre;
            tr.appendChild(td);
            var td = document.createElement("td");
            td.innerText = data[i].Inicio;
            tr.appendChild(td);
            var td = document.createElement("td");
            td.innerText = data[i].Fin;
            tr.appendChild(td);
            var td = document.createElement("td");
            td.innerText = data[i].Usd;
            tr.appendChild(td);
            var td = document.createElement("td");
            td.innerText = data[i].Mxn;
            tr.appendChild(td);
            document.getElementById("TableBody").appendChild(tr);
        }
    }

    function CargarTablaCorte() {
        LimpiarTablas();
        var tr = document.getElementById("Headers");
        var th = document.getElementById("Headers");
        var th = document.createElement("th");
        th.textContent = 'Empleado';
        tr.appendChild(th);
        var th = document.createElement("th");
        th.textContent = 'Iniciado';
        tr.appendChild(th);
        var th = document.createElement("th");
        th.textContent = 'Realizado';
        tr.appendChild(th);
        var th = document.createElement("th");
        th.textContent = 'Usd';
        tr.appendChild(th);
        var th = document.createElement("th");
        th.textContent = 'Mxn';
        tr.appendChild(th);
    }

    function TablaSaldo(data) {
        CargarTablaSaldo();
        for (var i = 1; i < data.length; i++) {
            var tr = document.createElement("tr");
            var td = document.createElement("td");
            td.innerText = data[i].Vendedor;
            tr.appendChild(td);
            var td = document.createElement("td");
            td.innerText = data[i].Cliente;
            tr.appendChild(td);
            var td = document.createElement("td");
            td.innerText = data[i].Telefono;
            tr.appendChild(td);
            var td = document.createElement("td");
            td.innerText = data[i].Operadora;
            tr.appendChild(td);
            var td = document.createElement("td");
            td.innerText = data[i].Monto;
            tr.appendChild(td);
            var td = document.createElement("td");
            td.innerText = data[i].Venta;
            tr.appendChild(td);
            var td = document.createElement("td");
            td.innerText = data[i].Pagado;
            tr.appendChild(td);
            var td = document.createElement("td");
            td.innerText = data[i].fecha;
            tr.appendChild(td);
            var editar = document.createElement("a");
            editar.textContent = 'Editar';
            editar.classList.add('waves-effect', 'waves-light', 'yellow', 'btn');
            tr.appendChild(editar);
            document.getElementById("TableBody").appendChild(tr);
        }
    }

    function CargarTablaSaldo() {
        LimpiarTablas();
        var tr = document.getElementById("Headers");
        var th = document.createElement("th");
        th.textContent = 'Vendedor';
        tr.appendChild(th);
        var th = document.createElement("th");
        th.textContent = 'Cliente';
        tr.appendChild(th);
        var th = document.createElement("th");
        th.textContent = 'Teléfono';
        tr.appendChild(th);
        var th = document.createElement("th");
        th.textContent = 'Operadora';
        tr.appendChild(th);
        var th = document.createElement("th");
        th.textContent = 'Saldo';
        tr.appendChild(th);
        var th = document.createElement("th");
        th.textContent = 'Ingreso';
        tr.appendChild(th);
        var th = document.createElement("th");
        th.textContent = 'Pagado';
        tr.appendChild(th);
        var th = document.createElement("th");
        th.textContent = 'Fecha';
        tr.appendChild(th);
        var th = document.createElement("th");
        th.textContent = 'Editar';
        tr.appendChild(th);
    }

    function TablaGeneral(data) {
        CargarTablaGeneral();
        for (let i = 1; i < data.length; i++) {
            var tr = document.createElement("tr");
            var td = document.createElement("td");
            td.innerText = data[i].Vendedor;
            tr.appendChild(td);
            var td = document.createElement("td");
            td.innerText = data[i].Servicio;
            tr.appendChild(td);
            var td = document.createElement("td");
            td.innerText = data[i].Cliente;
            tr.appendChild(td);
            var td = document.createElement("td");
            td.innerText = data[i].Venta;
            tr.appendChild(td);
            var td = document.createElement("td");
            td.innerText = data[i].Pagado;
            tr.appendChild(td);
            var td = document.createElement("td");
            td.innerText = data[i].fecha;
            tr.appendChild(td);
            var editar = document.createElement("a");
            editar.textContent = 'Editar';
            editar.classList.add('waves-effect', 'waves-light', 'yellow', 'btn', 'black-text');
            editar.onclick = function() {
                console.log(data[i].idVenta);
            }
            tr.appendChild(editar);
            document.getElementById("TableBody").appendChild(tr);
        }
    }

    function CargarTablaGeneral() {
        LimpiarTablas();
        var tr = document.getElementById("Headers");
        var th = document.createElement("th");
        th.textContent = 'Vendedor';
        tr.appendChild(th);
        var th = document.createElement("th");
        th.textContent = 'Servicio';
        tr.appendChild(th);
        var th = document.createElement("th");
        th.textContent = 'Cliente';
        tr.appendChild(th);
        var th = document.createElement("th");
        th.textContent = 'Ingreso';
        tr.appendChild(th);
        var th = document.createElement("th");
        th.textContent = 'Pagado';
        tr.appendChild(th);
        var th = document.createElement("th");
        th.textContent = 'Fecha';
        tr.appendChild(th);
        var th = document.createElement("th");
        th.textContent = 'Editar';
        tr.appendChild(th);
    }

    function LimpiarTablas() {
        //Verificar si ya estaba inicializada y borrar
        while (document.getElementById("Headers").firstChild) {
            document.getElementById("Headers").removeChild(document.getElementById("Headers").firstChild);
        }
        while (document.getElementById("TableBody").firstChild) {
            document.getElementById("TableBody").removeChild(document.getElementById("TableBody").firstChild);
        }
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

    function estado() {
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