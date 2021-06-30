import {config} from './config';

export * from './define';
export * from './utils';

export {default as RouterOutlet} from './components/RouterOutlet';

const reactHookGuard = {
    config
};

export default reactHookGuard;
