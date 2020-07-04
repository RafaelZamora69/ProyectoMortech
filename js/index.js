document.addEventListener('DOMContentLoaded', function () {
    //Sidenav para moviles
    var sideNav = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(sideNav);
    //Dropdown nav
    var dropDown = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(dropDown, {
        hover: true
    });
    //Tabs formulario login o registro 
    var tabs = document.querySelectorAll('.tabs');
    var instance = M.Tabs.init(tabs);
});