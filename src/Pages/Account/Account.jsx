import styles from './Account.module.css';
import React, { useState } from "react";
import {Redirect} from 'react-router-dom';

import {UserContext} from '../../Contexts/UserContext'

import PageTemplate from '../PageTemplate/PageTemplate';

function Account() {
  const userTest = React.useContext(UserContext);

  return (
    userTest.user.email ?
    <PageTemplate>
      <h1>account</h1>
      <h3>{`${userTest.user.firstName} ${userTest.user.lastName}`}</h3>
      <h3>{`${userTest.user.email}`}</h3>
    </PageTemplate>
    :
    <Redirect to='/login' />
  );
}

export default Account;