import styles from "./UserAdmin.module.css";

import AdminTabs from "../../Components/AdminTabs/AdminTabs";
import DeleteItem from "../DeleteItem/DeleteItem";
import CoffeeMod from "../../Components/CoffeeMod/CoffeeMod";
import UserMod from "../../Components/UserMod/UserMod";
import Button from "../../Components/Button/Button";
import useData from "../../Hooks/useData";
import { displayPounds, formatURL } from "../../Utils/Utils";

// import {useState, useEffect, useCallback} from 'react';
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Switch, Route, useHistory } from "react-router-dom";

function UserAdmin() {
  const [
    data,
    ,
    isLoading,
    ,
    sortingField,
    setSortingField,
    ascending,
    setAscending,
    fetchData,
  ] = useData("users");

  const history = useHistory();

  function updateSorting(field) {
    if (sortingField === field) {
      setAscending((prevAscending) => !prevAscending);
    } else {
      setAscending(true);
    }
    setSortingField(field);
  }

  function selectSymbol(field) {
    if (sortingField === field) {
      if (ascending) {
        return "▲";
      } else {
        return "▼";
      }
    } else {
      return "";
    }
  }

  useEffect(() => {
    let isMounted = true;
    fetchData().then((data) => {
      if (isMounted) {
        setSortingField("email");
      }
    });
    return () => {
      isMounted = false;
    };
  }, [fetchData, setSortingField]);

  return (
    <Switch>
      <Route exact path="/admin/users">
        <h1>admin</h1>
        <AdminTabs />
        {isLoading ? (
          <p>loading...</p>
        ) : (
          <>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th
                    onClick={() => {
                      updateSorting("email");
                    }}
                  >
                    Email {selectSymbol("email")}
                  </th>
                  <th
                    onClick={() => {
                      updateSorting("firstName");
                    }}
                  >
                    First Name {selectSymbol("firstName")}
                  </th>
                  <th
                    onClick={() => {
                      updateSorting("lastName");
                    }}
                  >
                    Last Name {selectSymbol("lastName")}
                  </th>
                  <th
                    onClick={() => {
                      updateSorting("admin");
                    }}
                  >
                    Admin {selectSymbol("admin")}
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.map((user) => (
                  <tr key={user._id}>
                    <td>{user.email}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{String(user.admin)}</td>
                    <td>
                      <FontAwesomeIcon
                        icon={faEdit}
                        className={styles.icon}
                        onClick={() => {
                          history.push("/admin/users/edit/" + user._id);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* <div className={styles.buttonDiv}>
              <Button
                buttonClass="primary"
                onClick={() => {
                  history.push("/admin/coffee/add");
                }}
              >
                add coffee
              </Button>
            </div> */}
          </>
        )}
      </Route>
      {/* <Route path="/admin/coffee/add">
        <CoffeeMod type="add" fetchData={fetchData} />
      </Route> */}
      {data.map((user) => (
        <Route path={"/admin/users/edit/" + user._id} key={user._id}>
          <UserMod type="edit" user={user} fetchData={fetchData} />
        </Route>
      ))}
      {data.map((user) => (
        <Route path={"/admin/users/delete/" + user._id} key={user._id}>
          <DeleteItem itemType="users" item={user} fetchData={fetchData} />
        </Route>
      ))}
    </Switch>
  );
}

export default UserAdmin;
