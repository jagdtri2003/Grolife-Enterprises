import React, { useState,useEffect, useContext } from "react";
import "../style/itemcomponent.css";
import { useParams, Link } from "react-router-dom";
import Header from "./Header";
import { CartContext } from "../context/CartContex.js";
import { failToast, successToast } from "./ToastComponent.js";
import product from "../products/products.js";
import Footer from "./Footer.js";
import StarRatings from "react-star-ratings";
import Skeleton from 'react-loading-skeleton';

const ItemComponent = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { id } = useParams();

  const [count, setCount] = useState(1);
  const { addToCart } = useContext(CartContext);
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(product[id]) {
      setItem(product[id]);
      setLoading(false);
      return;
    }
    fetchProduct();
  }, [id]);

  const fetchProduct = async() => {
    setLoading(true);
    if (localStorage.getItem(id)) {
      console.log("Got Item");
      setItem(JSON.parse(localStorage.getItem(id)));
      setLoading(false);
      return;
    }
    const url = 'https://test-axios-iota.vercel.app/api/?asin='+id;
    const response = await fetch(url);
    if (!response.ok) {
      failToast("Something went wrong!! Please Wait !");
      fetchProduct();
      return;
    }
    const responseJson = await response.json();
    localStorage.setItem(id, JSON.stringify(responseJson));
    setItem(responseJson);
    setLoading(false);
};
  const handleAddToCart = (e) => {
    e.target.setAttribute("disabled", "true");
    addToCart(
      id,
      {
        id,
        name: item.name,
        quantity: count,
        sku: `Sku-${id}`,
        added : new Date().toString().slice(0,15),
        price: item.price,
        image: item.image,
      },
      count
    );
    successToast("Item Added to Cart !!");
    setTimeout(() => {
      e.target.removeAttribute("disabled");
    }, 3000);
  };
  return (
    <>
      <Header />
      <div className="breadcrumb">
        <Link to="/">Home</Link> /<span>{`Sku-${id}`}</span>
      </div>
      <div style={{ margin: "30px" }} className="item-container">
        <div className="item-image">
          {loading ? <Skeleton width={400} height={400} /> : <img style={{ marginTop: "30px" }} src={item.image} alt={item.name} />}
          <br />
        </div>
        <div className="item-details">
          {loading ? <Skeleton height={35} style={{marginBottom:'4vh'}} count={6} /> :<> <h2 className="item-name">{item.name}</h2>
          <p>
            <strong>SKU ID:</strong> Sku-{id} &nbsp; &nbsp;
          </p>
          <p>
            <StarRatings
              rating={item.rating || 3.8 }
              starRatedColor="orange"
              starDimension="20px"
              starSpacing="5px"
            /> &nbsp; &nbsp; ( {item.reviews || 100 + Math.round(Math.random() * 100)} ratings)
          </p>
          <div className="item-price">
          <span style={{color:'red',fontSize:'20px'}}>{- (((parseInt(item.discountPrice.slice(1))-parseInt(item.price))/parseInt(item.discountPrice.slice(1)))*100).toFixed(0)}%  &nbsp;</span> 
            <span className="price">
              ₹{item.price} </span>
          </div>
          <div style={{marginTop:'-8px',fontSize:'15px'}}>
          M.R.P : 
          <span className="discount-price">{item.discountPrice}</span></div>
          <div className="count-btn">
            <button onClick={() => (count > 1 ? setCount(count - 1) : null)}>
              -
            </button>
            <input id="count" value={count} type="number" min={1} readOnly />
            <button onClick={() => setCount(count + 1)}>+</button>
          </div>
          <button onClick={handleAddToCart} className="add-to-cart">
            Add to Cart
          </button>
          <p className="item-specifications">
            { item.specifications === undefined ? <ul>
              {item.description.map((spec, index) => (
                <li key={index}>{spec}</li>
              ))}
            </ul>
            : item.specifications }
          </p>
          </>}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ItemComponent;
