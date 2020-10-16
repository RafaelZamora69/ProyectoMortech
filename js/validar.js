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
                document.getElementById('body').innerHTML = '';
                cargarTabla(res);
            });
    }

    function cargarTabla(res){
        
    }
});