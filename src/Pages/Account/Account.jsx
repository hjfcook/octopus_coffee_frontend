// import styles from './Account.module.css';
// import React, { useState } from "react";
import React from "react";
import {Redirect} from 'react-router-dom';

import {UserContext} from '../../Contexts/UserContext'

import PageTemplate from '../PageTemplate/PageTemplate';

function Account() {
  const userContext = React.useContext(UserContext);

  return (
    userContext.user.email ?
    <PageTemplate>
      <h1>account</h1>
      <h3>{`${userContext.user.firstName} ${userContext.user.lastName}`}</h3>
      <h3>{`${userContext.user.email}`}</h3>
    </PageTemplate>
    :
    <Redirect to='/login' />
  );
}

export default Account;