document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('Analizar').addEventListener('click', (e) => {
        analizar(e)
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
                console.log(res)
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
                </tr>
            `;
        }
    }

    function obtenerColor(Codigo){
        if(Codigo == 0){
            return 'green-text';
        }
        if(Codigo == 1){
            return 'red-text';
        }
        if(Codigo == 2){
            return 'yellow-text';
        }
    }
});