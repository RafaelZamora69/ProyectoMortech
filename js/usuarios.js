document.addEventListener('DOMContentLoaded', function(){
    const elems = document.getElementById('modalRegistro');
    const modalRegistro = M.Modal.init(elems);

    document.getElementById('Nuevo').addEventListener('click', () => {
        modalRegistro.open();
    });

    document.body.addEventListener('click',  (e) =>{
        if(e.target.classList.contains('Editar')){
            EditarEmpleado();
        } else if(e.target.classList.contains('Eliminar')){
            EliminarEmpleado();
        }
    });

    cargarUsuarios();
    //TODO Editar la información del empleado, pero no la contraseña
    function EditarEmpleado(){

    }
    //TODO Deshabilitar el empleado, mostrar mensaje de aviso que el empleado quedará deshabilitado
    function EliminarEmpleado(){

    }
    //TODO falta agregar opción de agregar un nuevo empleado

    function nuevoUsuario(){

    }

    function cargarUsuarios(){
        fetch('obtenerUsuarios')
            .then(res => res.json())
            .then(res => {
                console.log(res);
                for(i in res){
                    document.getElementById('Usuarios').innerHTML += `
                        <li class="collection-item avatar">
                            <img src="../images/userProfile.jpg" class="circle">
                            <span class="title">${res[i].Nombre}</span>
                            <p>${res[i].Jerarquia}</p>
                            <div class="secondary-content">
                                <a class="waves-effect waves-light yellow black-text btn Editar" id="${res[i].id}"><i class="material-icons">edit</i></a>
                                <a class="waves-effect waves-light red btn Eliminar" id="${res[i].id}"><i class="material-icons">delete</i></a>
                            </div>
                        </li>
                    `;
                }
            });
    }
});