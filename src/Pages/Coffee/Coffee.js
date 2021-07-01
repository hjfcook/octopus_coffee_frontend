import styles from './Coffee.module.css';
import Header from '../../Components/Header/Header.js';
import CoffeeSlot from '../../Components/CoffeeSlot/CoffeeSlot.js';
import {useState, useEffect} from 'react';

import jsonData from '../../CoffeeProductList.json';
// import jsonData from '/home/henry/Documents/Projects/coffee_roasters/CoffeeProductList.json';
// console.log(jsonData);

// function CoffeePage() {
//   const coffeeList = [];
//   for (let i = 0; i < 15; i++) {
//     coffeeList.push(
//       <CoffeeSlot
//         name={`Coffee ${i+1}`}
//         origin='Ethiopia'
//         descriptors='Tea, Floral, Citrus'
//         price='£14'
//       />
//     );
//   }
//
//   return (
//     <div>
//       <Header />
//       <div className={styles.coffeeSelection}>
//         {coffeeList}
//       </div>
//       <div>footer</div>
//     </div>
//   );
// }

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

  return (
    <div>
      <Header />
      <div className={styles.coffeeSelection}>
        {isLoading? <div>loading...</div> :
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
