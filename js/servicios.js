document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('OperadorasTrigger').value = 'Unefon';
    const elems = document.getElementById('modal2');
    const modal2 = M.Modal.init(elems);
    document.getElementById('NumeroBuscar').addEventListener('submit', (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('Numero', (document.getElementById('Numero').value).replace('/\s/g',''));
        fetch('buscarNumero',{
            body: data,
            method: 'POST'
        })
            .then(res => res.json())
            .then(res => {
                    document.getElementById('TablaInfoNumeroDatos').innerHTML = `
                        <tr>
                            <td>${res.Cliente}</td>
                            <td>${res.Empleado}</td>
                            <td>${res.Monto}</td>
                            <td>${res.Usd} Usd, ${res.Mxn} Mxn</td>
                            <td>${res.Operadora}</td>
                            <td>${res.NumeroTelefono}</td>
                            <td>${res.Pagado}</td>
                            <td>${res.Fecha}</td>
                        </tr>
                    `;
                modal2.open();
            });
    });
    document.getElementById("progress").style.visibility = "hidden";
    //Seleccionar operadoras
    var drop = document.getElementById('OperadorasTrigger');
    var operadoras = M.Dropdown.init(drop);
    const dropExterna = document.getElementById('OperadorasTriggerExterna');
    const operadorasExterna = M.Dropdown.init(dropExterna);
    document.getElementById('Operadoras').addEventListener('click', (e) => {
        document.getElementById('OperadorasTrigger').value = e.target.text;
        drop.textContent = e.target.text;
       cargarMonto(e.target.text, 'normal');
    });
    //Proveedores
    const autoPro = document.getElementById('autocompleteProveedores');
    const Proveedores = M.Autocomplete.init(autoPro);
    let count = 0;
    //Clientes
    var autocom = document.getElementById('autocompleteName');
    var clientesSaldo = M.Autocomplete.init(autocom);
    var autocom = document.getElementById('autocompleteNameExterna');
    var clientesSaldoExterna = M.Autocomplete.init(autocom);
    //Numeros de teléfono
    var chips = document.getElementById('chips');
    var telefonos = M.Chips.init(chips, {
            placeholder: "Numeros",
            secondaryPlaceholder: "+Numero"
        });
    var autocom = document.getElementById('autocompleteCliente');
    var clientesServicio = M.Autocomplete.init(autocom);
    //Modal de aviso
    var modal = document.getElementById('modal1');
    var modalAviso = M.Modal.init(modal);
    //Números de teléfono
    const value = document.getElementById('numeros');
    //Monto a pagar
    var select = document.querySelectorAll('select');
    var montos = M.FormSelect.init(select);
    let formSaldo = document.getElementById('FormSaldo');
    let formServicio = document.getElementById('FormServicio');
    //Empleados
    const empleados = document.getElementById('empleadoExterno');
    const empleadosExterna = M.Autocomplete.init(empleados);
    formSaldo.addEventListener('submit', RecargaSaldo);
    formServicio.addEventListener('submit', VentaServicio);
    chips.addEventListener('input', agregarNumero);
    document.getElementById('Agregar').addEventListener('click', () => {
        telefonos.addChip({ tag: value.value });
        count = 0;
        value.value = '';
    });
    document.getElementById('registrarCompra').addEventListener('click', (e) => {
        registrarCompra(e);
    })
    //funciones
    ObtenerClientes();
    obtenerProveedores();
    var chipsExterna, telefonosExterna;
    if(document.getElementById('OperadorasTriggerExterna')){
        obtenerEmpleados();
        const numeroExterno = document.getElementById('numeroExterno');
        document.getElementById('OperadorasTriggerExterna').value = 'Unefon';
        chipsExterna = document.getElementById('chipsExterna');
        telefonosExterna = M.Chips.init(chipsExterna, {
            placeholder: "Numeros",
            secondaryPlaceholder: "+Numero"
        });
        document.getElementById('OperadorasExterna').addEventListener('click',(e)=>{
            console.log('click')
            document.getElementById('OperadorasTriggerExterna').value = e.target.text;
            dropExterna.textContent = e.target.text;
            cargarMonto(e.target.text, 'Externa');
        });
        document.getElementById('RecargaExterna').addEventListener('submit',RecargaSaldo);
        document.getElementById('AgregarExterna').addEventListener('click', () => {
            telefonosExterna.addChip({ tag: value[0].value });
            count = 0;
            value[0].value = '';
        });
        chipsExterna.addEventListener('input',agregarNumeroExterno);
        function agregarNumeroExterno(e) {
            if (e.inputType === 'deleteContentBackward' && count >= 0) {
                count--;
            } else if (Number.isInteger(parseInt(e.data))) {
                count++;
                if (count == 10) {
                    telefonosExterna.addChip({ tag: numeroExterno.value });
                    count = 0;
                    numeroExterno.value = '';
                }
            }
        }
        function obtenerEmpleados() {
            fetch('obtenerEmpleados')
                .then(res => res.json())
                .then(res => {
                    let data = {};
                    for (i in res) {
                        data[res[i]] = null;
                    }
                    empleadosExterna.updateData(data);
                })
        }
    }
    function registrarCompra(e){
        e.preventDefault();
        document.getElementById('registrarCompra').disabled = true;
        var data = new FormData(document.getElementById('FormCompra'));
        data.append('Ticket', document.getElementById('Ticket').files[0]);
        data.append('Pagada', document.getElementById('CompraPagada').checked == true ? 'Pagada' : 'Sin pagar');
        fetch('Compra', {
            method: 'POST',
            body: data
        })
            .then(res => res.json())
            .then(res => {
                res.Codigo == 0 ? M.toast({ html: res.Message, classes: 'green white-text' }) :
                    M.toast({ html: 'Error ' + res.Message, classes: 'red white-text' });
                if(res.Codigo == 0){
                    document.getElementById('FormCompra').reset();
                }
                document.getElementById('registrarCompra').disabled = false;
            })
    }

    function obtenerProveedores(){
        fetch('obtenerProveedores')
            .then(res => res.json())
            .then(res => {
                var data = {};
                for(i in res){
                    data[res[i]] = null;
                }
                Proveedores.updateData(data);
            });
    }

    function ObtenerClientes() {
        fetch('nombresClientes')
            .then(res => res.json())
            .then(res => {
                var data = {};
                for(i in res){
                    data[res[i]] = null;
                }
                clientesSaldo.updateData(data);
                clientesServicio.updateData(data);
                clientesSaldoExterna.updateData(data);
            })
            .catch(function (e) {
            });
    }

    function agregarNumero(e) {
        if (e.inputType === 'deleteContentBackward' && count >= 0) {
            count--;
        } else if (Number.isInteger(parseInt(e.data))) {
            count++;
            if (count == 10) {
                telefonos.addChip({ tag: value.value });
                count = 0;
                value.value = '';
            }
        }
    }

    function RecargaSaldo(e) {
        e.preventDefault();
        const table = document.getElementById("table");
        document.getElementById('finalizarVenta').disabled = true;
        let datos;
        if(e.target.classList.contains('Externa')){
            datos = new FormData(document.getElementById('RecargaExterna'));
            datos.append('Operadora', document.getElementById('OperadorasTriggerExterna').value);
            datos.append('Numeros', JSON.stringify(document.getElementsByClassName('chips')[1].M_Chips.chipsData));
            datos.append('Vendedor', document.getElementById('empleadoExterno').value);
            datos.append('Carrier', getCarrierId(document.getElementById("OperadorasTriggerExterna").value));
            document.getElementById('pagadoExterna').checked ? datos.append('Pagado', 1) : datos.append('Pagado', 0);
            datos.append('Tipo', 'Externa');
        }
        else {
            document.getElementById("progress").style.visibility = "visible";
            datos = new FormData(document.getElementById('FormSaldo'));
            datos.append('Operadora', document.getElementById("OperadorasTrigger").value);
            datos.append('Numeros', JSON.stringify(document.getElementsByClassName('chips')[0].M_Chips.chipsData));
            datos.append('Vendedor', document.getElementById("Name").innerText);
            datos.append('Carrier', getCarrierId(document.getElementById("OperadorasTrigger").value));
            document.getElementsByClassName('pagado')[0].checked ? datos.append('Pagado', 1) : datos.append('Pagado', 0);
            datos.append('Tipo', 'Local');
        }
        fetch('recargaSaldo', {
            method: 'POST',
            body: datos
        })
            .then(res => res.json())
            .then(res => {
                if(e.target.classList.contains('Externa')){
                    res.Codigo == 0 ?
                        M.toast({ html: res.Mensaje, classes: 'green white-text' }) :
                        M.toast({ html: 'Error ' + res.Mensaje, classes: 'red white-text' })
                    if (res.Codigo == 0) {
                        document.getElementById('RecargaExterna').reset();
                    } else {
                        document.getElementById('RecargaExterna').data
                    }
                } else {
                    while (table.firstChild) {
                        table.removeChild(table.firstChild);
                    }
                    for (var i in res) {
                        var tr = document.createElement("tr");
                        var Numero = document.createElement("td");
                        var Mensaje = document.createElement("td");
                        res[i].Codigo == 0 ? Numero.classList.add("green-text") : Numero.classList.add("red-text");
                        Numero.innerText = res[i].Tel;
                        Mensaje.innerText = res[i].Mensaje;
                        tr.appendChild(Numero);
                        tr.appendChild(Mensaje);
                        table.appendChild(tr);
                    }
                    modalAviso.open();
                    document.getElementById('FormSaldo').reset();
                    borrarNumeros();
                    document.getElementById("progress").style.visibility = "hidden";
                }
                document.getElementById('finalizarVenta').disabled = false;
            })
            .catch(function (e) {
                var tbody = document.createElement("tbody");
                tbody.id = "table";
                table.appendChild(tbody);
                document.getElementById("progress").style.visibility = "hidden";
                document.getElementById('finalizarVenta').disabled = false;
            });
    }

    function borrarNumeros(){
        telefonos = M.Chips.init(chips, {
            placeholder: "Numeros",
            secondaryPlaceholder: "+Numero"
        });
    }

    function VentaServicio(e) {
        e.preventDefault();
        let nombre = document.getElementById("Name");
        let form = document.getElementById('FormServicio');
        let pagado = document.getElementsByClassName('servicioPagado');
        var datos = new FormData(form);
        pagado[0].checked ? datos.append('Pagado', 1) : datos.append('Pagado', 0);
        datos.append('Vendedor', nombre.innerText);
        fetch('ventaServicio', {
            method: 'POST',
            body: datos
        })
            .then(res => res.json())
            .then(res => {
                res[0].Codigo == 0 ?
                    M.toast({ html: res[0].Mensaje, classes: 'green white-text' }) :
                    M.toast({ html: 'Error ' + res[0].Mensaje, classes: 'red white-text' })
                if (res[0].Codigo == 0) {
                    formServicio.reset();
                } else {
                    formServicio.data
                }
            })
        form.reset();
    }

    function getCarrierId(carrier) {
        switch (carrier) {
            case "Telcel":
                return 1;
            case "Movistar":
                return 2;
            case "Unefon":
                return 3;
            case "AT&T":
                return 4;
            case "MT":
                return 101;
        }
    }

    function cargarMonto(res, Tipo) {
        const Montos = Tipo == 'Externa' ? document.getElementById("MontoExterna") : document.getElementById('Monto');
        while (Montos.firstChild) {
            Montos.removeChild(Montos.firstChild);
        }
        switch (res) {
            case 'Telcel':
                let telcel = [100, 150, 200, 300, 500];
                for (i in telcel) {
                    const opciones = Tipo == 'Externa' ? document.getElementById("MontoExterna") : document.getElementById('Monto');
                    let opcion = document.createElement("option");
                    opcion.value = telcel[i];
                    opcion.text = '$ ' + telcel[i];
                    opciones.appendChild(opcion);
                }
                var montos = M.FormSelect.init(select);
                break;
            case 'Movistar':
                let movistar = [100, 150, 200];
                for (i in movistar) {
                    const opciones = Tipo == 'Externa' ? document.getElementById("MontoExterna") : document.getElementById('Monto');
                    let opcion = document.createElement("option");
                    opcion.value = movistar[i];
                    opcion.text = '$ ' + movistar[i];
                    opciones.appendChild(opcion);
                }
                montos = M.FormSelect.init(select);
                break;
            case 'Unefon':
                let unefon = [100, 15, 20, 30, 50, 70, 150, 200, 300];
                for (i in unefon) {
                    const opciones = Tipo == 'Externa' ? document.getElementById("MontoExterna") : document.getElementById('Monto');
                    let opcion = document.createElement("option");
                    opcion.value = unefon[i];
                    opcion.text = '$ ' + unefon[i];
                    opciones.appendChild(opcion);
                }
                montos = M.FormSelect.init(select);
                break;
            case 'AT&T':
                let at = [100, 150, 200, 300, 500, 1000];
                for (i in at) {
                    const opciones = Tipo == 'Externa' ? document.getElementById("MontoExterna") : document.getElementById('Monto');
                    let opcion = document.createElement("option");
                    opcion.value = at[i];
                    opcion.text = '$ ' + at[i];
                    opciones.appendChild(opcion);
                }
                montos = M.FormSelect.init(select);
                break;
            case 'MT':
                const values = [99,199,299];
                for(i in values){
                    const opciones = Tipo == 'Externa' ? document.getElementById('MontoExterna') : document.getElementById('Monto');
                    opciones.innerHTML += `
                        <option value="${values[i]}">$ ${values[i]}</option>
                    `;
                }
                montos = M.FormSelect.init(select);
                break;
            default:
                break;
        }
    }
});