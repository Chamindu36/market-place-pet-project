import { Link, Outlet } from 'react-router-dom';
import { Fragment } from 'react';

import { ReactComponent as HomeLogo } from '../../assets/crown.svg';
import './navigation.styles.scss';

const Navigation = () => {
    return (
        <Fragment>
            <div className='navigation'>
                <Link className='logo-container' to="/">
                    <HomeLogo className='logo' />
                </Link>
                <div className='nav-links-container'>
                    <Link className='nav-link' to="/shop">
                        SHOP
                    </Link>
                    <Link className='nav-link' to="/shop">
                        CART
                    </Link>
                </div>
            </div>
            <Outlet />
        </Fragment>
    )
};

export default Navigation;