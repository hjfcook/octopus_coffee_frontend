import styles from './Coffee.module.css'
import Header from '../../Components/Header/Header.js'
import CoffeeSlot from '../../Components/CoffeeSlot/CoffeeSlot.js'

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

function CoffeePage() {
  const coffeeList = [];
  for (let i = 0; i < 12; i++) {
    coffeeList.push(
      <CoffeeSlot />
    );
  }

  return (
    <div>
      <Header />
      <div className={styles.coffeeSelection}>
        {coffeeList}
      </div>
      <div>footer</div>
    </div>
  );
}

export default CoffeePage;
