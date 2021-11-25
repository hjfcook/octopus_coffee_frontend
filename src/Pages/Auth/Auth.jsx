import styles from "./Auth.module.css";
import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";

import PageTemplate from "../PageTemplate/PageTemplate";
import { UserContext } from "../../Contexts/UserContext";
import Button from "../../Components/Button/Button";

function Auth(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  const userContext = React.useContext(UserContext);

  const register = (event) => {
    event.preventDefault();
    fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.status === "success") {
          history.push("/login");
        }
      });
  };

  const login = (event) => {
    event.preventDefault();
    fetch("http://localhost:3000/api/auth/login", {
      // fetch("192.168.0.23:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
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

  useEffect(() => {
    if (userContext.user) {
      if (userContext.user.email) {
        history.push("/account");
      }
    }
  }, [userContext, history]);

  return (
    <PageTemplate>
      <h1>{props.type}</h1>
      <form
        onSubmit={props.type === "register" ? register : login}
        id="form"
        className={styles.form}
      >
        <fieldset>
          {props.type === "register" ? (
            <>
              <label htmlFor="first-name">First name:</label>
              <input
                name="first-name"
                placeholder="first name"
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <label htmlFor="last-name">Last name:</label>
              <input
                name="last-name"
                placeholder="last name"
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </>
          ) : (
            <></>
          )}
          <label htmlFor="email">Email address:</label>
          <input
            name="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            name="password"
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={
              props.type === "register" ? "new-password" : "current-password"
            }
            required
          />
        </fieldset>
      </form>
      <div className={styles.buttonDiv}>
        <Button buttonClass="primary" type="submit" form="form">
          {props.type}
        </Button>
        {/* <Button buttonClass='primary' type='button' onClick={props.type === 'register' ? register : login}>{props.type}</Button> */}
        {/* <Button buttonClass='primary' type='submit' onClick={props.type === 'register' ? register : login}>{props.type}</Button> */}
      </div>
      {props.type === "register" ? (
        <Link to="/login">already have an account?</Link>
      ) : (
        <>
          <Link to="/register" className={styles.spacedLink}>
            don't have an account yet?
          </Link>
          <br />
          <Link to="/register">forgot your password?</Link>
        </>
      )}
    </PageTemplate>
  );
}

export default Auth;
