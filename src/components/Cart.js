import React, { useState, useContext, useEffect } from "react";
import "../style/cart.css";
import { Link,useNavigate } from "react-router-dom";
import Header from "./Header";
import { CartContext } from "../context/CartContex";
import { handlePayment } from "../services/payment";
import { failToast } from "./ToastComponent";
import AddressModal from "./AdressModal";

const CartItem = ({ item, onRemove }) => (
  <div className="cart-item">
    <table>
      <tbody>
        <tr>
          <td>
          <Link  to={`/item/${item.id}`}>
            <img src={item.image} alt="" className="cart-item-image" />
          </Link>
          </td>
          
          <td>
          <h4>{item.name.length > 60 ? item.name.substring(0, 60) + "..." : item.name}</h4>
            <p>
              Sku: {item.sku}
              <br />
              Added on : {item.added}
            </p>
            <button className="remove-button" onClick={() => onRemove(item.id)}>
              Remove
            </button>
          </td>
          <td data-quantity={item.quantity}>
            <p> ₹ {item.price}</p>
          </td>
          <td>
            <p>{item.quantity}</p>
          </td>
          <td>
            <p>₹{(item.price * item.quantity)}</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

const Cart = ({user}) => {
  const { cartItems, setCartItems } = useContext(CartContext);

  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [totalAmount, setTotalAmount] = useState(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  });
  useEffect(() => {
    setTotalAmount(
      cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    );
  },[cartItems, totalAmount]);
  const handleRemove = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleCheckout = () =>{
      if(!user){
        failToast("Please login to continue");
        navigate("/login");
      }else{
        setModalOpen(true);
      }
  }
  const handleAddressSubmit = ({ address, phoneNumber }) => {
    // Process payment with address and phone number
    handlePayment(totalAmount * 100, cartItems, setCartItems, address, phoneNumber);
  };

  return (
    <>
      <Header />
      <div className="cart-container">
        <div className="breadcrumb">
          <Link to="/">Home</Link> / <span>Shopping cart</span>
        </div>
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <h2>Shopping cart</h2>
            <p>Your cart is empty!</p>
            <Link to="/" className="continue-shopping-button">
              CONTINUE SHOPPING &nbsp;
              <i className="fa-light fa-arrow-right"></i>
            </Link>
          </div>
        ) : (
          <>
            <div className="cart">
              <div className="cart-items-container">
                <div className="cart-header">
                  <table className="table-header">
                    <thead>
                      <tr>
                        <td colSpan={3}>Product</td>
                        <td>Price</td>
                        <td>Quantity</td>
                        <td>Total</td>
                      </tr>
                    </thead>
                  </table>
                </div>
                <div className="cart-items">
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onRemove={handleRemove}
                    />
                  ))}
                </div>
              </div>
              <div className="order-summary-container">
                <div className="order-summary">
                  <h2>Order summary</h2>
                  <p>Sub total: ₹ {totalAmount.toFixed(2)}</p>
                  <p>Total: ₹ {totalAmount.toFixed(2)}</p> 
                  <p>(Inclusive of tax ₹ 0.00)</p>
                  <button onClick={handleCheckout}
                     className="checkout-button">PLACE ORDER</button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <AddressModal 
          isOpen={isModalOpen} 
          onClose={() => setModalOpen(false)} 
          onSubmit={handleAddressSubmit} />
    </>
  );
};

export default Cart;
