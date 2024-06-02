import { DashboardPage } from './pages/dashboard'
import { AuthPage } from './pages/auth'
import { Content } from './components/dashboard/Content';

const routes = [
    { path: '/auth/*', element: <AuthPage /> },
    { path: '/*', element: <DashboardPage /> },
    { path: '/shop', element: <DashboardPage menu={'shop'}/> },
    { path: '/store', element: <DashboardPage menu={'store'}/> }
];

export default routes;
