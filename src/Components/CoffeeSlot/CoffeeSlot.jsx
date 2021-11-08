import styles from './CoffeeSlot.module.css';
import React, {useState} from 'react';

import Button from '../Button/Button';
import {CartContext} from '../../Contexts/CartContext.jsx'
import { useHistory } from 'react-router-dom';

function CoffeeSlot(props) {
  const [hovered, setHovered] = useState(false);

  const hoverHandler = () => {
    setHovered(prevHovered => !prevHovered);
  }

  const cartContext = React.useContext(CartContext);
  const history = useHistory();

  return (
    <div
      className={styles.coffeeSlot + ` ${hovered ? styles.slotHovered : ''}`}
      onMouseEnter={hoverHandler}
      onMouseLeave={hoverHandler}
    >
      <div className={styles.coffeeInfo + ` ${hovered ? styles.infoHovered : ''}`}>
        <div>
          <div className={styles.coffeeName}>
            {props.coffee.name}
          </div>
          <div className={styles.coffeeOrigin}>
            {props.coffee.country}
          </div>
        </div>
        <div className={styles.coffeeDescriptors}>
          {props.coffee.descriptors.join(', ')}
        </div>
        <div className={styles.coffeePrice}>
          {`£${((props.coffee.price*100)/100).toFixed(2)}`}

        </div>
        <div className={hovered ? styles.buttonDivHover : styles.buttonDiv}>
          <Button 
            buttonClass='secondary' 
            onClick={() => history.push('coffee/' + props.coffee.name.toLowerCase().replace(/ /g, '-'))}
          >
            more info
          </Button>
          <Button 
            buttonClass='primary' 
            onClick={() => {cartContext.addToCart(props.coffee, 1)}}
          >
            add to cart 
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CoffeeSlot;