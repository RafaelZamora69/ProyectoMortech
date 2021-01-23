document.addEventListener('DOMContentLoaded', function () {
    //Sidenav para moviles
    var sideNav = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(sideNav);
    //Tabs formulario login o registro 
    var tabs = document.querySelectorAll('.tabs');
    var instance = M.Tabs.init(tabs);
    var elems = document.querySelectorAll('.collapsible');
    var collapsible = M.Collapsible.init(elems);
});