document.addEventListener('DOMContentLoaded', () => {
   cargarMisCompras();
   document.addEventListener('click',(e) => {
       if(e.target.classList.contains('descargarImagen')){
           descargarImagen(e.target.id.replace('img-',''));
       }
   });

   function cargarMisCompras(){
       const data = new FormData();
       data.append('usuario', document.getElementById('Name').textContent);
       fetch('misCompras',{
           body: data,
           method: 'POST'
       })
           .then(res => res.json())
           .then(res => {

               if(res.length > 0){
                   const misComprasBody = document.getElementById('misComprasBody');
                   res.map( i => {
                       misComprasBody.insertAdjacentHTML('beforeend',`
                            <tr>
                                <td>${i.Proveedor}</td>
                                <td>${i.Referencia}</td>
                                <td>${i.Total}</td>
                                <td>${i.Fecha}</td>
                                <td>${i.Pagada}</td>
                                <td id="img-${i.idCompra}"><a href="#" class="descargarImagen" id="img-${i.idCompra}">Descargar comprobante</a></td>
                            </tr>
                       `);
                   });
               } else {
                   M.toast({ html: 'No hay compras registradas hoy', classes: 'red white-text' })
               }
           });
   }

    function descargarImagen(idCompra){
        const data = new FormData();
        data.append('idCompra', idCompra);
        fetch('descargarImagen',{
            method:'POST',
            body: data
        })
            .then(res => res.json())
            .then(res => {
                document.getElementById('img-'+idCompra).innerHTML = '';
                document.getElementById('img-'+idCompra).insertAdjacentHTML('beforeend',`
                    <img src="data:image/png;base64,${res.Imagen}" class="responsive-img materialboxed" width="100px" data-caption="Comprobante compra #${idCompra}">
                `);
                M.Materialbox.init(document.querySelectorAll('.materialboxed'));
            });
    }
});