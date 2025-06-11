import { useState } from 'react';
import '../styles/Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Camiseta BlackTiger',
      price: 79.90,
      quantity: 1,
      image: '/images/camiseta.jpg',
    },
    {
      id: 2,
      name: 'Kit de Cuidados Pós-Tatuagem',
      price: 49.90,
      quantity: 2,
      image: '/images/kit-cuidados.jpg',
    },
  ]);

  const updateQuantity = (id, delta) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = id => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = subtotal >= 150 ? 0 : 15;
  const total = subtotal + shipping;

  return (
    <div className="cart-page">
      <h1>Carrinho de Compras</h1>
      {cartItems.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <div className="cart-container">
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h2>{item.name}</h2>
                  <p>Preço: R$ {item.price.toFixed(2)}</p>
                  <div className="quantity-control">
                    <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                  </div>
                  <p>Total: R$ {(item.price * item.quantity).toFixed(2)}</p>
                  <button onClick={() => removeItem(item.id)}>Remover</button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h2>Resumo do Pedido</h2>
            <p>Subtotal: R$ {subtotal.toFixed(2)}</p>
            <p>Frete: R$ {shipping.toFixed(2)}</p>
            <h3>Total: R$ {total.toFixed(2)}</h3>
            <button className="checkout-button">Finalizar Compra</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;