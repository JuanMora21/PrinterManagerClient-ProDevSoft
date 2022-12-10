import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Users',
    icon: 'person-outline',
    link: '/pages/users/list',
/*     children: [
      {
        title: 'list',
        link: '/pages/users/list',
      },
      {
        title: 'create',
        link: '/pages/users/create',
      },
    ] */
  },
  {
    title: 'Profiles',
    icon: 'people-outline',
    link: '/pages/profiles/list',
  },
  {
    title: 'Libraries',
    icon: 'book-outline',
    link: '/pages/libraries/list',
  },
  {
    title: 'Categories',
    icon: 'copy-outline',
    link: '/pages/categories/list',
  },
  {
    title: 'Archives',
    icon: 'file-outline',
    link: '/pages/archives/list',
  },
  {
    title: 'Printers',
    icon: 'printer-outline',
    link: '/pages/printers/list',
  },
  {
    title: 'Reservations',
    icon: 'save-outline',
    link: '/pages/reservations/list',
  },
  {
    title: 'Tasks',
    icon: 'plus-square-outline',
    link: '/pages/tasks/list',
  },
  
  
];
