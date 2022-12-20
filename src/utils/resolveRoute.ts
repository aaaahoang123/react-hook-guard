import {NavigateOptions, RouteWithCommand} from '../define';
import routeMap from "./routeMap";

function resolveAbsoluteRedirectTo(redirectTo: string | NavigateOptions, relative?: boolean, parentCommands?: string[]) {
    // Redirect options use name will be the first case
    if (typeof redirectTo !== 'string' && redirectTo.name) {
        return undefined;
    }
    let redirectPath = typeof redirectTo === 'string'
        ? redirectTo
        : redirectTo?.path ? redirectTo.path : undefined;
    if (relative) {
        if (typeof redirectPath === 'string') {
            const redirectToCommands = [
                ...parentCommands ?? [],
                redirectPath,
            ].filter(command => !!command);
            return  '/' + redirectToCommands.join('/');
        }
        return undefined;
    }

    return redirectPath;
}

const resolveRoute = (route: RouteWithCommand, parentRoute?: RouteWithCommand, relativeMode: boolean = false): RouteWithCommand => {
    if (route.resolved) return route;

    const resolvedRoute = {...route, resolved: true};
    if (relativeMode) {
        const commands = [
            ...parentRoute?.commands ?? [],
            route.path
        ].filter(command => !!command);
        resolvedRoute.commands = commands;
        resolvedRoute.absolutePath = '/' + commands.join('/');
        if (resolvedRoute.children?.length && !resolvedRoute.path.endsWith('/*')) {
            resolvedRoute.relativePath = `${route.path}/*`;
        }
    } else {
        resolvedRoute.absolutePath = route.path;
    }

    if (resolvedRoute.redirectTo) {
        resolvedRoute.absoluteRedirectTo = resolveAbsoluteRedirectTo(resolvedRoute.redirectTo, relativeMode, parentRoute?.commands);
    }

    if (parentRoute) {
        resolvedRoute.canActivate = [...parentRoute.canActivateChild ?? [], ...route.canActivate ?? []];

        const activateChild = [...parentRoute.canActivateChild ?? [], ...route.canActivateChild ?? []];
        const duplicatedActivateChild = new Set();
        const canActivateChild = [];
        for (const activate of activateChild) {
            if (!duplicatedActivateChild.has(activate)) {
                canActivateChild.push(activate);
                duplicatedActivateChild.add(activate);
            }
        }
        resolvedRoute.canActivateChild = canActivateChild;
    }

    resolvedRoute.children = resolvedRoute.children?.map(child => resolveRoute(child, resolvedRoute, relativeMode));

    if (resolvedRoute.name) {
        routeMap.set(resolvedRoute.name, resolvedRoute);
    }

    return resolvedRoute;
}

export default resolveRoute;
