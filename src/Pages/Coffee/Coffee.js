import styles from './Coffee.module.css';
import Header from '../../Components/Header/Header.js';
import CoffeeSlot from '../../Components/CoffeeSlot/CoffeeSlot.js';
import {useState, useEffect} from 'react';

import jsonData from '../../CoffeeProductList.json';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function testFetch(file) {
  await sleep(1500);
  // const data = await fetch(file)
  const data = jsonData;
  return data
}

function CoffeePage() {
  const [coffeeProducts, setCoffeeProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async() => {
      setIsLoading(true);
      const data = await testFetch('../../../CoffeeProductList.json');
      console.log(data);
      setCoffeeProducts(data);
      setIsLoading(false);
    };
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

  function sortAToZ() {
    productSort('name', 'ascending');
  }

  function sortZToA() {
    productSort('name', 'descending');
  }

  function sortLowToHigh() {
    productSort('price', 'ascending');
  }

  function sortHighToLow() {
    productSort('price', 'descending');
  }

  const sortOptions = [
    {text: 'Name (A - Z)', action: sortAToZ},
    {text: 'Name (Z - A)', action: sortZToA},
    {text: 'Price (low to high)', action: sortLowToHigh},
    {text: 'Price (low to high)', action: sortHighToLow}
  ]

  return (
    <div>
      <Header sortOptions={[sortAToZ, sortZToA, sortLowToHigh, sortHighToLow]}/>
      {/*<Header sortOptions={sortOptions}/>*/}
      <div className={styles.coffeeSelection}>
        {isLoading? <div className={styles.loading}>loading...</div> :
        coffeeProducts.map(product => (
          <CoffeeSlot
            name={product.name}
            origin={product.origin}
            descriptors={product.descriptors}
            price={product.price}
          />
        ))}
      </div>
      <div>footer</div>
    </div>
  );
}

export default CoffeePage;
