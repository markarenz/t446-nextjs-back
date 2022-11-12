export const roles = ['admin', 'historian'];

export const navItems = [
  {
    title: 'Alerts',
    id: 0,
    roles: ['admin', 'historian'],
    links: [
      {
        title: 'View Alerts',
        path: '/alerts/1'
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
    id: 1,
    roles: ['admin'],
    links: [
      {
        title: 'View Pages',
        path: '/pages/1'
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
    id: 2,
    roles: ['admin', 'historian'],
    links: [
      {
        title: 'View Galleries',
        path: '/galleries/1'
      },
      {
        title: 'New Gallery',
        path: '/galleries/new'
      },
      {
        title: 'Publish Galleries',
        path: '/galleries/publish'
      }
    ]
  },
  {
    title: 'Assets',
    id: 3,
    roles: ['admin', 'historian'],
    links: [
      {
        title: 'View Assets',
        path: '/assets'
      }
    ]
  },
  {
    title: 'Tools',
    id: 4,
    roles: ['admin'],
    links: [
      {
        title: 'Tool 1',
        path: '/tool1'
      },
      {
        title: 'Tool 2',
        path: '/tool2'
      }
    ]
  }
];

export const publishStatuses = ['draft', 'published'];
