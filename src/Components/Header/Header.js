import styles from './Header.module.css';

import React, {useContext} from 'react';
import {CartContext} from '../../Contexts/CartContext.js';

import Dropdown from '../Dropdown/Dropdown.js';

function Header(props) {

  const context = React.useContext(CartContext);

  return (
    <nav className={styles.header}>
      <ul>
        <Dropdown name='sort' sortOptions={props.sortOptions}/>
        <Dropdown name='filter' sortOptions={props.sortOptions}/>
      </ul>
      <ul>
        <li>sign up</li>
        <li>|</li>
        <li>log in</li>
        <li>|</li>
        <li>items: {context.count}</li>
        <li>|</li>
        <li>total: {`£${((context.cost*100)/100).toFixed(2)}`}</li>
        <li>|</li>
        <li>my cart</li>
      </ul>
    </nav>
  )
}

export default Header;
