# react-hook-guard

> Implement react-route-dom with configuration

> Simple guard routers with functions

> Flexible guard routers with react hooks

> Easily to make a multiple layout react app

> Relative mode supported for config route

React Hook Guards provides angular-like to implement the [React Router](https://reacttraining.com/react-router/),
allowing you to perform complex logics in various hooks to guards your router.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Basic usage](#basic-usage)
- [Customize fallback components](#customize-fallback-components)

## Requirements

This package has the following [peer dependencies](https://docs.npmjs.com/files/package.json#peerdependencies):

- [React](https://www.npmjs.com/package/react) v17.0.2+

- [React Router DOM](https://www.npmjs.com/package/react-router-dom) v5.2.0+

## Installation

With [npm](https://www.npmjs.com):

```shell
$ npm install react-hook-guard
```

With [yarn](https://yarnpkg.com/):

```shell
$ yarn add react-hook-guard
```

Then with a module bundler like [webpack](https://webpack.github.io/), use as you would anything else:

```js
// using ES6 modules
import {RouterOutlet} from 'react-hook-guard';

// using CommonJS modules
const RouterOutlet = require('react-hook-guard').RouterOutlet;
```

## Basic usage

Here is a very basic example of how to use React Hook Guard.

```tsx
// App.tsx
import {Route, Routes, WithRouteProps, RouterOutlet} from 'react-hook-guard';
import {lazy, useContext, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router';

function WithoutNavbarLayout({...props}: any) {
    return (
        <div className={'container'}>
            {/* Pass all other props here to extends the relative path from parent */}
            <RouterOutlet {...props}/>
        </div>
    );
}

function WithNavbarLayout({...props}: any) {
    return (
        <div className={'container'}>
            <nav className={'nav-bar'}>
                <Link to={'/dashboard'}>Dashboard</Link>
                <Link to={'/info'}>Info</Link>
            </nav>
            <RouterOutlet {...props} />
        </div>
    );
}

const fakeUser = {name: 'Smith', role: 'admin'};

function useAuthenticationGuard() {
    // Retrieve auth data from any where, with any hooks to authentication

    // const user = useSelector(state => state.user);
    // const user = useContext(userContext);
    const [user] = useState(fakeUser);
    return !!user;
}

function useGuestGuard() {
    // Share the same resource data with authentication guard
    const [user] = useState(fakeUser);
    const history = useHistory();

    // use history to intercept when user logged in.
    // Should wrap the code in useEffect hooks to avoid some render problems.
    useEffect(() => {
        if (user) {
            history.push('/dashboard');
        }
    }, [user]);
    
    return !user;
}

function useAuthorizationGuard(route: Route) {
    const [user] = useState(fakeUser);
    // Use role from route config to dynamic authorization
    return !!user && route.data?.role && user.role === route.data?.role;
}

const appRoutes: Routes = [
    {
        path: 'auth', // Please, do not write root route such as '/auth' to use relativeMode
        component: WithoutNavbarLayout,
        canActivate: [useGuestGuard],
        children: [
            {
                path: 'login',
                component: lazy(() => import('./features/auth/login')),
                data: {title: 'Login'}
            },
            {path: '', redirectTo: 'login'} // redirect relative with the parent path, you can use `absoluteRedirectTo` property instead for absolute path
        ]
    },
    {
        path: '',
        component: WithNavbarLayout,
        canActivate: [useAuthenticationGuard],
        // Auto extend the guard to `canActivate` of every children
        // Because each child route will have different role requirements
        canActivateChild: [useAuthorizationGuard],
        children: [
            {
                path: 'dashboard',
                component: lazy(() => import('./features/dashboard')),
                data: {role: 'admin'}
            },
            {path: 'info', component: lazy(() => import('./features/info'))},
            {path: '', redirectTo: 'dashboard'}
        ]
    },
];

function App() {
    // Ignore relativeMode property if you want to use absolute route paths
    return <RouterOutlet routes={appRoutes} relativeMode={true}/>;
}
```

## Customize fallback components

By default, react-hook-guard will not redirect you to any other route, if the guard functions return false, a default
empty component will be returned

```tsx
function RouteFallback() {
    return (
        <div/>
    );
}

export default RouteFallback;
```

To customize this, please create your own custom component, and then config it in `index.tsx` or `index.js` file.

```tsx
function SuspenseFallback() {
    return (
        <div>
            Loading...
        </div>
    );
}

function CantActivateFallback() {
    return (
        <div>
            You can not access this page
        </div>
    );
}

// index.tsx
import reactHookGuard from 'react-hook-guard';

reactHookGuard.config({
    // Suspense component will be use to Suspense the lazyload components
    SuspenseFallback,
    // Can't Activate component will be use when the route can not be access
    CantActivateFallback
});

// More codes here
```
