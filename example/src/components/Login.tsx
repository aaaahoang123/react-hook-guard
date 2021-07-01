import {useAuth} from '../guards/AuthProvider';

function Login() {
    const {login} = useAuth();

    return (
        <div>
            <h1>This is login page</h1>
            <button onClick={login}>Login</button>
        </div>
    );
}

export default Login;
