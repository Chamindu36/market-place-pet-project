import { Outlet } from 'react-router-dom';
import { Fragment, useContext } from 'react';

import { ReactComponent as HomeLogo } from '../../assets/crown.svg';
import { LogoContainer, NavLink, NavLinks, NavigationContainer } from './navigation.styles.jsx';
import { UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { CartContext } from '../../contexts/cart.context';

const Navigation = () => {

    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext)

    const signOutHandler = async () => {
        await signOutUser();
    }

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to="/">
                    <HomeLogo className='logo' />
                </LogoContainer>
                <NavLinks>
                    <NavLink to="/shop">
                        SHOP
                    </NavLink>
                    {
                        currentUser ? (
                            <NavLink as span onClick={signOutHandler}>SIGN OUT</NavLink>
                        ) : <NavLink to="/auth">
                            SIGN-IN
                        </NavLink>
                    }
                    <CartIcon />
                </NavLinks>
                {isCartOpen && <CartDropdown />}
            </NavigationContainer>
            <Outlet />
        </Fragment>
    )
};

export default Navigation;