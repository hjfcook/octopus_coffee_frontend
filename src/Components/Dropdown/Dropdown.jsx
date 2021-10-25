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
          {props.sortOptions.map(option => (
            <button onClick={option.action}>{option.text}</button>
          ))}
        </div>
      </div>
      : null}
    </li>
  )
}

export default Dropdown;
