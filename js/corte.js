document.addEventListener('DOMContentLoaded', function () {
    var elems = document.getElementById('CorteOption');
    var instances = M.FormSelect.init(elems, {
        dropdownOptions: { hover: false }
    });
    console.log(elems)
    document.getElementById("CargarCorte").addEventListener('click', prueba);

    function prueba(e) {
        e.preventDefault();
        console.log("click!");
        console.log(instances.getSelectedValues());
    }
});