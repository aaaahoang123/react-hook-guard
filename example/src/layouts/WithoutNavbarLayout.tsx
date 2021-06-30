import {RouterOutlet} from 'react-hook-guard';

function WithoutNavbarLayout(props: any) {
    return (
        <>
            <p>This is Layout without navbar layout</p>
            <p>The layout design for login, register,... and other components that do not need routing</p>
            <div>
                <RouterOutlet {...props}/>
            </div>
        </>
    );
}

export default WithoutNavbarLayout;
