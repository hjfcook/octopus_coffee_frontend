import styles from "./Cart.module.css";
import PageTemplate from "../PageTemplate/PageTemplate";
import Button from "../../Components/Button/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../Contexts/CartContext.jsx";
import { displayPounds, formatURL } from "../../Utils/Utils";

// import Stripe from "stripe";
const stripe = window.Stripe(
  "pk_test_51K4MEJIYNYXoDTIhi1wrRzHLx5lsEZ8RXiWMfS81uA3DJD0iobwSEStZCxvFvq8RntsRmBESlNsNBEBJBHC5g5tv00hNeIUOjf"
);

function CartPage() {
  const cartContext = useContext(CartContext);

  let total = 0;
  if (cartContext.cart.length > 0) {
    total = cartContext.cart
      .map((item) => item.price * item.quantity)
      .reduce((prev, curr) => prev + curr);
  }

  return (
    <PageTemplate>
      <h1>your cart</h1>
      <table className={styles.cart}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cartContext.cart.map((product) => (
            <tr key={product._id}>
              <td>
                <Link to={`coffee/${formatURL(product.name)}`}>
                  {product.name}
                </Link>
              </td>
              <td>{displayPounds(product.price)}</td>
              <td>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={product.quantity}
                  onChange={(e) => {
                    cartContext.setQuantity(product, Number(e.target.value));
                  }}
                />
              </td>
              <td>{displayPounds(product.price * product.quantity)}</td>
              <td>
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  className={styles.deleteIcon}
                  onClick={() => {
                    cartContext.removeFromCart(product);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2"></td>
            <th>Total:</th>
            <td>{displayPounds(total)}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
      <div className={styles.cartButtons}>
        {/* <Button buttonClass='primary' onClick={() => {console.log(cartContext.cart)}}>checkout</Button> */}
        <Button
          buttonClass="primary"
          onClick={() => {
            fetch("http://localhost:3000/create-checkout-session", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                cart: cartContext.cart,
              }),
            })
              .then((res) => res.json())
              .then((session) => {
                console.log(session);
                return stripe.redirectToCheckout({
                  sessionId: session.id,
                });
              });
          }}
        >
          checkout
        </Button>
      </div>
    </PageTemplate>
  );
}

export default CartPage;
