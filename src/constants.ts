export const roles = ['admin', 'historian'];

export const navItems = [
  {
    title: 'Alerts',
    id: 0,
    roles: ['admin', 'historian'],
    path: '/alerts/1'
  },
  {
    title: 'Pages',
    id: 1,
    roles: ['admin'],
    path: '/pages/1'
  },
  {
    title: 'Galleries',
    id: 2,
    roles: ['admin', 'historian'],
    path: '/galleries/1'
  },
  {
    title: 'Assets',
    id: 3,
    roles: ['admin', 'historian'],
    path: '/assets'
  },
  {
    title: 'Tools',
    id: 4,
    roles: ['admin'],
    path: '/tools'
  }
];

export const statusOptions = [
  {
    label: 'Inactive',
    value: 'inactive'
  },
  {
    label: 'Active',
    value: 'active'
  }
];
