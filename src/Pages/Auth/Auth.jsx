import styles from './Auth.module.css';
import React, { useState } from "react";
import { useHistory, Link, Redirect } from 'react-router-dom';

import PageTemplate from '../PageTemplate/PageTemplate';
import {UserContext} from '../../Contexts/UserContext'
import Button from '../../Components/Button/Button';

function Auth(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  const userContext = React.useContext(UserContext);

  const register = () => {
    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      }),
      credentials: 'include'
    }).then((res) => res.text())
      .then(res => {
        console.log(res);
        console.log('yes');
        history.push('/login');
      });
  };

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
          userContext.setLoggedIn(true);
        }
      });
  };

  return (
    userContext.user.email ?
    <Redirect to='/account' />
    :
    <PageTemplate>
      <h1>{props.type}</h1>
      <form
        onSubmit={props.type === 'register' ? register : login}
        id='form'
        className={styles.form}
      >
        <fieldset>
          {props.type === 'register' ?
            <>
              <label htmlFor="first-name">First name:</label>
              <input
                name='first-name'
                placeholder="first name"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <label htmlFor="last-name">Last name:</label>
              <input
                name='last-name'
                placeholder="last name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </>
          :
            <></>
          }
          <label htmlFor="email">Email address:</label>
          <input
            name='email'
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete='email'
          />
          <label htmlFor="password">Password:</label>
          <input
            name='password'
            placeholder="password"
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={props.type === 'register' ? 'new-password' : 'current-password'}
          />
        </fieldset>
      </form>
      <div className={styles.buttonDiv}>
        <Button buttonClass='primary' type='submit' form='form'>{props.type}</Button>
      </div>
      {props.type === 'register' ?
        <Link to='/login'>already have an account?</Link>
      :
        <>
          <Link to='/register' className={styles.spacedLink}>don't have an account yet?</Link>
          <br/>
          <Link to='/register'>forgot your password?</Link>
        </>
      }
    </PageTemplate>
  );
}

export default Auth;