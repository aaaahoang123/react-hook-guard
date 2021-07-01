import {Link} from 'react-router-dom';

const NotFound = () => {
    return (
        <>
            <div>Not Found any thing here</div>
            <div>
                <Link to={'/'}>Home</Link>
            </div>
        </>

    );
}

export default NotFound;