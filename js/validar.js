document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('Analizar').addEventListener('click', (e) => {
        analizar(e)
    });
    document.body.addEventListener('click', (e) => {
       if(e.target.classList.contains('verificar')){
           verificar(e.target.id.replace('verificar-',''));
       }
    });

    function analizar(e){
        e.preventDefault();
        document.getElementById('body').innerHTML = `  
          <div class="progress">
              <div class="indeterminate"></div>
          </div>
        `;
        const data = new FormData();
        data.append('Archivo', document.getElementById('Archivo').files[0]);
        fetch('analizar',{
            method: 'POST',
            body: data
        }).then(res => res.json())
            .then(res => {
                cargarTabla(res);
            });
    }

    function cargarTabla(res){
        document.getElementById('body').innerHTML = `
            <table class="centered">
                <thead>
                    <tr>
                        <th>Orden</th>
                        <th>Mensaje</th>
                        <th>Empleado</th>
                        <th>Fecha</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody id="TablaMensajes"></tbody>
            </table>
        `;
        for(i in res){
            document.getElementById('TablaMensajes').innerHTML += `
                <tr>
                    <td><p class="${obtenerColor(res[i].Codigo)}">${res[i].Orden}</p></td>
                    <td>${res[i].Mensaje}</td>
                    <td>${res[i].Empleado == undefined ? '---' : res[i].Empleado}</td>
                    <td>${res[i].Fecha == undefined ? '---' : res[i].Fecha}</td>
                    <td>${res[i].Codigo == 3 ? botonVerificar(res[i].idVenta) : '---'}</td>
                </tr>
            `;
        }
    }

    function botonVerificar(idVenta){
        return `
            <a class="btn flat waves-effect verificar" id="verificar-${idVenta}">Verificar</a>
        `;
    }

    function verificar(idVenta){
        const Data = new FormData();
        Data.append('idVenta', idVenta);
        fetch('verificar',{
            method:'POST',
            body: Data
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                res == true ? M.toast({ html: 'Servicio verificado', classes: 'green white-text' }) :
                M.toast({ html: 'Error al verificar ', classes: 'red white-text' });
            });
    }

    function obtenerColor(Codigo){
        if(Codigo == 0){
            return 'green-text';
        }
        if(Codigo == 1){
            return 'red-text';
        }
        if(Codigo == 2 || Codigo == 3){
            return 'yellow-text';
        }
    }
});