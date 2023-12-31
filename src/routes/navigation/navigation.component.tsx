import { Outlet } from 'react-router-dom';
import { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ReactComponent as HomeLogo } from '../../assets/crown.svg';
import { LogoContainer, NavLink, NavLinks, NavigationContainer } from './navigation.styles';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { selectCurrentUser } from '../../store/user/user.selector'
import { selectIsCartOpen } from '../../store/cart/cart.selector';

import { signOutStart } from '../../store/user/user.action';

const Navigation = () => {
    const dispatch = useDispatch();

    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);

    const signOutUser = () => dispatch(signOutStart());


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
                            <NavLink to='/' as='span' onClick={signOutUser}>
                                SIGN OUT
                            </NavLink>
                        ) : <NavLink to="/auth">
                            SIGN IN
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