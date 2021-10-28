import styles from './Coffee.module.css';
import Header from '../../Components/Header/Header.jsx';
import CoffeeSlot from '../../Components/CoffeeSlot/CoffeeSlot.jsx';
import Footer from '../../Components/Footer/Footer.jsx';
import CoffeeSpotlight from '../../Components/CoffeeSpotlight/CoffeeSpotlight.jsx';

import {useState, useEffect} from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";


function CoffeePage() {
  const [coffeeProducts, setCoffeeProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async() => {
      setIsLoading(true);
      const dataRead = await (await fetch('http://localhost:3000/api/coffee')).json();
      setCoffeeProducts(dataRead);
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

    let sortedProducts = [...displayProducts];
    sortedProducts.sort(comparison);
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
    const filteredProducts = coffeeProducts.filter(coffee => coffee[category.toLowerCase()].toLowerCase() === value.toLowerCase())
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
            displayProducts.map(coffee => (
              <CoffeeSlot
                key = {coffee._id}
                coffee={coffee}
              />
            ))}
          </div>
        </Route>
        {coffeeProducts.map(coffee => (
          <Route 
            path={`/coffee/${coffee.name.toLowerCase().replace(/ /g, '-')}`}
            key={coffee._id}
          >
            <Header/>
            <CoffeeSpotlight 
              name={coffee.name} 
              coffee={coffee}
            />
          </Route>
        ))}
      </Switch>
      <Footer />
    </div>
  );
}

export default CoffeePage;