import styles from './Coffee.module.css';
import Header from '../../Components/Header/Header.jsx';
import CoffeeSlot from '../../Components/CoffeeSlot/CoffeeSlot.jsx';
import Footer from '../../Components/Footer/Footer.jsx';
import {useState, useEffect} from 'react';

// import jsonData from '../../CoffeeProductList.json';

// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

// async function testFetch(file) {
//   await sleep(1500);
//   // const data = await fetch(file)
//   const data = jsonData;
//   return data
// }

function CoffeePage() {
  const [coffeeProducts, setCoffeeProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async() => {
      setIsLoading(true);
      // const data = await testFetch('../../../CoffeeProductList.json');
      // const data = await fetch('http://localhost:3000/api/coffee');
      // const dataRead = await data.json();
      const dataRead = await (await fetch('http://localhost:3000/api/coffee')).json();
      console.log(dataRead);
      // setCoffeeProducts(data);
      setCoffeeProducts(dataRead);
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
    {text: 'Price (high to low)', action: sortHighToLow}
  ]

  return (
    <div>
      <Header sortOptions={sortOptions}/>
      <div className={styles.coffeeSelection}>
        {isLoading? <div className={styles.loading}>loading...</div> :
        coffeeProducts.map(product => (
          <CoffeeSlot
            key = {product._id}
            name={product.name}
            // origin={product.origin}
            origin={product.country}
            descriptors={product.descriptors.join(', ')}
            price={product.price}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default CoffeePage;
