import {config} from './config';

export * from './define';
export * from './utils';

export {default as RouterOutlet} from './components/RouterOutlet';
export {default as RelativeLink} from './components/RelativeLink';
export {default as useHookGuardNavigate} from './hooks/useHookGuardNavigate';
export {default as useNavigate} from './hooks/useHookGuardNavigate';

const reactHookGuard = {
    config
};

export default reactHookGuard;
