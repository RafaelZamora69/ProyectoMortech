<?php
    require_once 'views/layouts/header.php';
    require_once 'views/layouts/navbar.php';
    require_once 'views/layouts/sidenav.php';
?>
<html>
<h4>Mis compras</h4>
<table class="centered">
    <thead>
        <tr>
            <th>Proveedor</th>
            <th>Referencia</th>
            <th>Total</th>
            <th>Fecha</th>
            <th>Pagada</th>
            <th>Recibo</th>
        </tr>
    </thead>
    <tbody id="misComprasBody"></tbody>
</table>
</html>
<?= require_once 'views/layouts/footer.php';?>
<script src="<?= base_url ?>js/misCompras.js"></script>
