const getMenu = ( role = 'USER_ROLE') => {

    const menu =  [
        {
          title: 'Escritorio',
          icon: 'nav-icon fas fa-tachometer-alt',
          submenu: [
            { title: 'Panel', url: '/'},
            { title: 'Ventas', url: 'sales'},
            { title: 'Progreso', url: 'progress'},
            { title: 'Gráficas', url: 'grafic1'},
            { title: 'Promesas', url: 'promesas'},
            { title: 'Rxjs', url: 'rxjs'},
          ]
        },
        {
          title: 'Mantenimiento',
          icon: 'nav-icon fas fa-toolbox',
          submenu: [
            // { title: 'Usuarios', url: 'users'},
            { title: 'Clientes', url: 'customers'},
            { title: 'Proyectos', url: 'projects'},
            { title: 'Empresas', url: 'companies'},
          ]
        }
      ];

      if ( role === 'ADMIN_ROLE'){
          menu[1].submenu.unshift({ title: 'Usuarios', url: 'users'})
      }

      return menu;
}

module.exports = {
    getMenu
}