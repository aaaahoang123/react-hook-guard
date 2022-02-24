import {RouteWithCommand} from '../define';

const resolveRoute = (route: RouteWithCommand, parentRoute?: RouteWithCommand, relativeMode: boolean = false): RouteWithCommand => {
    const resolvedRoute = {...route};
    if (relativeMode) {
        const commands = [
            ...parentRoute?.commands ?? [],
            route.path
        ].filter(command => !!command);
        resolvedRoute.commands = commands;
        resolvedRoute.absolutePath = '/' + commands.join('/');
        if (typeof route.redirectTo === 'string') {
            const redirectToCommands = [
                ...parentRoute?.commands ?? [],
                route.redirectTo,
            ].filter(command => !!command);
            resolvedRoute.absoluteRedirectTo = '/' + redirectToCommands.join('/');
        }
    } else {
        resolvedRoute.absolutePath = route.path;
        resolvedRoute.absoluteRedirectTo = resolvedRoute.redirectTo;
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

    return resolvedRoute;
}

export default resolveRoute;
