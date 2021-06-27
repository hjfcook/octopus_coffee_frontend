import styles from './CoffeeSlot.module.css';
import {useState} from 'react';

function CoffeeSlot(props) {
  const [hovered, setHovered] = useState(false);

  const hoverHandler = () => {
    setHovered(!hovered);
  }

  return (
    <div
      className={styles.coffeeSlot + ` ${hovered ? styles.slotHovered : ''}`}
      onMouseEnter={hoverHandler}
      onMouseLeave={hoverHandler}
    >
      <div className={styles.coffeeInfo + ` ${hovered ? styles.infoHovered : ''}`}>
        <div>
          <div className={styles.coffeeName}>
            {props.name}
          </div>
          <div className={styles.coffeeOrigin}>
            {props.origin}
          </div>
        </div>
        <div className={styles.coffeeDescriptors}>
          {props.descriptors}
        </div>
        <div className={styles.coffeePrice}>
          {props.price}
        </div>
        <div className={hovered ? styles.buttonDivHover : styles.buttonDiv}>
          <button>more info</button>
          <button className={styles.toCart}>add to cart</button>
        </div>
      </div>
    </div>
  )
}

export default CoffeeSlot;
