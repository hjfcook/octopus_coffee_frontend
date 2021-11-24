import styles from "./UserMod.module.css";

import Button from "../Button/Button";

import { useState } from "react";
import { useHistory } from "react-router-dom";

function CoffeeMod(props) {
  const defaults = (() => {
    if (typeof props.user !== "undefined") {
      return props.user;
    } else {
      return {
        _id: "",
        email: "",
        firstName: "",
        lastName: "",
        admin: false,
      };
    }
  })();

  const [email, setEmail] = useState(defaults.email);
  const [firstName, setFirstName] = useState(defaults.firstName);
  const [lastName, setLastName] = useState(defaults.lastName);
  const [admin, setAdmin] = useState(defaults.admin);

  const history = useHistory();

  const coffeeAction = () => {
    fetch(`http://localhost:3000/api/users/${defaults._id}`, {
      method: props.type === "add" ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        firstName: firstName,
        lastName: lastName,
        admin: admin,
      }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        history.push("/admin/users");
        props.fetchData();
      });
  };

  return (
    <>
      <h1>{props.type} user</h1>
      <form className={styles.addCoffee} action="/api/user" method="POST">
        <label htmlFor="email">Email:</label>
        <input
          value={email}
          type="text"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          name="email"
          className={styles.formElement}
          required
        />
        <label htmlFor="first-name">First name:</label>
        <input
          value={firstName}
          type="text"
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          name="first-name"
          className={styles.formElement}
          required
        />
        <label htmlFor="last-name">Last name:</label>
        <input
          value={lastName}
          type="text"
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          name="last-name"
          className={styles.formElement}
          required
        />
        <label htmlFor="admin">Admin:</label>
        <select
          value={admin}
          onChange={(e) => {
            setAdmin(e.target.value === "true");
          }}
          name="country"
          className={styles.formElement}
        >
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
      </form>
      <div className={styles.buttonDiv}>
        {props.type === "edit" ? (
          <Button
            buttonClass="danger"
            onClick={() =>
              history.push("/admin/users/delete/" + props.user._id)
            }
          >
            delete
          </Button>
        ) : (
          <div></div>
        )}
        <div className={styles.rightButtons}>
          <Button
            buttonClass="secondary"
            onClick={() => history.push("/admin/users")}
          >
            cancel
          </Button>
          <Button
            buttonClass="primary"
            onClick={coffeeAction}
            style={{ marginLeft: "0.5rem" }}
          >
            save
          </Button>
        </div>
      </div>
    </>
  );
}

export default CoffeeMod;
