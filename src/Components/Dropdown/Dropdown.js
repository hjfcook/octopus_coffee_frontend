import styles from './Dropdown.module.css';
import {useState} from 'react';

function Dropdown(props) {

  const [active, setActive] = useState(false);

  return (
    <li
      onMouseEnter={() => {setActive(true)}}
      onMouseLeave={() => {setActive(false)}}
    >
      <span>
        {props.name} ▼
      </span>
      {active ?
      <div className={styles.dropdown}>
        <div className={styles.test}>
          <button>Name (A-Z)</button>
          <button>Name (Z-A)</button>
          <button>Price (low to high)</button>
          <button>Price (high to low)</button>
        </div>
      </div>
      : null}
    </li>
  )
}

export default Dropdown;
