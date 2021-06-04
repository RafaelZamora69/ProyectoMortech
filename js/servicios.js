document.addEventListener('DOMContentLoaded', function () {
    let planes = []
    let modalNemi = null
    const externa = document.getElementById('exterior');
    const elems = document.getElementById('modal2');
    const modal2 = M.Modal.init(elems);
    document.getElementById('NumeroBuscar').addEventListener('submit', (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('Numero', (document.getElementById('Numero').value).replace('/\s/g', ''));
        fetch('buscarNumero', {
            body: data,
            method: 'POST'
        })
            .then(res => res.json())
            .then(res => {
                const TablaInfoNumeroDatos = document.getElementById('TablaInfoNumeroDatos');
                TablaInfoNumeroDatos.innerHTML = '';
                if (res.length > 0) {
                    res.map(i => TablaInfoNumeroDatos.insertAdjacentHTML('beforeend', `
                            <tr>
                                <td>${i.Cliente}</td>
                                <td>${i.Empleado}</td>
                                <td>${i.Monto}</td>
                                <td>${i.Usd} Usd, ${i.Mxn} Mxn</td>
                                <td>${i.Operadora}</td>
                                <td>${i.NumeroTelefono}</td>
                                <td>${i.Pagado}</td>
                                <td>${i.Fecha}</td>
                            </tr>
                        `));
                }
                modal2.open();
            });
    });
    document.getElementById("progress").style.visibility = "hidden";
    M.FormSelect.init(document.getElementById('Operadora'));
    obtenerPlanes();
    //Proveedores
    const autoPro = document.getElementById('autocompleteProveedores');
    const Proveedores = M.Autocomplete.init(autoPro);
    let count = 0;
    //Clientes
    var autocom = document.getElementById('autocompleteName');
    var clientesSaldo = M.Autocomplete.init(autocom);
    var clientesSaldoExterna = M.Autocomplete.init(document.querySelector('#autocompleteNameExterna'));
    //Numeros de teléfono
    var telefonos = M.Chips.init(document.querySelector('#chips'), {
        placeholder: "Numeros",
        secondaryPlaceholder: "+Numero"
    });
    var autocom = document.getElementById('autocompleteCliente');
    var clientesServicio = M.Autocomplete.init(autocom);
    //Modal de aviso
    var modal = document.getElementById('modal1');
    var modalAviso = M.Modal.init(modal);
    //Monto a pagar
    let formSaldo = document.getElementById('FormSaldo');
    let formServicio = document.getElementById('FormServicio');
    //Empleados
    const empleados = document.getElementById('empleadoExterno');
    const empleadosExterna = M.Autocomplete.init(empleados);
    formSaldo.addEventListener('submit', (e) => {
        e.preventDefault()
        if (document.getElementById('idNemi').value.length === 5) {
            obtenerNumeroNemi(document.getElementById('idNemi').value);
        } else if (esNemi(document.getElementById('Operadora').value)) {
            obtenerInfoRecargaNemi(document.querySelector('#chips').M_Chips.chipsData[0].tag)
        } else {
            RecargaSaldo(e);
        }
    });
    formServicio.addEventListener('submit', (e) => {
        e.stopImmediatePropagation();
        document.getElementById('finalizarServicio').classList.add('disabled');
        VentaServicio(e);
    });
    chips.addEventListener('input', agregarNumero);
    document.getElementById('Agregar').addEventListener('click', () => {
        telefonos.addChip({tag: document.querySelector('#numeros').value});
        count = 0;
        document.querySelector('#numeros').value = '';
    });
    document.getElementById('registrarCompra').addEventListener('click', (e) => {
        registrarCompra(e);
    });
    //funciones
    ObtenerClientes();
    obtenerProveedores();
    //FORM EXTERNO
    if (document.getElementById('exterior')) {
        obtenerEmpleados();
        const telefonosExterna = M.Chips.init(document.querySelector('#chipsExterna'), {
            placeholder: "Numeros",
            secondaryPlaceholder: "+Numero"
        })
        document.getElementById('AgregarExterna').addEventListener('click', () => {
            telefonosExterna.addChip({tag: document.querySelector('#numeroExterno').value});
            count = 0;
            document.querySelector('#numeroExterno').value = '';
        });
        chipsExterna.addEventListener('input', agregarNumeroExterno);
        document.querySelector('#RecargaExterna').addEventListener('submit', (e) => {
            e.preventDefault()
            if(esNemi(document.querySelector('#OperadoraExterna').value)){
                modalNemi = M.Modal.init(document.querySelector('#modalAvisoNemi'))
                document.querySelector('#contenidoAvisoNemi').innerHTML = `
                    <div class="row"> 
                        <div class="input-field col s6"> 
                            <input type="number" id="montoNemi">
                            <label for="montoNemi">Ingrese monto</label>
                        </div>
                    </div>
                    <div class="row">
                    <div class="col s6"> 
                        <a href="#!" class="green white-text btn" id="recargaNemi">Aceptar</a>
                    </div>
                    </div>
                `
                document.querySelector('#recargaNemi').addEventListener('click', (e) => {
                    registrarVentaNemi(document.querySelector('#chipsExterna').M_Chips.chipsData[0].tag,
                        document.querySelector('#montoNemi').value,
                        document.querySelector('#empleadoExterno').value)
                })
                modalNemi.open()
            } else {
                RecargaSaldo()
            }
        })

        function agregarNumeroExterno(e) {
            if (e.inputType === 'deleteContentBackward' && count >= 0) {
                count--;
            } else if (Number.isInteger(parseInt(e.data))) {
                count++;
                if (count === 10) {
                    telefonosExterna.addChip({tag: document.querySelector('#numeroExterno').value});
                    count = 0;
                    document.querySelector('#numeroExterno').value = '';
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

    function obtenerNumeroNemi(id) {
        const data = new FormData();
        data.append('id', id);
        fetch('obtenerInfoNemi', {
            body: data,
            method: 'POST'
        })
            .then(res => res.json())
            .then(res => {
                if (res.Serie !== 'null') {
                    const modalNemiContent = document.getElementById('modalNemiContent');
                    const modalNemiFooter = document.getElementById('modalNemiFooter');
                    modalNemiContent.innerHTML = `
                    <h4>Verificar información</h4>
                    <div class="row">
                        <div class="col s12 m6">
                            <ul class="collection">
                                <li class="collection-item">N. Serie</li>
                                <li class="collection-item">${res.Serie}</li>
                            </ul>
                        </div>
                        <div class="col s12 m6">
                            <ul class="collection">
                            <li class="collection-item">N.Teléfono</li>
                            <li class="collection-item">${res.Tel}</li>
                            </ul> 
                        </div>
                    </div>
                `;
                    res.Activada === 0 ?
                        modalNemiFooter.innerHTML = `<a id="ActivarNemi" class="ActivarNemi">Activar</a>` :
                        modalNemiFooter.innerHTML = `<a id="ActivarNemi" class="ActivarNemi">Confirmar</a>`
                    const modal = M.Modal.init(document.getElementById('modalNemi')).open();
                    document.getElementById('ActivarNemi').addEventListener('click', (e) => {
                        e.stopPropagation()
                        modal.close()
                        const modalNemi = M.Modal.init(document.querySelector('#modalAvisoNemi'))
                        document.querySelector('#contenidoAvisoNemi').innerHTML = `
                            <div class="row"> 
                                <div class="col s12"> 
                                    <h6>Obteniendo información de SIM</h6>
                                </div>
                            </div>
                            <div class="row">
                            <div class="col s12"><div class="progress">
                            <div class="indeterminate"></div>
                            </div></div>
                            </div>
                        `
                        modalNemi.open()
                        obtenerInfoNemi(res.Serie, res.Tel)
                    });
                } else {
                    M.toast({html: 'N° Serie no existe', classes: 'red white-text'});
                }
            }).catch((e) => {
        });
    }

    function obtenerInfoNemi(serie, tel) {
        planes = []
        fetch('https://cdn.nemi.tel/services/activacion/1001174/validaSim', {
            method: 'POST',
            body: JSON.stringify({
                "entorno": "desarrollo",
                "serie": serie
            })
        })
            .then(res => res.json())
            .then(res => {
                if (res.responseCode === "200") {
                    res.productos.forEach(producto => {
                        planes.push({id: producto.id, name: producto.name, precio: producto.precioVentaFinal})
                    })
                    document.querySelector('#contenidoAvisoNemi').innerHTML = `
                        <div class="row">
                            <div class="col s12"> 
                                <h6>Seleccione plan</h6>
                            </div>
                        </div>
                        <div class="row">
                        <div class="col s12"> 
                            <select name="" id="planesNemi"></select>
                            <label for="planesNemi">Seleccione plan</label>
                        </div>
                        </div>
                        <div class="row">
                        <div class="col s12"><a href="#!" class="green white-text waves-effect btn" id="activaNemi">Aceptar</a></div>
                        </div>
                    `
                    const select = document.querySelector('#planesNemi')
                    let index = 0
                    planes.forEach(plan => {
                        select.innerHTML += `<option value="${index}">${codigoNemi(plan.name)}</option>`
                        index++
                    })
                    M.FormSelect.init(select)
                    document.querySelector('#activaNemi').addEventListener('click', (e) => activaNemi(serie, planes[document.querySelector('#planesNemi').value], tel))
                } else {
                    document.querySelector('#contenidoAvisoNemi').innerHTML = `
                        <div class="row">
                            <div class="col s12">
                                <h6>Error en API Nemi</h6>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s12">
                                <p class="red-text">${res.Error}</p>
                            </div>
                        </div>   
                    `
                }
            })
    }

    function obtenerInfoRecargaNemi(tel) {
        planes = []
        const modalNemi = M.Modal.init(document.querySelector('#modalAvisoNemi'))
        document.querySelector('#contenidoAvisoNemi').innerHTML = `
                            <div class="row"> 
                                <div class="col s12"> 
                                    <h6>Obteniendo información de ${tel}</h6>
                                </div>
                            </div>
                            <div class="row">
                            <div class="col s12"><div class="progress">
                            <div class="indeterminate"></div>
                            </div></div>
                            </div>
                        `
        modalNemi.open()
        fetch('https://cdn.nemi.tel/services/recarga/1001174/consultaNumero', {
            method: 'POST',
            body: JSON.stringify({
                "numero": tel,
                "entorno": "desarrollo"
            })
        })
            .then(res => res.json())
            .then(res => {
                res.productos.forEach(producto => {
                    planes.push({id: producto.id, name: producto.name, precio: producto.precioVentaFinal})
                    document.querySelector('#contenidoAvisoNemi').innerHTML = `
                        <div class="row">
                            <div class="col s12"> 
                                <h6>Seleccione plan</h6>
                            </div>
                        </div>
                        <div class="row">
                        <div class="col s12"> 
                            <select name="" id="planesNemi"></select>
                            <label for="planesNemi">Seleccione plan</label>
                        </div>
                        </div>
                        <div class="row">
                        <div class="col s12"><a href="#!" class="green white-text waves-effect btn" id="activaNemi">Aceptar</a></div>
                        </div>
                    `
                    const select = document.querySelector('#planesNemi')
                    let index = 0
                    planes.forEach(plan => {
                        select.innerHTML += `<option value="${index}">${codigoNemi(plan.name)}</option>`
                        index++
                    })
                    M.FormSelect.init(select)
                    document.querySelector('#activaNemi').addEventListener('click', (e) => recargaNemi(tel, planes[document.querySelector('#planesNemi').value]))
                })
            })
    }

    function registrarCompra(e) {
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
                res.Codigo == 0 ? M.toast({html: res.Message, classes: 'green white-text'}) :
                    M.toast({html: 'Error ' + res.Message, classes: 'red white-text'});
                if (res.Codigo == 0) {
                    document.getElementById('FormCompra').reset();
                }
                document.getElementById('registrarCompra').disabled = false;
            })
    }

    function obtenerProveedores() {
        fetch('obtenerProveedores')
            .then(res => res.json())
            .then(res => {
                var data = {};
                for (i in res) {
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
                for (i in res) {
                    data[res[i]] = null;
                }
                clientesSaldo.updateData(data);
                clientesServicio.updateData(data);
                if (externa != undefined) {
                    clientesSaldoExterna.updateData(data);
                }
            })
            .catch(function (e) {
            });
    }

    function agregarNumero(e) {
        if (e.inputType === 'deleteContentBackward' && count >= 0) {
            count--;
        } else if (Number.isInteger(parseInt(e.data))) {
            count++;
            if (count === 10) {
                telefonos.addChip({tag: document.querySelector('#numeros').value});
                count = 0;
                document.querySelector('#numeros').value = '';
            }
        }
    }

    function RecargaSaldo(e) {
        const table = document.getElementById("table");
        document.getElementById('finalizarVenta').disabled = true;
        let datos;
        if (e.target.classList.contains('Externa')) {
            datos = new FormData(document.getElementById('RecargaExterna'));
            datos.append('Numeros', JSON.stringify(document.querySelector('#chipsExterna').M_Chips.chipsData));
            datos.append('Vendedor', document.querySelector('#empleadoExterno').value);
            datos.append('Plan', document.querySelector('#OperadoraExterna').value);
            document.getElementById('pagadoExterna').checked ? datos.append('Pagado', 1) : datos.append('Pagado', 0);
            document.getElementsByClassName('recargaExterna')[0].checked ? datos.append('Recarga', 1) : datos.append('Recarga', 0);
            datos.append('Tipo', 'Externa');
        } else {
            document.getElementById("progress").style.visibility = "visible";
            datos = new FormData(document.getElementById('FormSaldo'));
            datos.append('Numeros', JSON.stringify(document.getElementsByClassName('chips')[0].M_Chips.chipsData));
            datos.append('Vendedor', document.getElementById("Name").innerText);
            datos.append('Plan', document.getElementById('Operadora').value);
            document.getElementsByClassName('pagado')[0].checked ? datos.append('Pagado', 1) : datos.append('Pagado', 0);
            document.getElementsByClassName('recarga')[0].checked ? datos.append('Recarga', 1) : datos.append('Recarga', 0);
            datos.append('Tipo', 'Local');
        }
        fetch('recargaSaldo', {
            method: 'POST',
            body: datos
        })
            .then(res => res.json())
            .then(res => {
                if (e.target.classList.contains('Externa')) {
                    res.Codigo === 0 ?
                        M.toast({html: res.Mensaje, classes: 'green white-text'}) :
                        M.toast({html: 'Error ' + res.Mensaje, classes: 'red white-text'})
                    if (res.Codigo == 0) {
                        document.getElementById('RecargaExterna').reset();
                    } else {
                        document.getElementById('RecargaExterna').data;
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

    function borrarNumeros() {
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
                res[0].Codigo === 0 ?
                    M.toast({html: res[0].Mensaje, classes: 'green white-text'}) :
                    M.toast({html: 'Error ' + res[0].Mensaje, classes: 'red white-text'})
                if (res[0].Codigo === 0) {
                    formServicio.reset();
                } else {
                    formServicio.data
                }
                document.getElementById('finalizarServicio').classList.remove('disabled');
            })
        form.reset();
        pass = 0;
    }

    function obtenerPlanes() {
        fetch('obtenerPlanes')
            .then(res => res.json())
            .then(res => {
                //Dios perdoname por lo que estoy haciendo, prometo arreglar esta mierda
                let optionOperadoraExt = undefined;
                const optionOperadora = document.getElementById('Operadora');
                if (document.getElementById('OperadoraExterna') != undefined) {
                    optionOperadoraExt = document.getElementById('OperadoraExterna');
                }
                const operadoras = ['Space', 'AT&T', 'Movistar', 'Telcel', 'Unefon'];
                optionOperadora.insertAdjacentHTML('beforeend', `<option value="26" selected>Nemi</option>`);
                if(optionOperadoraExt !== undefined){
                    optionOperadoraExt.insertAdjacentHTML('beforeend', `<option value="26" selected>Nemi</option>`);
                }
                operadoras.forEach(i => {
                    let filter = res.filter(x => x.Operadora === i);
                    filter.forEach(x => {
                        optionOperadora.insertAdjacentHTML('beforeend', `<option value="${x.id}">${x.Operadora}: ${x.Plan}</option>`);
                        if (optionOperadoraExt != undefined) {
                            optionOperadoraExt.insertAdjacentHTML('beforeend', `<option value="${x.id}">${x.Operadora}: ${x.Plan}</option>`);
                        }
                    });
                });
                M.FormSelect.init(document.getElementById('Operadora'));
                if (optionOperadoraExt != undefined) {
                    M.FormSelect.init(document.getElementById('OperadoraExterna'));
                }
            });
    }

    function activaNemi(serie, plan, tel) {
        document.querySelector('#contenidoAvisoNemi').innerHTML = `
            <div class="row"> 
                <div class="col s12"><h6>Activando SIM ${serie}</h6></div>
            </div>
            <div class="row">
            <div class="col s12"><div class="progress"><div class="indeterminate"></div></div></div></div>
        `
        /*
        insert into nemi(NumSerie,NumNemi,Activada)values ('8952140061811810510F','000000000',0), ('8952140061811810520F','000000001',0), ('8952140061811810530F','000000002',0), ('8952140061811810540F','000000003',0), ('8952140061811810550F','000000004',0), ('8952140061811810560F','000000005',0), ('8952140061811810570F','000000006',0), ('8952140061811810580F','000000007',0)
         */
        const data = {
            "entorno": "desarrollo",
            "serie": serie,
            "plan": plan.id,
            "cbpartnerid": "1000630"
        }
        fetch('https://cdn.nemi.tel/services/activacion/1001174/activaSim', {
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                if (res.result === 'success') {
                    document.querySelector('#contenidoAvisoNemi').innerHTML = `
                        <h6>Sim activada</h6>
                    `
                    registrarVentaNemi(tel, plan.precio)
                } else {
                    document.querySelector('#contenidoAvisoNemi').innerHTML = `
                        <h6>Error en Nemi</h6><br><p class="red-text">${res.Error}</p>
                    `
                }
                document.getElementById("progress").style.visibility = "hidden";
            })
    }

    function recargaNemi(tel, plan) {
        document.querySelector('#contenidoAvisoNemi').innerHTML = `
            <div class="row"> 
                <div class="col s12"><h6>Recargando ${tel}</h6></div>
            </div>
            <div class="row">
            <div class="col s12"><div class="progress"><div class="indeterminate"></div></div></div></div>
        `
        const data = {"numero": tel, "plan": plan.id, "entorno": "desarrollo"}
        fetch('https://cdn.nemi.tel/services/recarga/1001174/recargaNumero', {
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                if (res.responseCode === '200') {
                    document.querySelector('#contenidoAvisoNemi').innerHTML = `
                        <div class="row"> 
                            <div class="col s12"><h6>Recarga correcta</h6></div>
                        </div>
                    `
                    registrarVentaNemi(tel,plan.precio)
                } else {
                    M.toast({html: `${res.descripcion}`, classes: 'red white-text truncate'})
                }
                document.getElementById("progress").style.visibility = "hidden";
            })
    }

    function registrarVentaNemi(tel, total, vendedor = null) {
        const datos = new FormData(document.getElementById('FormSaldo'))
        datos.append('Vendedor', vendedor === null ? document.getElementById("Name").innerText : vendedor)
        datos.append('Numero', tel)
        datos.append('Plan', document.getElementById('Operadora').value)
        datos.append('Monto', total)
        document.getElementsByClassName('pagado')[0].checked ? datos.append('Pagado', 1) : datos.append('Pagado', 0);
        document.getElementsByClassName('recarga')[0].checked ? datos.append('Recarga', 1) : datos.append('Recarga', 0);
        fetch('recargaNemi', {
            method: 'POST',
            body: datos
        })
            .then(res => res.json())
            .then(res => {
                if (res.Codigo === 0) {
                    M.toast({html: res.Mensaje, classes: 'green white-text'});
                    document.getElementById('FormSaldo').reset();
                    if(document.querySelector('#exterior') !== undefined){
                        document.querySelector('#RecargaExterna').reset()
                        if(modalNemi !== null) {
                            modalNemi.close()
                        }
                    }
                }
            });
    }

    function codigoNemi(plan) {
        /*
         MT1 NEMI Movilidad 30 días 20GB Tethering PROMO 225 MXN
         MT1A NEMI Movilidad 30 días 20GB PROMO 150 MXN
         MT5 NEMI Movilidad 30 días 5GB Tethering PROMO 75 MXN
         MT6 NEMI Movilidad 30 días 50GB Tethering PROMO 399 MXN
         */
        const planes = [
            {code: 'MT1', name: 'OFERTA NEMI 30 días 20GB Tethering'},
            {code: 'MT1A', name: 'OFERTA NEMI 30 días 20GB '},
            {code: 'MT2', name: 'OFERTA NEMI 7 días 5GB'},
            {code: 'MT3', name: 'OFERTA NEMI 14 días 10GB'},
            {code: 'MT4', name: 'OFERTA NEMI 30 días 8GB Tethering'},
            {code: 'MT5', name: 'OFERTA NEMI 30 días 5GB Tethering'},
            {code: 'MT6', name: 'OFERTA NEMI 30 días 50GB Tethering'},]
        let code = ''
        for (stream of planes) {
            if (stream.name === plan) {
                code = stream.code.concat(' ', plan)
                break
            }
        }
        if (code === ''){
            return truncatePlan('NO USAR!!! '.concat(plan))
        }
        return truncatePlan(code)
    }

    function esNemi(id) {
        return [26, 25, 27, 28, 29, 35, 34].includes(parseInt(id))
    }

    function truncatePlan(text){
        return text.length > 15 ? text.substring(0, (15 - 3)) + '...' : text
    }
});