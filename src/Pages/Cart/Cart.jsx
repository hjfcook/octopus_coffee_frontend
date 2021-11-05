import styles from './Cart.module.css';
import PageTemplate from '../PageTemplate/PageTemplate';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import {Link} from 'react-router-dom';
import {useContext} from 'react';
import {CartContext} from '../../Contexts/CartContext.jsx';

function CartPage() {
  const context = useContext(CartContext);

  let total = 0;
  if (context.cart.length > 0) {
    total = context.cart.map(item => item.price * item.quantity).reduce((prev, curr) => prev + curr);
  }

  return (
    <PageTemplate> 
      <h1>
        your cart
      </h1>
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
          {context.cart.map(product => (
            <tr key={product._id}>
              <td>
                <Link to={`coffee/${product.name.toLowerCase().replace(/ /g, '-')}`}>{product.name}</Link>
              </td>
              <td>
                {`£${((product.price*100)/100).toFixed(2)}`}
              </td>
              <td>
                <input 
                  type="number" 
                  min="1" 
                  max="30" 
                  value={product.quantity} 
                  onChange={(e) => {context.setQuantity(product, Number(e.target.value))}}
                />
              </td>
              <td>
                {`£${((product.price*product.quantity*100)/100).toFixed(2)}`}
              </td>
              <td>
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  className={styles.deleteIcon}
                  onClick={() => {context.removeFromCart(product)}}
                />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2">
            </td>
            <th>
              Total:
            </th>
            <td>
              {`£${((total*100)/100).toFixed(2)}`}
            </td>
            <td></td>
          </tr>
        </tfoot>
      </table>
      <div className={styles.cartButtons}>
        {/* <button>update</button> */}
        <button className={styles.mainButton} onClick={() => {console.log(context.cart)}}>checkout</button>
      </div>
    </PageTemplate>
  );
}

export default CartPage;