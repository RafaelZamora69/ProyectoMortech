document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('Analizar').addEventListener('click', (e) => {
        analizar(e)
    });

    function analizar(e){
        e.preventDefault();
        const data = new FormData();
        data.append('Archivo', document.getElementById('Archivo').files[0]);
        fetch('analizar',{
            method: 'POST',
            body: data
        }).then(res => res.json())
            .then(res => {
                console.log(res)
            });
    }
});