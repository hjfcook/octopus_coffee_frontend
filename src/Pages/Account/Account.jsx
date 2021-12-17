// import styles from './Account.module.css';
// import React, { useState } from "react";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { UserContext } from "../../Contexts/UserContext";

import PageTemplate from "../PageTemplate/PageTemplate";

function Account() {
  const userContext = React.useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (userContext.user) {
      if (userContext.user.loggedOut) {
        history.push("/login");
      }
    }
  }, [userContext, history]);

  return (
    <PageTemplate>
      <h1>account</h1>
      {/* {userContext.user.email ? */}
      {typeof userContext.user !== "undefined" ? (
        <>
          <h3>{`${userContext.user.firstName} ${userContext.user.lastName}`}</h3>
          <h3>{`${userContext.user.email}`}</h3>
          <p>{`${userContext.user.address}`}</p>
        </>
      ) : (
        <></>
      )}
    </PageTemplate>
  );
}

export default Account;
