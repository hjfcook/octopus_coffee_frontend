import styles from './Header.module.css';

// import React, {useContext} from 'react';
// import React from 'react';
import {useContext} from 'react';
import {CartContext} from '../../Contexts/CartContext.jsx';

import Dropdown from '../Dropdown/Dropdown.jsx';

function Header(props) {

  // const context = React.useContext(CartContext);
  const context = useContext(CartContext);

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
