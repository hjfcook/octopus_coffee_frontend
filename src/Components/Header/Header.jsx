import styles from './Header.module.css';

import {Link} from 'react-router-dom';
import {useContext} from 'react';

import {CartContext} from '../../Contexts/CartContext';
import {UserContext} from '../../Contexts/UserContext';

import Dropdown from '../Dropdown/Dropdown';


function Header(props) {

  const context = useContext(CartContext);
  const userTest = useContext(UserContext);

  let items = 0;
  if (context.cart.length > 0) {
    items = context.cart.map(item => item.quantity).reduce((prev, curr) => prev + curr);
  }

  let total = 0;
  if (context.cart.length > 0) {
    total = context.cart.map(item => item.price * item.quantity).reduce((prev, curr) => prev + curr);
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
          userTest.setLoggedIn(false);
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
        {/* <li>{userTest.username}</li> */}
        {/* <li>{JSON.stringify(userTest)}</li> */}
        {userTest.user.email ?
          <>
            <li>Welcome back, {userTest.user.firstName}</li>
            <li>|</li>
            {userTest.user.admin ?
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
        <li>total: {`£${((total*100)/100).toFixed(2)}`}</li>
        <li>|</li>
        <li><Link to='/cart'>your cart</Link></li>
      </ul>
    </nav>
  )
}

export default Header;