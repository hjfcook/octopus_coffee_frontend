import styles from "./DeleteItem.module.css";

import Button from "../Button/Button";
import { formatURL } from "../../Utils/Utils";

import { useHistory } from "react-router-dom";

function DeleteItem(props) {
  const history = useHistory();

  const deleteItem = () => {
    fetch(`http://localhost:3000/api/${props.itemType}/${props.item._id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify({
      // }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.status === "success") {
          history.push(`/admin/${props.itemType}`);
          props.fetchData();
        }
      });
  };

  return (
    <>
      {/* <h1>add coffee</h1> */}
      <h2>are you sure you want to delete this {props.itemType}?</h2>
      <h3>this action CANNOT be undone</h3>
      <div className={styles.buttonDiv}>
        <Button
          buttonClass="secondary"
          onClick={() => {
            if (props.itemType === "user") {
              history.push(`/admin/${props.itemType}/edit/` + props.item._id);
            } else {
              history.push(
                `/admin/${props.itemType}/edit/` + formatURL(props.item.name)
              );
            }
          }}
        >
          cancel
        </Button>
        <Button buttonClass="danger" onClick={deleteItem}>
          delete
        </Button>
      </div>
    </>
  );
}

export default DeleteItem;
