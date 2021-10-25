import {
  BrowserRouter as Router,
  Switch,
  Route,
  //Link
} from "react-router-dom";



import styles from './Coffee.module.css';
import Header from '../../Components/Header/Header.jsx';
import CoffeeSlot from '../../Components/CoffeeSlot/CoffeeSlot.jsx';
import Footer from '../../Components/Footer/Footer.jsx';

import CoffeeSpotlight from '../../Components/CoffeeSpotlight/CoffeeSpotlight.jsx';

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
  const [displayProducts, setDisplayProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async() => {
      setIsLoading(true);
      // const data = await testFetch('../../../CoffeeProductList.json');
      // const data = await fetch('http://localhost:3000/api/coffee');
      // const dataRead = await data.json();
      const dataRead = await (await fetch('http://localhost:3000/api/coffee')).json();
      console.log(dataRead.map(coffee => coffee.name.toLowerCase().replace(/ /g, '-')));
      // setCoffeeProducts(data);
      setCoffeeProducts(dataRead);
      // setDisplayProducts(coffeeProducts);
      setDisplayProducts(dataRead);
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

    // let sortedProducts = [...coffeeProducts];
    let sortedProducts = [...displayProducts];
    sortedProducts.sort(comparison);
    // setCoffeeProducts(sortedProducts);
    setDisplayProducts(sortedProducts);
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

  function productFilter(category, value) {
    // let filteredProducts = [...coffeeProducts];
    const filteredProducts = coffeeProducts.filter(coffee => coffee[category.toLowerCase()].toLowerCase() === value.toLowerCase())
    // const filteredProducts = displayProducts.filter(coffee => coffee[category.toLowerCase()].toLowerCase() === value.toLowerCase())
    setDisplayProducts(filteredProducts);
  }

  const sortOptions = [
    {text: 'Name (A - Z)', action: sortAToZ},
    {text: 'Name (Z - A)', action: sortZToA},
    {text: 'Price (low to high)', action: sortLowToHigh},
    {text: 'Price (high to low)', action: sortHighToLow}
  ]

  const filterOptions = [
    {text: 'Continent', subOptions: ['Africa', 'Americas', 'Asia'], action: productFilter},
    {text: 'Process', subOptions: ['Honey', 'Natural', 'Pulped Natural', 'Washed'], action: productFilter},
    {text: 'Roast', subOptions: ['Light', 'Medium', 'Medium-dark', 'Dark'], action: productFilter}
  ]

  return (
    <div className={styles.coffeePage}>
      <Switch>
        <Route exact path='/coffee'>
          <Header sortOptions={sortOptions} filterOptions={filterOptions}/>
          <div className={styles.coffeeSelection}>
            {isLoading? <div className={styles.loading}>loading...</div> :
            // coffeeProducts.map(product => (
            displayProducts.map(product => (
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
        </Route>
        {coffeeProducts.map(coffee => (
          <Route path={`/coffee/${coffee.name.toLowerCase().replace(/ /g, '-')}`}>
            <Header/>
            <CoffeeSpotlight 
              name={coffee.name} 
              continent={coffee.continent} 
              country={coffee.country} 
              process={coffee.process} 
              price={coffee.price} 
              roast={coffee.roast} 
              description={coffee.description} 
              descriptors={coffee.descriptors} 
            />
          </Route>
        ))}
      </Switch>
      <Footer />
    </div>
  );
}

export default CoffeePage;
