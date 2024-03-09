import { MenuItem } from '@svp-models';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'Admin Base',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/chart-pie.svg',
          label: 'Dashboard',
          route: '/dashboard'
        },
        {
          icon: 'assets/icons/heroicons/outline/chart-pie.svg',
          label: 'Projects',
          route: '/project',
        },
      ],
    },
    {
      group: 'Config',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/cog.svg',
          label: 'Settings',
          route: '/settings',
        },
        {
          icon: 'assets/icons/heroicons/outline/bell.svg',
          label: 'Notifications',
          route: '/gift',
        },
      ],
    },
  ];
}
