import {Link} from 'react-router-dom';

function Component4() {
    return (
        <div>
            This is component 4
            <br/>
            <Link to={'/okla'}>
                Comeback to component 3
            </Link>
        </div>
    )
}

export default Component4;
