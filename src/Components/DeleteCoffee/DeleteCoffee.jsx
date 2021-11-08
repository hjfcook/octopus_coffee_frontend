import styles from './DeleteCoffee.module.css';

import {useHistory} from 'react-router-dom';

function AddCoffee(props) {
  const history = useHistory();

  const deleteCoffee = () => {
    fetch(`http://localhost:3000/api/coffee/${props.coffee._id}`, {
      method: "DELETE",
      headers: {'Content-Type': 'application/json'},
      // body: JSON.stringify({
      // }),
      credentials: 'include'
    }).then((res) => res.json())
      .then(res => {
        console.log(res);
        if (res.deleted) {
          history.push('/admin');
          props.fetchData();
        }
      });
  };

  return (
    <>
      {/* <h1>add coffee</h1> */}
      <h2>are you sure you want to delete this coffee?</h2>
      <h3>this action CANNOT be undone</h3>
      <div className={styles.buttonDiv}>
        <button onClick={() => history.push('/admin/edit/' + props.coffee.name.toLowerCase().replace(/ /g, '-'))}>cancel</button>
        <button onClick={deleteCoffee} className={styles.dangerButton}>delete</button>
      </div>
    </>
  );
}

export default AddCoffee;