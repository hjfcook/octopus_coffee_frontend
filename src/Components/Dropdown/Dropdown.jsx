import styles from './Dropdown.module.css';
import {useState} from 'react';

// import DropdownSubmenu from '../DropdownSubmenu/DropdownSubmenu.jsx';

// function Dropdown(props) {

//   const [active, setActive] = useState(false);

//   return (
//     <li
//       onMouseEnter={() => {setActive(true)}}
//       onMouseLeave={() => {setActive(false)}}
//     >
//       <span>
//         {props.name} ▼
//       </span>
//       {active ?
//       <div className={styles.dropdown}>
//         <div className={styles.test}>
//           {props.sortOptions.map(option => (
//             props.type === 'button' ?  
//             <button key={option.text} onClick={option.action}>{option.text}</button> 
//             // : <DropdownSubmenu name={option.text} subOptions={option.subOptions} sortOptions={[{text: 'test', action: () => {console.log('y')}}]}/>
//             : <DropdownSubmenu key={option.text} name={option.text} subOptions={option.subOptions} action={option.action}/>
//           ))}
//         </div>
//       </div>
//       : null}
//     </li>
//   )
// }

function Dropdown(props) {

  const [active, setActive] = useState(false);

  return (
    <li
      className={props.level === 'sub' ? styles.dropdownItem : ''}
      onMouseEnter={() => {setActive(true)}}
      onMouseLeave={() => {setActive(false)}}
    >
      <span>
        {props.name} {props.level === 'top' ? '▼' : ''}
      </span>
      {active ?
      <div className={props.level === 'top' ? styles.dropdown : styles.dropdownSubmenu}>
        <div className={styles.test}>
          {props.sortOptions.map(option => (
            props.childType === 'button' ?  
              props.level === 'top' ?
              <button key={option.text} onClick={option.action}>{option.text}</button> 
              :
              <button key={option} onClick={() => {props.action(props.name, option)}}>{option}</button>
            : 
            <Dropdown level='sub' childType='button' key={option.text} name={option.text} sortOptions={option.subOptions} action={option.action}/>
          ))}
        </div>
      </div>
      : null}
    </li>
  )
}

export default Dropdown;
