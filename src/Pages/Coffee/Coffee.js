import styles from './Coffee.module.css'
import Header from '../../Components/Header/Header.js'

function CoffeePage() {
    return (
        <div>
            <Header />
            <div className={styles.coffeeSelection}>
                <div className={styles.coffeeSlot}>
                    coffee 1
                </div>
                <div className={styles.coffeeSlot}>
                    coffee 2
                </div>
                <div className={styles.coffeeSlot}>
                    coffee 3
                </div>
                <div className={styles.coffeeSlot}>
                    coffee 4
                </div>
                <div className={styles.coffeeSlot}>
                    coffee 5
                </div>
                <div className={styles.coffeeSlot}>
                    coffee 6
                </div>
                <div className={styles.coffeeSlot}>
                    coffee 7
                </div>
                <div className={styles.coffeeSlot}>
                    coffee 8
                </div>
                <div className={styles.coffeeSlot}>
                    coffee 9
                </div>
                <div className={styles.coffeeSlot}>
                    coffee 10
                </div>
                <div className={styles.coffeeSlot}>
                    coffee 11
                </div>
                <div className={styles.coffeeSlot}>
                    coffee 12
                </div>
                <div className={styles.coffeeSlot}>
                    coffee 13
                </div>
                <div className={styles.coffeeSlot}>
                    coffee 14
                </div>
                <div className={styles.coffeeSlot}>
                    coffee 15
                </div>
                <div className={styles.coffeeSlot}>
                    coffee 16
                </div>
            </div>
            <div>footer</div>
        </div>
    );
}

export default CoffeePage;