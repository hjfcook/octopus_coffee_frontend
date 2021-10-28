import styles from './CoffeeSlot.module.css';
import React, {useState} from 'react';

import {CartContext} from '../../Contexts/CartContext.jsx'



import { useHistory } from 'react-router-dom';

const LinkButton = (props) => {
  const history = useHistory();
  const handleClick = () => history.push(props.url);

  return (
    <button type="button" onClick={handleClick}>
      more info
    </button>
  );
};



function CoffeeSlot(props) {
  const [hovered, setHovered] = useState(false);

  const hoverHandler = () => {
    setHovered(!hovered);
  }

  const context = React.useContext(CartContext);

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
            {props.coffee.origin}
          </div>
        </div>
        <div className={styles.coffeeDescriptors}>
          {props.coffee.descriptors.join(', ')}
        </div>
        <div className={styles.coffeePrice}>
          {`£${((props.coffee.price*100)/100).toFixed(2)}`}

        </div>
        <div className={hovered ? styles.buttonDivHover : styles.buttonDiv}>
          <LinkButton url={'coffee/' + props.coffee.name.toLowerCase().replace(/ /g, '-')}/>
          <button
            className={styles.toCart}
            onClick={() => {
              context.addToCart(props.coffee, 1)
            }}
          >add to cart</button>
        </div>
      </div>
    </div>
  )
}

export default CoffeeSlot;