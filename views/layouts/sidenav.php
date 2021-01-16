<!-- sideNav -->
<ul class="sidenav" id="menu">
    <li>
        <div class="user-view">
            <div class="background">
                <img src="../images/background.png" alt="background image" class="responsive-img">
            </div>
            <a href="#user"><img src="../images/userProfile.jpg" alt="userProfile" class="circle"></a>
            <a href="#name"><span class="white-text name" id="Name"><?= $_SESSION['identity']['Nombre'] ?></span></a>
            <a href="#mail"><span class="white-text email">example@domain.com</span></a>
        </div>
    </li>
    <li><a class="waves-effect" href="<?= base_url ?>principal/index">Inicio</a></li>
    <li>
        <div class="divider"></div>
    </li>
    <li><a class="subheader">Operaciones</a></li>
    <li><a href="<?= base_url ?>servicios/index" class="waves-effect">Venta de servicio</a></li>
    <li><a href="<?= base_url ?>cliente/index" class="waves-effect">Busqueda de cliente</a></li>
    <li><a href="<?= base_url ?>compra/usuario" class="waves-effect">Mis compras</a></li>
    <li><a href="<?= base_url ?>servicios/usuario" class="waves-effect">Modificaciones</a></li>
    <?php if ($_SESSION['identity']['Jerarquia'] == 'Administrador') : ?>
        <li><a class="subheader">Administración</a></li>
        <li><a href="<?= base_url ?>compra/index" class="waves-effect">Compras</a></li>
        <li><a href="<?= base_url ?>verificar/index" class="waves-effect">Verificar servicios</a></li>
        <li><a href="<?= base_url ?>reportes/index" class="waves-effect">Reportes</a></li>
        <li><a href="<?= base_url ?>corte/index" class="waves-effect">Corte</a></li>
        <li><a href="" class="waves-effect">Utilidades</a></li>
        <li><a href="" class="waves-effect">Usuarios</a></li>
    <?php endif ?>
    <li>
        <div class="divider"></div>
    </li>
    <li><a href="<?= base_url ?>login/logout" class="waves-effect">Cerrar sesión</a></li>
</ul>