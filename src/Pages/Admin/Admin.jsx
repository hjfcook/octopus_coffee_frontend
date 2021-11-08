import styles from './Admin.module.css';
import PageTemplate from '../PageTemplate/PageTemplate';
import DeleteCoffee from '../../Components/DeleteCoffee/DeleteCoffee';
import CoffeeMod from '../../Components/CoffeeMod/CoffeeMod';
import Button from '../../Components/Button/Button';

// import {useState, useEffect, useCallback} from 'react';
import {useEffect} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import {Switch, Route, useHistory} from 'react-router-dom';

import useCoffee from '../../Hooks/useCoffee';

function Admin() {
  // const [
  //   coffeeProducts, setCoffeeProducts,  
  //   isLoading, setIsLoading,
  //   sortingField, setSortingField,
  //   ascending, setAscending,
  //   fetchData,
  // ] = useCoffee();
  const [
    coffeeProducts, ,  
    isLoading, ,
    sortingField, setSortingField,
    ascending, setAscending,
    fetchData,
  ] = useCoffee();
  
  const history = useHistory();

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
  }, [fetchData, setSortingField]);

  return (
    <PageTemplate>
      <Switch>
        <Route exact path='/admin'>
          <h1>admin</h1>
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
            <Button buttonClass='primary' onClick={() => {history.push('/admin/add')}}>add coffee</Button>
          </div>
        </Route>
        <Route path='/admin/add'>
          <CoffeeMod type='add' fetchData={fetchData} />
        </Route>
        {coffeeProducts.map(product => (
          <Route path={'/admin/edit/' + product.name.toLowerCase().replace(/ /g, '-')} key={product._id}>
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