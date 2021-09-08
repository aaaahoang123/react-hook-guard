import {Route, RouteWithCommand} from '../../define';
import {resolveRoute} from '../../utils';

test('Test resolve absolute without parent', () => {
    const absoluteRoute: Route = {
        path: '/',
    };

    expect(resolveRoute(absoluteRoute))
        .toEqual({
            path: '/',
            absolutePath: '/',
        });
});

test('Test resolve relative route without parent', () => {
    const relativeRoute: Route = {
        path: '',
    };

    expect(resolveRoute(relativeRoute, undefined, true))
        .toEqual({
            path: '',
            absolutePath: '/',
            commands: [],
        });
});

test('Test resolve absolute route with parent', () => {
    const parentRoute: Route = {
        path: '/',
    };

    const absoluteRoute: Route = {
        path: '/',
    };

    expect(resolveRoute(absoluteRoute, parentRoute))
        .toEqual({
            path: '/',
            absolutePath: '/',
            canActivate: [],
        });
});

test('Test resolve relative route with parent', () => {
    const parentRoute: RouteWithCommand = {
        path: '',
        commands: [],
        absolutePath: '/'
    };

    const relativeRoute: Route = {
        path: '',
    };

    expect(resolveRoute(relativeRoute, parentRoute, true))
        .toEqual({
            path: '',
            commands: [],
            absolutePath: '/',
            canActivate: [],
        });
});


const useTestCanActivate = () => {
    return true;
};

test('Test copy canActivateChild from parent', () => {
    const parentRoute: RouteWithCommand = {
        path: '',
        canActivateChild: [useTestCanActivate],
    };

    const route: Route = {
        path: ''
    };

    expect(resolveRoute(route, parentRoute, true))
        .toEqual({
            path: '',
            absolutePath: '/',
            commands: [],
            canActivate: [useTestCanActivate],
        })
});