import RouterFallback from './components/RouterFallback';
import {AuthRouterConfigOptions, RouterGuardExtraRoutes} from './define';

export let fallbackComponents: AuthRouterConfigOptions = {
    SuspenseFallback: RouterFallback,
    CantActivateFallback: RouterFallback
};

export let extraRoutes: RouterGuardExtraRoutes = {
};

export const config = (options: Partial<AuthRouterConfigOptions> & Partial<RouterGuardExtraRoutes>) => {
    fallbackComponents.CantActivateFallback = options.CantActivateFallback ?? fallbackComponents.CantActivateFallback;
    fallbackComponents.SuspenseFallback = options.SuspenseFallback ?? fallbackComponents.SuspenseFallback;
    extraRoutes.matchAllRoute = options.matchAllRoute;
};
