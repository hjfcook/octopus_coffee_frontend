import styles from './Coffee.module.css'
import Header from '../../Components/Header/Header.js'

function CoffeePage() {
  const coffeeList = [];
  for (let i = 0; i < 15; i++) {
    coffeeList.push(
      <div className={styles.coffeeSlot}>
        <div className={styles.coffeeInfo}>
          <div className={styles.coffeeName}>Coffee {i+1}</div>
          <div>Ethiopia</div>
          <div>£14</div>
        </div>
      </div>
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
