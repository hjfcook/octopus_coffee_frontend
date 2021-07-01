import styles from './Header.module.css';

import React, {useContext} from 'react';
import {CartContext} from '../../Contexts/CartContext.js';

function Header() {

    const context = React.useContext(CartContext);

    return (
        <nav className={styles.header}>
            <ul><li>search filters</li></ul>
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
