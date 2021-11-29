import styles from "./Navbar.module.css";
import { Link, useRouteMatch } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import logo from "../../Images/logo.png";
import { useState } from "react";

function MenuLink({ label, to, activeOnlyWhenExact }) {
  let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact,
  });

  return (
    <Link className={match ? styles.active : ""} to={to}>
      {label}
    </Link>
  );
}

function Navbar() {
  const [hidden, setHidden] = useState(true);
  const hide = () => {
    if (!hidden) setHidden(true);
  };

  return (
    <>
      <div
        className={styles.expandBox + ` ${hidden ? "" : styles.expanded}`}
        onClick={() => {
          setHidden((prevHidden) => !prevHidden);
        }}
      >
        {hidden ? "►" : "◄"}
      </div>
      <div className={styles.sidebar + ` ${hidden ? styles.hidden : ""}`}>
        <img src={logo} alt="Octopus Coffee Roasters" width="130"></img>
        <nav>
          <ul>
            <li onClick={hide}>
              <MenuLink
                activeOnlyWhenExact={true}
                to="/coffee"
                label="coffee"
              />
            </li>
            <li onClick={hide}>
              <MenuLink to="/subscriptions" label="subscriptions" />
            </li>
            <li onClick={hide}>
              <MenuLink to="/equipment" label="equipment" />
            </li>
            <li onClick={hide}>
              <MenuLink to="/merchandise" label="merchandise" />
            </li>
            <li onClick={hide}>
              <MenuLink to="/shipping" label="shipping" />
            </li>
            <li onClick={hide}>
              <MenuLink to="/about" label="about" />
            </li>
          </ul>
        </nav>
        <p>
          <FontAwesomeIcon icon={faGithub} />
          &nbsp; hjfcook
        </p>
      </div>
    </>
  );
}

export default Navbar;
