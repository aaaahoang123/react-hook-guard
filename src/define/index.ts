import {ComponentType} from 'react';
import {RouteComponentProps} from 'react-router';

/**
 * The guard Fn that return boolean, declare to display the route or not.
 *
 * The guard can be custom hooks, that retrieve data from multiple resources, e.g: redux stores, providers, recoil state,...
 * If the guard return false, the content of route will be intercept to display
 */
export declare type GuardFn = (route: Route) => boolean;

export interface Route<D = any> {
    /**
     * Path of the route
     */
    path: string;
    /**
     * Component to render the route
     */
    component?: ComponentType<RouteComponentProps<any>> | ComponentType<any>;
    /**
     * Link to redirect if match route
     */
    redirectTo?: string;
    /**
     * Redirect to the absolute path if match route
     */
    redirectExactTo?: string;
    /**
     * The guard functions for route
     */
    canActivate?: GuardFn[];
    /**
     * The guard functions for children of the route
     *
     * These guard will be automatic binding to canActivate of the children route configs when render
     */
    canActivateChild?: GuardFn[];
    /**
     * The more config of the route will be accept here.
     *
     * These will pass along with the route, as props when render.
     * Data can be used to process authorization when combine with guards
     */
    data?: D;
    /**
     * The children route
     */
    children?: Routes;
    /**
     * Match exact the route when render
     */
    exact?: boolean;
}

export declare type Routes<D = any> = Route<D>[];

export declare type RouteWithCommand<D = any> = Route<D> & {
    commands?: string[];
};

export interface WithRouteProps {
    route: Route
}

export interface WithRoutesProps {
    routes?: Routes;
    className?: string;
}

export interface AuthRouterConfigOptions {
    SuspenseFallback?: ComponentType<RouteComponentProps<any>> | ComponentType<any>;
    CantActivateFallback?: ComponentType<RouteComponentProps<any>> | ComponentType<any>;
}
