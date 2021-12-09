// import styles from "./OrderConfirmation.module.css";
import styles from "../Cart/Cart.module.css";
import { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import PageTemplate from "../PageTemplate/PageTemplate";

function OrderConfirmation() {
  const [items, setItems] = useState([]);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const getItems = () => {
      fetch(`http://localhost:3000/order/success${location.search}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) =>
        res.json().then((res) => {
          console.log(res);
          if (res.status === "success") {
            // setItems(JSON.stringify(res.data));
            setItems(res.data.data);
          } else {
            history.push("/coffee");
          }
        })
      );
    };

    const query = new URLSearchParams(location.search);
    if (query.get("session_id")) {
      getItems();
    } else {
      history.push("/coffee");
    }
  }, [location, history]);

  return (
    <PageTemplate>
      <h1>Order complete</h1>
      <table className={styles.cart}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.description}</td>
              <td>£{(item.price.unit_amount / 100).toFixed(2)}</td>
              <td>{item.quantity}</td>
              <td>£{(item.amount_total / 100).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2"></td>
            <th>Total:</th>
            <td>
              £
              {(items.reduce((a, b) => a + b.amount_total, 0) / 100).toFixed(2)}
            </td>
          </tr>
        </tfoot>
      </table>
    </PageTemplate>
  );
}

export default OrderConfirmation;
