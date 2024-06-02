import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import './Cart.css';

export const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  return (
    <div className="cart-container">
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>No products in the cart</p>
      ) : (
        <>
          {cartItems.map(item => (
            <div className="cart-item" key={item.cartId}>
              <span>{item.name}</span>
              <button onClick={() => removeFromCart(item.cartId)}>Delete</button>
            </div>
          ))}
          <button className="clear-cart">Pay Products</button>
          <button className="clear-cart" onClick={clearCart}>Delete All</button>
        </>
      )}
    </div>
  );
};

export default Cart;
