import styles from "./UserMod.module.css";

import Button from "../Button/Button";

import { useState } from "react";
import { useHistory } from "react-router-dom";

function CoffeeMod(props) {
  const history = useHistory();

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

  const [errors, setErrors] = useState({});
  const validateUser = () => {
    const errors = {};

    if (!email) {
      errors.email = "An email address must be supplied";
    } else if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.email = "The supplied email address must be valid";
    }
    if (!firstName) {
      errors.firstName = "A first name must be supplied";
    } else if (firstName.length > 20) {
      errors.firstName = "The supplied name must be <= 20 characters long";
    } else if (firstName.match(/[^\p{L} -]+/u)) {
      errors.firstName = "The supplied name contains invalid characters";
    }
    if (!lastName) {
      errors.lastName = "A last name must be supplied";
    } else if (lastName.length > 20) {
      errors.lastName = "The supplied name must be <= 20 characters long";
    } else if (lastName.match(/[^\p{L} -]+/u)) {
      errors.lastName = "The supplied name contains invalid characters";
    }
    if (Object.keys(errors).length === 0) {
      userAction();
    } else {
      setErrors(errors);
    }
  };

  const userAction = () => {
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
        if (res.status === "success") {
          history.push("/admin/users");
          props.fetchData();
        } else if (res.status === "fail") {
          setErrors(res.data);
        }
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
          className={
            styles.formElement +
            ` ${errors.hasOwnProperty("email") ? styles.errorElement : ""}`
          }
          required
        />
        {errors.hasOwnProperty("email") ? (
          <span className={styles.errorMessage}>{errors.email}</span>
        ) : null}
        <label htmlFor="first-name">First name:</label>
        <input
          value={firstName}
          type="text"
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          name="first-name"
          className={
            styles.formElement +
            ` ${errors.hasOwnProperty("firstName") ? styles.errorElement : ""}`
          }
          required
        />
        {errors.hasOwnProperty("firstName") ? (
          <span className={styles.errorMessage}>{errors.firstName}</span>
        ) : null}
        <label htmlFor="last-name">Last name:</label>
        <input
          value={lastName}
          type="text"
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          name="last-name"
          className={
            styles.formElement +
            ` ${errors.hasOwnProperty("lastName") ? styles.errorElement : ""}`
          }
          required
        />
        {errors.hasOwnProperty("lastName") ? (
          <span className={styles.errorMessage}>{errors.lastName}</span>
        ) : null}
        <label htmlFor="admin">Admin:</label>
        <select
          value={admin}
          onChange={(e) => {
            setAdmin(e.target.value === "true");
          }}
          name="admin"
          className={
            styles.formElement +
            ` ${errors.hasOwnProperty("admin") ? styles.errorElement : ""}`
          }
        >
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        {errors.hasOwnProperty("admin") ? (
          <span className={styles.errorMessage}>{errors.admin}</span>
        ) : null}
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
            onClick={() => {
              validateUser();
            }}
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
