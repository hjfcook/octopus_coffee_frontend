import React, {useState} from 'react';

const CartContext = React.createContext();

function CartProvider({children}) {
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  }

  const [cost, setCost] = useState(0);
  const addCost = (price) => {
    setCost(cost + price);
  }

  const value = {count, increment, cost, addCost}

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export {CartContext, CartProvider};
