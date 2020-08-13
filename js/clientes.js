document.addEventListener('DOMContentLoaded', function() {
    obtenerClientes();

    function obtenerClientes(){
        fetch('creditoClientes',{
            method: 'POST'
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
        });
    }
});