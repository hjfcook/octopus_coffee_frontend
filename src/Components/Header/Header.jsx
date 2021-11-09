import styles from './Header.module.css';

import {Link} from 'react-router-dom';
import {useContext} from 'react';

import {CartContext} from '../../Contexts/CartContext';
import {UserContext} from '../../Contexts/UserContext';

import Dropdown from '../Dropdown/Dropdown';
import {displayPounds} from '../../Utils/Utils';


function Header(props) {

  const cartContext = useContext(CartContext);
  const userContext = useContext(UserContext);

  let items = 0;
  if (cartContext.cart.length > 0) {
    items = cartContext.cart.map(item => item.quantity).reduce((prev, curr) => prev + curr);
  }

  let total = 0;
  if (cartContext.cart.length > 0) {
    total = cartContext.cart.map(item => item.price * item.quantity).reduce((prev, curr) => prev + curr);
  }

  const logout = () => {
    fetch("http://localhost:3000/logout", {
      method: "GET",
      headers: {'Content-Type': 'application/json'},
      credentials: 'include'
    }).then((res) => res.json())
      .then(res => {
        console.log(res)
        if (res.loggedOut) {
          userContext.setLoggedIn(false);
        }
      });
  };

  return (
    <nav className={styles.header}>
      <ul>
        {props.filterOptions ?
        <Dropdown name='view' sortOptions={props.filterOptions} type='submenu'/>
        : null}
        {props.sortOptions ?
        <Dropdown name='sort' sortOptions={props.sortOptions} type='menu'/>
        : null}
      </ul>
      <ul>
        {userContext.user.email ?
          <>
            <li>Welcome back, {userContext.user.firstName}</li>
            <li>|</li>
            {userContext.user.admin ?
              <>
                <li><Link to='/admin'>admin</Link></li>
                <li>|</li>
              </>
              :
              <>
              </>
            }
            <li><Link to='/account'>account</Link></li>
            <li>|</li>
            <li onClick={logout}><a href=''>log out</a></li>
          </>
          :
          <>
            <li><Link to='/register'>register</Link></li>
            <li>|</li>
            <li><Link to='/login'>log in</Link></li>
          </>
        }
        <li>|</li>
        <li>items: {items}</li>
        <li>|</li>
        <li>total: {displayPounds(total)}</li>
        <li>|</li>
        <li><Link to='/cart'>your cart</Link></li>
      </ul>
    </nav>
  )
}

export default Header;