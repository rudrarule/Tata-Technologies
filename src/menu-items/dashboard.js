// assets
import { IconDashboard, IconSettings, IconUsers, IconReport } from '@tabler/icons';

// constant
const icons = { IconDashboard, IconSettings, IconUsers, IconReport };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'setting',
            title: 'Setting',
            type: 'item',
            url: '/setting',
            icon: icons.IconSettings,
            breadcrumbs: false
        },
        {
            id: 'report',
            title: 'Report',
            type: 'item',
            url: '/report',
            icon: icons.IconReport,
            breadcrumbs: false
        },
        {
            id: 'users',
            title: 'Users',
            type: 'item',
            url: '/users',
            icon: icons.IconUsers,
            breadcrumbs: true
        }
    ]
};

export default dashboard;
