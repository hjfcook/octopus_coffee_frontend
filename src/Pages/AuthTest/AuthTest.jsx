import styles from './AuthTest.module.css';
import React, { useState } from "react";

import {UserContext} from '../../Contexts/UserContext'

import Header from '../../Components/Header/Header.jsx';

function AuthTest() {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [data, setData] = useState(null);

  const userTest = React.useContext(UserContext);

  const register = () => {
    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: registerUsername,
        password: registerPassword,
      }),
      credentials: 'include'
    }).then((res) => res.text())
      .then(res => console.log(res));
  };
  const login = () => {
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: loginUsername,
        password: loginPassword,
      }),
      credentials: 'include'
    }).then((res) => res.text())
      .then(res => {
        console.log(res)
        userTest.setLoggedIn(true);
      });
    // }).then(res => res.json())
    //   .then((res) => {
    //   console.log(res);
    //   userTest.setUser(res);
    // })
  };
  const getUser = () => {
    fetch("http://localhost:3000/user", {
      method: "GET",
      headers: {'Content-Type': 'application/json'},
      credentials: 'include'
    }).then((res) => res.json())
      .then(res => {
        setData(res)
        console.log(res)
      });
  };
  const logout = () => {
    fetch("http://localhost:3000/logout", {
      method: "GET",
      headers: {'Content-Type': 'application/json'},
      credentials: 'include'
    }).then((res) => res.json())
      .then(res => {
        console.log(res)
        if (res.loggedOut) {
          userTest.setLoggedIn(false);
        }
      });
  };

  return (
    <div className="AuthTest">
      <Header />
      <div>
        <h1>Register</h1>
        <input
          placeholder="username"
          onChange={(e) => setRegisterUsername(e.target.value)}
        />
        <input
          placeholder="password"
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <button onClick={register}>Submit</button>
      </div>

      <div>
        <h1>Login</h1>
        <input
          placeholder="username"
          onChange={(e) => setLoginUsername(e.target.value)}
        />
        <input
          placeholder="password"
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <button onClick={login}>Submit</button>
      </div>

      <div>
        <h1>Get User</h1>
        <button onClick={getUser}>Submit</button>
        {data ? <h1>Welcome Back {data.username}</h1> : null}
        <button onClick={logout}>Log out</button>
      </div>
    </div>
  );
}

export default AuthTest;