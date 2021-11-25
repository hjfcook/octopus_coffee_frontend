import styles from "./Header.module.css";

import { Link } from "react-router-dom";
import { useContext, useState } from "react";

import { CartContext } from "../../Contexts/CartContext";
import { UserContext } from "../../Contexts/UserContext";

import Dropdown from "../Dropdown/Dropdown";
import { displayPounds } from "../../Utils/Utils";

function Header(props) {
  const cartContext = useContext(CartContext);
  const userContext = useContext(UserContext);

  const [hidden, setHidden] = useState(true);

  let items = 0;
  if (cartContext.cart.length > 0) {
    items = cartContext.cart
      .map((item) => item.quantity)
      .reduce((prev, curr) => prev + curr);
  }

  let total = 0;
  if (cartContext.cart.length > 0) {
    total = cartContext.cart
      .map((item) => item.price * item.quantity)
      .reduce((prev, curr) => prev + curr);
  }

  const logout = () => {
    fetch("http://localhost:3000/api/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.status === "success") {
          userContext.getUser();
        }
      });
  };

  return (
    <>
      <div
        className={styles.expandBox + ` ${hidden ? "" : styles.expanded}`}
        onClick={() => {
          setHidden((prevHidden) => !prevHidden);
        }}
      >
        {hidden ? "☰" : "✖"}
      </div>
      <nav className={styles.header}>
        <ul>
          {props.filterOptions ? (
            <Dropdown
              name="view"
              sortOptions={props.filterOptions}
              childType="menu"
              level="top"
            />
          ) : null}
          {props.sortOptions ? (
            <Dropdown
              name="sort"
              sortOptions={props.sortOptions}
              childType="button"
              level="top"
            />
          ) : null}
        </ul>
        <ul className={styles.siteItems + ` ${hidden ? styles.hidden : ""}`}>
          {userContext.user && !userContext.user.loggedOut ? (
            <>
              <li className={styles.welcome}>
                Welcome back, {userContext.user.firstName}
              </li>
              <li className={styles.welcome}>|</li>
              {userContext.user.admin ? (
                <>
                  <li>
                    <Link to="/admin">admin</Link>
                  </li>
                  <li className={styles.divider}>|</li>
                </>
              ) : (
                <></>
              )}
              <li>
                <Link to="/account">account</Link>
              </li>
              <li className={styles.divider}>|</li>
              <button onClick={logout}>log out</button>
            </>
          ) : (
            <>
              <li>
                <Link to="/register">register</Link>
              </li>
              <li className={styles.divider}>|</li>
              <li>
                <Link to="/login">log in</Link>
              </li>
            </>
          )}
          <li className={styles.divider}>|</li>
          <li>items: {items}</li>
          <li className={styles.divider}>|</li>
          <li>total: {displayPounds(total)}</li>
          <li className={styles.divider}>|</li>
          <li>
            <Link to="/cart">your cart</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Header;
