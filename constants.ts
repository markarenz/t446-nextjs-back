export const roles = ['admin', 'historian'];

export const navItems = [
  {
    title: 'Alerts',
    roles: ['admin', 'historian'],
    links: [
      {
        title: 'View Alerts',
        path: '/alerts'
      },
      {
        title: 'New Alert',
        path: '/alerts/new'
      },
      {
        title: 'Publish Alerts',
        path: '/alerts/publish'
      }
    ]
  },
  {
    title: 'Pages',
    roles: ['admin'],
    links: [
      {
        title: 'View Pages',
        path: '/pages'
      },
      {
        title: 'New Page',
        path: '/pages/new'
      },
      {
        title: 'Publish Pages',
        path: '/alerts/publish'
      }
    ]
  },
  {
    title: 'Galleries',
    roles: ['admin', 'historian'],
    links: [
      {
        title: 'View Galleries',
        path: '/pages'
      },
      {
        title: 'New Gallery',
        path: '/pages/new'
      },
      {
        title: 'Publish Galleries',
        path: '/alerts/publish'
      }
    ]
  }
];

export const publishStatuses = ['draft', 'published'];
