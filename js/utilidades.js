document.addEventListener('DOMContentLoaded',(e) => {
    document.getElementById('progress').style.visibility = 'hidden';
   document.getElementById('cargaNemi').addEventListener('submit', (e) => {
      e.preventDefault();
      cargaNemi();
   });
    document.getElementById('cargaNumeros').addEventListener('submit', (e) => {
        e.preventDefault();
        cargaNumero();
    });

   function cargaNemi(){
       document.getElementById('progress').style.visibility = 'visible';
        const data = new FormData();
        data.append('Archivo',document.getElementById('Archivo').files[0]);
        fetch('cargarNemi',{
            method: 'POST',
            body: data
        })
            .then(res => res.json())
            .then(res => {
                res.Code === 0 ? M.toast({ html: res.Mensaje, classes: 'green white-text' }) :
                    M.toast({ html: 'Error ' + res.Mensaje, classes: 'red white-text' });
                document.getElementById('progress').style.visibility = 'hidden';
            }).catch((e) => {
                document.getElementById('progress').style.visibility = 'hidden';
        });
   }

    function cargaNumero(){
        document.getElementById('progress').style.visibility = 'visible';
        const data = new FormData();
        data.append('Numeros',document.getElementById('Numeros').files[0]);
        fetch('cargarNumeros',{
            method: 'POST',
            body: data
        })
            .then(res => res.json())
            .then(res => {
                res.Code === 0 ? M.toast({ html: res.Mensaje, classes: 'green white-text' }) :
                    M.toast({ html: 'Error ' + res.Mensaje, classes: 'red white-text' });
                document.getElementById('progress').style.visibility = 'hidden';
            }).catch((e) => {
            document.getElementById('progress').style.visibility = 'hidden';
        });
    }
});