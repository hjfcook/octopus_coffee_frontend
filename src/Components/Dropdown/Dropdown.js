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
          <button onClick={props.sortOptions[0]}>Name (A-Z)</button>
          <button onClick={props.sortOptions[1]}>Name (Z-A)</button>
          <button onClick={props.sortOptions[2]}>Price (low to high)</button>
          <button onClick={props.sortOptions[3]}>Price (high to low)</button>
        </div>
      </div>
      : null}
    </li>
  )
}

export default Dropdown;
