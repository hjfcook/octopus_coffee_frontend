import styles from './Account.module.css';
import React, { useState } from "react";
import {Redirect} from 'react-router-dom';

import {UserContext} from '../../Contexts/UserContext'

import Header from '../../Components/Header/Header.jsx';
import Footer from '../../Components/Footer/Footer.jsx';

function Account() {
  const userTest = React.useContext(UserContext);

  return (
    userTest.user.email ?
    <div className={styles.accountPage}>
      <Header />
      <div className={styles.accountBlock}>
        <h1>account</h1>
        <h3>{`${userTest.user.firstName} ${userTest.user.lastName}`}</h3>
        <h3>{`${userTest.user.email}`}</h3>
      </div>
      <Footer />
    </div>
    :
    <Redirect to='/login' />
  );
}

export default Account;