import styles from "./CoffeeAdmin.module.css";

import AdminTabs from "../../Components/AdminTabs/AdminTabs";
import DeleteItem from "../DeleteItem/DeleteItem";
import CoffeeMod from "../../Components/CoffeeMod/CoffeeMod";
import Button from "../../Components/Button/Button";
import useCoffee from "../../Hooks/useCoffee";
import { displayPounds, formatURL } from "../../Utils/Utils";

// import {useState, useEffect, useCallback} from 'react';
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Switch, Route, useHistory } from "react-router-dom";

function CoffeeAdmin() {
  const [
    coffeeProducts,
    ,
    isLoading,
    ,
    sortingField,
    setSortingField,
    ascending,
    setAscending,
    fetchData,
  ] = useCoffee();

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
        setSortingField("name");
      }
    });
    return () => {
      isMounted = false;
    };
  }, [fetchData, setSortingField]);

  return (
    <Switch>
      <Route exact path="/admin/coffee">
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
                      updateSorting("name");
                    }}
                  >
                    Name {selectSymbol("name")}
                  </th>
                  <th
                    onClick={() => {
                      updateSorting("country");
                    }}
                  >
                    Country {selectSymbol("country")}
                  </th>
                  <th
                    onClick={() => {
                      updateSorting("process");
                    }}
                  >
                    Process {selectSymbol("process")}
                  </th>
                  <th
                    onClick={() => {
                      updateSorting("price");
                    }}
                  >
                    Price {selectSymbol("price")}
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {coffeeProducts.map((product) => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{product.country}</td>
                    <td>{product.process}</td>
                    <td>{displayPounds(product.price)}</td>
                    <td>
                      <FontAwesomeIcon
                        icon={faEdit}
                        className={styles.icon}
                        onClick={() => {
                          history.push(
                            "/admin/coffee/edit/" + formatURL(product.name)
                          );
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={styles.buttonDiv}>
              <Button
                buttonClass="primary"
                onClick={() => {
                  history.push("/admin/coffee/add");
                }}
              >
                add coffee
              </Button>
            </div>
          </>
        )}
      </Route>
      <Route path="/admin/coffee/add">
        <CoffeeMod type="add" fetchData={fetchData} />
      </Route>
      {coffeeProducts.map((product) => (
        <Route
          path={"/admin/coffee/edit/" + formatURL(product.name)}
          key={product._id}
        >
          <CoffeeMod type="edit" coffee={product} fetchData={fetchData} />
        </Route>
      ))}
      {coffeeProducts.map((product) => (
        <Route path={"/admin/coffee/delete/" + product._id} key={product._id}>
          <DeleteItem itemType="coffee" item={product} fetchData={fetchData} />
        </Route>
      ))}
    </Switch>
  );
}

export default CoffeeAdmin;
