import styles from "./Admin.module.css";

import PageTemplate from "../PageTemplate/PageTemplate";
import CoffeeAdmin from "../../Components/CoffeeAdmin/CoffeeAdmin";
import UserAdmin from "../../Components/UserAdmin/UserAdmin";
import AdminTabs from "../../Components/AdminTabs/AdminTabs";

// import {useState, useEffect, useCallback} from 'react';
import { useEffect } from "react";
import { Switch, Route, useHistory, Redirect } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
import { useContext } from "react";

function Admin() {
  const history = useHistory();
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (userContext.user) {
      if (!userContext.user.admin) {
        history.push("/login");
      }
    }
  }, [userContext, history]);

  return (
    <PageTemplate>
      <Switch>
        <Route exact path="/admin">
          <Redirect to="/admin/coffee" />
        </Route>
        <Route path="/admin/coffee">
          <CoffeeAdmin />
        </Route>

        <Route exact path="/admin/equipment">
          <h1>admin</h1>
          <AdminTabs />
        </Route>
        <Route exact path="/admin/merchandise">
          <h1>admin</h1>
          <AdminTabs />
        </Route>
        <Route path="/admin/users">
          {/* <h1>admin</h1>
          <AdminTabs /> */}
          <UserAdmin />
        </Route>
        {/* <Route path="/admin/*">
          <Redirect to="/admin" />
        </Route> */}
      </Switch>
    </PageTemplate>
  );
}

export default Admin;
