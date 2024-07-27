import { Navigate, createBrowserRouter } from 'react-router-dom';
import App from './App';
import Login from './views/Login';
import Signup from './views/Signup';
import Users from './views/Users';
import Dashboard from './views/Dashboard';
import NotFound from './views/NotFound';
import DefaultLayout from './components/DefaultLayout';
import GuestLayout from './components/GuestLayout';
import UserForm from './views/UserForm';

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            // {
            //     path: '/',
            //     element: <Users />
            // },
            {
                path: '/',
                element: <Navigate to='/users' />
            },
            {
                path: '/Dashboard',
                element: <Dashboard />
            },
            {
                path: '/Users',
                element: <Users />
            },
            {
                path: '/users/create',
                element: <UserForm key="userCreate" />
            },
            {
                path: '/Users/:id',
                element: <UserForm  key="userUpdate" />
            },
        ]
    },

    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
        
            {
                path: '/signUp',
                element: <Signup />
            },
        ]
    },


    {
        path: '*',
        element: <NotFound />
    },

])

export default router;