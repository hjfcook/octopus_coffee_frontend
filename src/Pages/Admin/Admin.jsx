import styles from './Admin.module.css';
import PageTemplate from '../PageTemplate/PageTemplate';
// import AddCoffee from '../../Components/AddCoffee/AddCoffee';
// import EditCoffee from '../../Components/EditCoffee/EditCoffee';
import DeleteCoffee from '../../Components/DeleteCoffee/DeleteCoffee';
import CoffeeMod from '../../Components/CoffeeMod/CoffeeMod';

import {useState, useEffect, useCallback} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import {Switch, Route, useHistory} from 'react-router-dom';

function Admin() {
  const [coffeeProducts, setCoffeeProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortingField, setSortingField] = useState('');
  const [ascending, setAscending] = useState(true);
  
  const history = useHistory();

  const fetchData = async() => {
    setIsLoading(true);
    const dataRead = await (await fetch('http://localhost:3000/api/coffee')).json();
    setCoffeeProducts(dataRead);
    setIsLoading(false);
    return dataRead;
  };

  const productSort = useCallback(() => {
    function comparison(a, b) {
      if (a[sortingField] < b[sortingField]){
        return ascending ? -1 : 1;
      }
      if (a[sortingField] > b[sortingField]){
        return ascending ? 1 : -1;
      }
      return 0;
    }
    setCoffeeProducts(prevProducts => [...prevProducts].sort(comparison));
  }, [sortingField, ascending]);

  function updateSorting(field) {
    if (sortingField === field) {
      setAscending(prevAscending => !prevAscending);
    } else {
      setAscending(true);
    }
    setSortingField(field);
  }

  function selectSymbol(field) {
    if (sortingField === field) {
      if (ascending) {
        return '▲';
      } else {
        return '▼';
      }
    } else {
      return ''
    }
  }

  useEffect(() => {
    (async () => {
      await fetchData();
      setSortingField('name');
    })();
  }, []);

  useEffect(() => {
    productSort();
  }, [productSort]);


  return (
    <PageTemplate>
      <Switch>
        <Route exact path='/admin'>
          <h1>admin</h1>
          {/* <p>{JSON.stringify(coffeeProducts)}</p> */}
          {isLoading ?
            <p>loading...</p>
            :
            <table className={styles.table}>
              <thead>
                <tr>
                  <th onClick={() => {updateSorting('name')}}>Name {selectSymbol('name')}</th>
                  <th onClick={() => {updateSorting('country')}}>Country {selectSymbol('country')}</th>
                  <th onClick={() => {updateSorting('process')}}>Process {selectSymbol('process')}</th>
                  <th onClick={() => {updateSorting('price')}}>Price {selectSymbol('price')}</th>
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
          {/* <AddCoffee fetchData={fetchData}/> */}
          <CoffeeMod type='add' fetchData={fetchData} />
        </Route>
        {coffeeProducts.map(product => (
          <Route path={'/admin/edit/' + product.name.toLowerCase().replace(/ /g, '-')} key={product._id}>
            {/* <EditCoffee coffee={product} fetchData={fetchData}/> */}
            <CoffeeMod type='edit' coffee={product} fetchData={fetchData} />
          </Route>
        ))}
        {coffeeProducts.map(product => (
          <Route path={'/admin/delete/' + product._id} key={product._id}>
            <DeleteCoffee coffee={product} fetchData={fetchData}/>
          </Route>
        ))}
      </Switch>
    </PageTemplate>
  );
}

export default Admin;