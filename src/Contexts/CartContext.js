import React, {useState} from 'react';

const CartContext = React.createContext();

function CartProvider({children}) {
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  }
  const value = {count, increment}

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}

export {CartContext, CartProvider};
