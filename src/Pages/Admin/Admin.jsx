
import styles from './Admin.module.css';
import Header from '../../Components/Header/Header.jsx';
import Footer from '../../Components/Footer/Footer.jsx';

import {useState, useEffect} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

function Admin() {
  const [coffeeProducts, setCoffeeProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async() => {
      setIsLoading(true);
      const dataRead = await (await fetch('http://localhost:3000/api/coffee')).json();
      setCoffeeProducts(dataRead);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className={styles.adminPage}>
      <Header />
      <div className={styles.adminBlock}>
        <h1>admin</h1>
        {/* <p>{JSON.stringify(coffeeProducts)}</p> */}
        {isLoading ?
          <p>loading...</p>
          :
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Country</th>
                <th>Process</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {coffeeProducts.map(product => (
                <tr key={product._id}>
                  <td>
                    {product.name}
                  </td>
                  <td>
                    {product.country}
                  </td>
                  <td>
                    {product.process}
                  </td>
                  <td>
                    {`£${((product.price*100)/100).toFixed(2)}`}
                  </td>
                  <td>
                    <FontAwesomeIcon
                      icon={faEdit}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        }
        <div className={styles.buttonDiv}>
          <button>add coffee</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Admin;