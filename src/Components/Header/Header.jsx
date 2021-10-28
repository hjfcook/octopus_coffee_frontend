import styles from './Header.module.css';

import {Link} from 'react-router-dom';
import {useContext} from 'react';
import {CartContext} from '../../Contexts/CartContext.jsx';

import Dropdown from '../Dropdown/Dropdown.jsx';

function Header(props) {

  const context = useContext(CartContext);

  let items = 0;
  if (context.cart.length > 0) {
    items = context.cart.map(item => item.quantity).reduce((prev, curr) => prev + curr);
  }

  let total = 0;
  if (context.cart.length > 0) {
    total = context.cart.map(item => item.price * item.quantity).reduce((prev, curr) => prev + curr);
  }

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
        <li>sign up</li>
        <li>|</li>
        <li>log in</li>
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