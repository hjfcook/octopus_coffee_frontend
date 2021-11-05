import styles from './Register.module.css';
import React, { useState } from "react";
import { useHistory, Link } from 'react-router-dom';

import PageTemplate from '../PageTemplate/PageTemplate';

function Register() {
  const [registerFirstName, setRegisterFirstName] = useState("");
  const [registerLastName, setRegisterLastName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const history = useHistory();

  const register = () => {
    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        firstName: registerFirstName,
        lastName: registerLastName,
        email: registerEmail,
        password: registerPassword,
      }),
      credentials: 'include'
    }).then((res) => res.text())
      .then(res => {
        console.log(res);
        history.push('/login');
      });
  };

  return (
    <PageTemplate>
      <h1>register</h1>
      <form onSubmit={register} id='register-form' className={styles.form}>
        <fieldset>
          <label for="first-name">First name:</label>
          <input
            name='first-name'
            placeholder="first name"
            onChange={(e) => setRegisterFirstName(e.target.value)}
          />
          <label for="last-name">Last name:</label>
          <input
            name='last-name'
            placeholder="last name"
            onChange={(e) => setRegisterLastName(e.target.value)}
          />
          <label for="email">Email address:</label>
          <input
            name='email'
            placeholder="email"
            onChange={(e) => setRegisterEmail(e.target.value)}
          />
          <label for="password">Password:</label>
          <input
            name='password'
            placeholder="password"
            type='password'
            onChange={(e) => setRegisterPassword(e.target.value)}
          />
        </fieldset>
      </form>
      <div className={styles.buttonDiv}>
        <button type='submit' form='register-form'>register</button>
      </div>
      {/* <a href=''>already have an account?</a> */}
      <Link to='/login'>already have an account?</Link>
    </PageTemplate>
  );
}

export default Register;