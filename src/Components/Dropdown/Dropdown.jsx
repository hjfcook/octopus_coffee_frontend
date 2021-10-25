import styles from './Dropdown.module.css';
import {useState} from 'react';

import DropdownSubmenu from '../DropdownSubmenu/DropdownSubmenu.jsx';

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
            props.type === 'menu' ?  
            <button key={option.text} onClick={option.action}>{option.text}</button> 
            // : <DropdownSubmenu name={option.text} subOptions={option.subOptions} sortOptions={[{text: 'test', action: () => {console.log('y')}}]}/>
            : <DropdownSubmenu key={option.text} name={option.text} subOptions={option.subOptions} action={option.action}/>
          ))}
        </div>
      </div>
      : null}
    </li>
  )
}

export default Dropdown;
