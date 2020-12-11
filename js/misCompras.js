document.addEventListener('DOMContentLoaded', () => {
   cargarMisCompras();

   function cargarMisCompras(){
       const data = new FormData();
       data.append('usuario', document.getElementById('Name'));
       fetch('misCompras',{
           body: data,
           method: 'POST'
       })
           .then(res => res.json())
           .then(res => {
               console.log(res);
           });
   }
});