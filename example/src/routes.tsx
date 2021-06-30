import {Routes} from 'react-auth-router';
import Layout1 from './layouts/Layout1';
import {useGuestGuard} from './guards/useGuestGuard';
import {lazy} from 'react';
import Layout2 from './layouts/Layout2';
import useAuthentication from './guards/useAuthentication';
import useAuthorization from './guards/useAuthorization';

const routes: Routes = [
    {
        path: 'v1',
        component: Layout1,
        canActivate: [useGuestGuard],
        children: [
            {
                path: 'component1',
                component: lazy(() => import('./components/Component1')),
            },
            {
                path: '',
                redirectTo: 'component1'
            }
        ]
    },
    {
        path: ':id',
        component: Layout2,
        canActivate: [useAuthentication],
        canActivateChild: [useAuthorization],
        children: [
            {
                path: 'component2',
                component: lazy(() => import('./components/Component2')),
                data: {
                   role: 2
                }
            },
            {
                path: 'component3',
                component: lazy(() => import('./components/Component3')),
            },
            {
                path: '',
                redirectTo: 'component3',
            }
        ]
    },
];

export default routes;
