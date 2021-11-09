import styles from './DropdownSubmenu.module.css';
import {useState} from 'react';

function DropdownSubmenu(props) {

  const [active, setActive] = useState(false);

  return (
    <li
      className={styles.dropdownItem}
      onMouseEnter={() => {setActive(true)}}
      onMouseLeave={() => {setActive(false)}}
    >
      <span>
        {props.name}
      </span>
      {active ?
      <div className={styles.dropdownSubmenu}>
        <div className={styles.test}>
          {props.subOptions.map(option => (
            <button key={option} onClick={() => {props.action(props.name, option)}}>{option}</button>
          ))}
        </div>
      </div>
      : null}
    </li>
  )
}

export default DropdownSubmenu;