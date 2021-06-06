import RouterFallback from './components/RouterFallback';
import {AuthRouterConfigOptions} from './define';

export let fallbackComponents: AuthRouterConfigOptions = {
    SuspenseFallback: RouterFallback,
    CantActivateFallback: RouterFallback
};

export const config = (options: Partial<AuthRouterConfigOptions>) => {
    fallbackComponents.CantActivateFallback = options.CantActivateFallback ?? fallbackComponents.CantActivateFallback;
    fallbackComponents.SuspenseFallback = options.SuspenseFallback ?? fallbackComponents.SuspenseFallback;
};
