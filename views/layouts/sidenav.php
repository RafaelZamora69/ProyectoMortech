<!-- sideNav -->
<div class="">
    <ul class="sidenav sidenav-fixed" id="menu">
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
        <li><a href="<?= base_url ?>login/logout" class="waves-effect">Cerrar sesión <i class="material-icons">exit_to_app</i></a></li>
        <li>
            <div class="divider"></div>
        </li>
        <li><a class="subheader">Operaciones</a></li>
        <li><a href="<?= base_url ?>servicios/index" class="waves-effect">Venta de servicio <i class="material-icons">point_of_sale</i></a></li>
        <li><a href="<?= base_url ?>cliente/index" class="waves-effect">Busqueda de cliente <i class="material-icons">person_search</i></a></li>
        <li><a href="<?= base_url ?>compra/usuario" class="waves-effect">Mis compras <i class="material-icons">shopping_cart</i></a></li>
        <li><a href="<?= base_url ?>servicios/usuarios" class="waves-effect">Modificaciones <i class="material-icons">settings</i></a></li>
        <?php if ($_SESSION['identity']['Jerarquia'] == 'Administrador') : ?>
            <li>
                <div class="divider"></div>
            </li>
            <li><a class="subheader">Administración</a></li>
            <li><a href="<?= base_url ?>compra/index" class="waves-effect">Compras</a></li>
            <li><a href="<?= base_url ?>reportes/index" class="waves-effect">Reportes <i class="material-icons">plagiarism</i></a></li>
            <li><a href="<?= base_url ?>corte/index" class="waves-effect">Corte <i class="material-icons">content_cut</i></a></li>
            <!-- Herramientas -->
            <li class="no-padding">
                <ul class="collapsible collapsible-accordion">
                    <li>
                        <a class="collapsible-header">Herramientas <i class="material-icons">construction</i></a>
                        <div class="collapsible-body">
                            <ul>
                                <li><a href="<?= base_url ?>verificar/index" class="waves-effect">Verificar servicios <i class="material-icons">done_all</i></a></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </li>
            <!-- Nemi -->
            <li class="no-padding">
                <ul class="collapsible collapsible-accordion">
                    <li>
                        <a class="collapsible-header">NEMI <i class="material-icons">call</i></a>
                        <div class="collapsible-body">
                            <ul>
                                <li><a href="<?= base_url ?>utilidad/index">Agregar sims <i class="material-icons">add</i></a></li>
                                <li><a href="<?= base_url ?>utilidad/index">Reporte sims <i class="material-icons">format_list_numbered</i></a></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </li>
            <!-- STEL Order -->
            <li class="no-padding">
                <ul class="collapsible collapsible-accordion">
                    <li>
                        <a class="collapsible-header">STEL Order <i class="material-icons">wysiwyg</i></a>
                        <div class="collapsible-body">
                            <ul>
                                <li><a href="#">Compras <i class="material-icons">shopping_cart</i></a></li>
                                <li><a href="#">Ventas <i class="material-icons">point_of_sale</i></a></li>
                                <li><a href="#">Dinero <i class="material-icons">payments</i></a></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </li>
        <?php endif ?>
    </ul>
</div>