import styles from './CoffeeSpotlight.module.css';

import React, {useState} from 'react';
import {CartContext} from '../../Contexts/CartContext.jsx'

import Button from '../Button/Button';


function CoffeeSpotlight(props) {
  const [quantity, setQuantity] = useState(1);
  const cartContext = React.useContext(CartContext);

  const handleChange = (event) => {
    setQuantity(Number(event.target.value));
  }

  return (
    <div className={styles.coffeeSpotlight}>
      <div className={styles.topBlock}>
        <img src='https://images.unsplash.com/photo-1515471897120-85416077e011?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxfDB8MXxhbGx8fHx8fHx8fA&ixlib=rb-1.2.1&q=80&w=1080&utm_source=unsplash_source&utm_medium=referral&utm_campaign=api-credit' alt='coffee beans in a bag'/>
        <div className={styles.rightSection}>
          <div>
            <h1>
              {props.coffee.name}
            </h1>
            <h2>
              {props.coffee.country}
            </h2>
            <h4>
              {props.coffee.descriptors.join(', ')}
            </h4>
          </div>
          <div>
            <p>
              Process: {props.coffee.process}
            </p>
            <p>
              Roast: {props.coffee.roast}
            </p>
          </div>
          <div className={styles.priceSection}>
            <h3>
              {`£${((props.coffee.price*100)/100).toFixed(2)}`}
            </h3>
            <div>
              <label htmlFor="quantity">Quantity:</label>
              <br/>
              <select name="quantity" id="quantity" onChange={handleChange}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <Button 
              buttonClass='primary' 
              onClick={() => {
                cartContext.addToCart(props.coffee, quantity)
              }}
            >
              add to cart
            </Button>
          </div>
        </div>
      </div>
      <p className={styles.description}>
        {props.coffee.description}
      </p>
    </div>
  );
}

export default CoffeeSpotlight;