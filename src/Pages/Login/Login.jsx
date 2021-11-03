import styles from './Login.module.css';
import React, { useState } from "react";
import { Redirect, Link } from 'react-router-dom';

import {UserContext} from '../../Contexts/UserContext'

import Header from '../../Components/Header/Header.jsx';
import Footer from '../../Components/Footer/Footer.jsx';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userTest = React.useContext(UserContext);

  const login = () => {
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      credentials: 'include'
    }).then((res) => res.text())
      .then(res => {
        console.log(res)
        if (res !== 'No User Exists') {
          userTest.setLoggedIn(true);
        }
      });
  };

  return (
    userTest.user.email ?
    <Redirect to='/account' />
    :
    <div className={styles.loginPage}>
      <Header />
      <div className={styles.loginBlock}>
        <h1>log in</h1>
        <form onSubmit={login} id='login-form'>
          <fieldset>
            <label for="email">Email address:</label>
            <input
              name='email'
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label for="password">Password:</label>
            <input
              name='password'
              placeholder="password"
              type='password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
        </form>
        <div className={styles.buttonDiv}>
          <button type='submit' form='login-form'>log in</button>
        </div>
        <Link to='/register' className={styles.spacedLink}>don't have an account yet?</Link>
        <br/>
        <Link to='/register'>forgot your password?</Link>
      </div>
      <Footer />
    </div>
  );
}

export default Login;