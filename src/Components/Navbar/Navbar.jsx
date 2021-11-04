import styles from './Navbar.module.css';
import {
  Link,
  useRouteMatch
} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import logo from '../../Images/logo.png';

function MenuLink({ label, to, activeOnlyWhenExact }) {
  let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact
  });

  return <Link className={match? styles.active : ''} to={to}>{label}</Link>
}

function Navbar() {
  return (
    <div className={styles.sidebar}>
      <img
        // src="https://cdn.shopify.com/s/files/1/0017/1562/t/18/assets/sqmile-img-logo-transparent@2x@2x.png?v=1623381581665049233"
        src={logo}
        alt="Square Mile Coffee Roasters"
        // width="130"
        // height="152"
        width="130"
        // height="160"
        >
      </img>
      <nav>
          <ul>
            <li><MenuLink activeOnlyWhenExact={true} to="/coffee" label='coffee' /></li>
            <li><MenuLink to="/subscriptions" label="subscriptions" /></li>
            <li><MenuLink to="/equipment" label="equipment" /></li>
            <li><MenuLink to="/merchandise" label="merchandise" /></li>
            <li><MenuLink to="/wholesale" label="wholesale" /></li>
            <li><MenuLink to="/shipping" label="shipping" /></li>
            <li><MenuLink to="/about" label="about" /></li>
          </ul>
      </nav>
      <p>
        <FontAwesomeIcon
          icon={faGithub}
        />
        &nbsp; shpongledspores
      </p>
    </div>
  );
}

export default Navbar;