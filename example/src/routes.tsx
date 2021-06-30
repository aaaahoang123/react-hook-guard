import {Routes} from 'react-auth-router';
import WithoutNavbarLayout from './layouts/WithoutNavbarLayout';
import {useGuestGuard} from './guards/useGuestGuard';
import {lazy} from 'react';
import WithNavbarLayout from './layouts/WithNavbarLayout';
import useAuthentication from './guards/useAuthentication';
import useAuthorization from './guards/useAuthorization';
import OverrideRootConfigLayout from './layouts/OverrideRootConfigLayout';
import Component4 from './components/Component4';

const routes: Routes = [
    {
        path: 'v1',
        component: WithoutNavbarLayout,
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
        path: 'v2',
        component: OverrideRootConfigLayout,
        children: [
            {
                path: 'component4',
                component: Component4,
            },
            {
                path: '',
                redirectTo: 'component4'
            }
        ]
    },
    {
        path: ':id',
        component: WithNavbarLayout,
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
    {
        path: '',
        redirectTo: 'v1'
    }
];

export default routes;
