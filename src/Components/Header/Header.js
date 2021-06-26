import styles from './Header.module.css';

function Header() {
    return (
        <nav className={styles.header}>
            <ul><li>search filters</li></ul>
            <ul>
                <li>sign up</li>
                <li>|</li>
                <li>log in</li>
                <li>|</li>
                <li>items</li>
                <li>|</li>
                <li>total</li>
                <li>|</li>
                <li>my cart</li>
            </ul>
        </nav>
    )
}

export default Header;