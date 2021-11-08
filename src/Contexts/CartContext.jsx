import React, {useState, useEffect} from 'react';

const CartContext = React.createContext();

function CartProvider({children}) {
  const [cart, setCart] = useState(
    () => {
      const localCart = window.localStorage.getItem('cart');
      if (localCart) {
        return JSON.parse(localCart);
      } else {
        return [];
      }
    }
  );

  useEffect(() => {
    window.localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity) => {
    const index = cart.findIndex(obj => obj._id === product._id);
    if (index === -1) {
      return setCart(prevCart => [...prevCart, {_id: product._id, name: product.name, price: product.price, quantity: quantity}]);
    } else {
      return setCart(
        prevCart => (
          prevCart.map((el, i) => (
            i !== index ? el 
            : {...el, quantity: el.quantity + quantity}
          ))
        )
      );
    }
  }

  const removeFromCart = (product) => {
    const index = cart.findIndex(obj => obj._id === product._id);
    if (index !== -1) {
      return setCart(prevCart => prevCart.filter((el, i) => i !== index));
    }
  }

  const setQuantity = (product, quantity) => {
    const index = cart.findIndex(obj => obj._id === product._id);
    if (index !== -1) {
      return setCart(
        prevCart => (
          prevCart.map((el, i) => (
            i !== index ? el 
            : {...el, quantity: quantity}
          ))
        )
      );
    }
  }

  const value = {cart, addToCart, removeFromCart, setQuantity}

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export {CartContext, CartProvider};