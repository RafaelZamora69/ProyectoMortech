document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.datepicker');
    var today = new Date();
    var fechas = M.Datepicker.init(elems,{
        format: 'yyyy-mm-dd',
        maxDate: new Date(today.getFullYear(), today.getMonth(), today.getDate())
    });
    document.getElementById("consultar").addEventListener('click', consultar);

    function consultar(e){
        console.log(fechas.toString());
    }
  });