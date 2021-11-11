import styles from './Button.module.css';

function Button(props) {
  const buttonClasses = {
    primary: styles.primary,
    secondary: styles.secondary,
    danger: styles.danger
  };

  return (
    // <button className={`${styles.button} ${buttonClasses[props.buttonClass]}`} {...props}>
    <button className={`${styles.button} ${buttonClasses[props.buttonClass]}`} onClick={props.onClick} style={props.style} type={props.type} form={props.form}>
      {props.children}
    </button>
  );
}

export default Button;