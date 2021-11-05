
import styles from './Admin.module.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import AddCoffee from '../../Components/AddCoffee/AddCoffee';
import EditCoffee from '../../Components/EditCoffee/EditCoffee';
import DeleteCoffee from '../../Components/DeleteCoffee/DeleteCoffee';

import {useState, useEffect} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import {Switch, Route, useHistory} from 'react-router-dom';

function Admin() {
  const [coffeeProducts, setCoffeeProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sorting, setSorting] = useState({field: null, ascending: false});
  
  const history = useHistory();

  const fetchData = async() => {
    setIsLoading(true);
    const dataRead = await (await fetch('http://localhost:3000/api/coffee')).json();
    setCoffeeProducts(dataRead);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  function productSort(attribute, direction) {
    function comparison(a, b) {
      if (a[attribute] < b[attribute]){
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[attribute] > b[attribute]){
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    }

    let sortedProducts = [...coffeeProducts];
    sortedProducts.sort(comparison);
    setCoffeeProducts(sortedProducts);
  }

  function updateSortingField(field) {
    if (sorting.field === field) {
      setSorting(prevSorting => ({field: field, ascending: !prevSorting.ascending}));
    } else {
      setSorting({field: field, ascending: true});
    }
  }

  useEffect(() => {
    productSort(sorting.field, sorting.ascending ? 'ascending' : 'descending');
  }, [sorting]);

  function selectSymbol(field) {
    if (sorting.field === field) {
      if (sorting.ascending) {
        return '▲';
      } else {
        return '▼';
      }
    } else {
      return ''
    }
  }

  return (
    <div className={styles.adminPage}>
      <Header />
      <div className={styles.adminBlock}>
        <Switch>
          <Route exact path='/admin'>
            <h1>admin</h1>
            {/* <p>{JSON.stringify(coffeeProducts)}</p> */}
            {isLoading ?
              <p>loading...</p>
              :
              <table>
                <thead>
                  <tr>
                    <th onClick={() => {updateSortingField('name')}}>Name {selectSymbol('name')}</th>
                    <th onClick={() => {updateSortingField('country')}}>Country {selectSymbol('country')}</th>
                    <th onClick={() => {updateSortingField('process')}}>Process {selectSymbol('process')}</th>
                    <th onClick={() => {updateSortingField('price')}}>Price {selectSymbol('price')}</th>
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
                          className={styles.icon}
                          onClick={() => {history.push('/admin/edit/' + product.name.toLowerCase().replace(/ /g, '-'))}}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            }
            <div className={styles.buttonDiv}>
              <button onClick={() => {history.push('/admin/add')}} className={styles.primaryButton}>add coffee</button>
            </div>
          </Route>
          <Route path='/admin/add'>
            <AddCoffee fetchData={fetchData}/>
          </Route>
          {coffeeProducts.map(product => (
            <Route path={'/admin/edit/' + product.name.toLowerCase().replace(/ /g, '-')}>
              <EditCoffee coffee={product} fetchData={fetchData}/>
            </Route>
          ))}
          {coffeeProducts.map(product => (
            <Route path={'/admin/delete/' + product._id}>
              <DeleteCoffee coffee={product} fetchData={fetchData}/>
            </Route>
          ))}
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default Admin;