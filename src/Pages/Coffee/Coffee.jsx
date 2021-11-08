import styles from './Coffee.module.css';
import Header from '../../Components/Header/Header.jsx';
import CoffeeSlot from '../../Components/CoffeeSlot/CoffeeSlot.jsx';
import Footer from '../../Components/Footer/Footer.jsx';
import CoffeeSpotlight from '../../Components/CoffeeSpotlight/CoffeeSpotlight.jsx';

import {useState, useEffect, useCallback} from 'react';
import {Switch,Route} from "react-router-dom";


function CoffeePage() {
  const [coffeeProducts, setCoffeeProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortingField, setSortingField] = useState('');
  const [ascending, setAscending] = useState(true);

  const [productBackup, setProductBackup] = useState([]);

  const fetchData = async () => {
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

  function sortAToZ() {
    setSortingField('name');
    setAscending(true);
  }

  function sortZToA() {
    setSortingField('name');
    setAscending(false);
  }

  function sortLowToHigh() {
    setSortingField('price');
    setAscending(true);
  }

  function sortHighToLow() {
    setSortingField('price');
    setAscending(false);
  }

  function productFilter(category, value) {
    const filteredProducts = productBackup.filter(coffee => coffee[category.toLowerCase()].toLowerCase() === value.toLowerCase())
    setCoffeeProducts(filteredProducts);
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

  useEffect(() => {
    (async () => {
      const data = await fetchData();
      setProductBackup(data);
    })();
  }, []);

  useEffect(() => {
    productSort();
  }, [productSort]);

  return (
    <div className={styles.coffeePage}>
      <Switch>
        <Route exact path='/coffee'>
          <Header sortOptions={sortOptions} filterOptions={filterOptions}/>
          <div className={styles.coffeeSelection}>
            {isLoading? <div className={styles.loading}>loading...</div> :
            coffeeProducts.map(coffee => (
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