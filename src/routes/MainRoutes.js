/* eslint-disable no-unused-vars */
import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
//page routing
const Setting = Loadable(lazy(() => import('views/setting/index')));
const User = Loadable(lazy(() => import('views/users/index')));
const Report = Loadable(lazy(() => import('views/reports/index')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: 'dashboard',
            element: <DashboardDefault />
        },
        {
            path: 'setting',
            element: <Setting />
        },
        {
            path: 'report',
            element: <Report />
        },
        {
            path: 'users',
            element: <User />
        }
    ]
};

export default MainRoutes;
