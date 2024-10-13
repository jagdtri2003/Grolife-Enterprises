import React,{useContext,useEffect,useState} from 'react';
import { CartContext } from '../context/CartContex';
import { Link } from 'react-router-dom';
import '../style/productcard.css';
import StarRatings from 'react-star-ratings';
import { successToast } from './ToastComponent';

function ProductCard({product}) {

  const {addToCart} = useContext(CartContext);
  const [limitedTimeDeal, setLimitedTimeDeal] = useState(false);
  
  useEffect(() => {
    product["discountPrice"] = parseInt(product["Price"]) + parseInt(Math.random() * 10) +1; 
    product["rating"] = parseFloat(3.5+Math.random()*2.5);
    setLimitedTimeDeal(Math.random() > 0.5);
  }, [product]);

  const handleAddToCart = (item) => {
    addToCart(
      item.id,
      {
        id:item.asin,
        name: item.Name[0].toUpperCase()+item.Name.slice(1) || item.product_title,
        quantity: 1,
        added : new Date().toString().slice(4,15),
        sku: `Sku-${item.id}`,
        price: parseInt(item.Price) || item.product_price,
        image: item.Image || item.product_photo,
      },1);
    successToast("Item Added to Cart !!");
  };


  return (
    <>
    <div className="product-card2">
      <div style={{paddingLeft:'5%'}} className="product-image">
        <img loading='lazy' src={product.Image || product.product_photo} alt={product.Name} />
      </div>
      <div className="product-details">
        <Link to={`/item/${product.id || product.asin}`} className="product-name">{product.Name[0].toUpperCase()+product.Name.slice(1) || product.product_title}</Link>
        <div className="product-rating">
          <span>
          <StarRatings
            rating={product.rating}
            starRatedColor="orange"
            starDimension="20px"
            starSpacing="5px"
          />
          </span>
          <br/><br/>
          <strong>SKU :</strong> Sku-{product.id || product.asin}
          <br/>
        </div>
        {limitedTimeDeal && product.Price !== 'N/A' && <span className="product-deal">Limited time deal</span>}
        <div className="product-price">
          { product.Price !== 'N/A' ? <span className="current-price">₹{product.Price}</span> : <div style={{color:'red'}}>
            Currently Out of Stock
          </div> }
          { product.discountPrice !== 'N/A' && <span className="original-price">M.R.P: {product.discountPrice }</span> }
          { product.discountPrice !== 'N/A' && <span className="discount">{((parseInt(product.discountPrice)-parseInt(product.Price))/(parseInt(product.discountPrice))*100).toFixed(0)}% off</span> } 
        </div>
        <button onClick={(e)=>{
              handleAddToCart(product)
              e.target.setAttribute("disabled", "true");
              setTimeout(()=>{
                e.target.removeAttribute("disabled");
              },3000)
        }} className="add-to-cart-button">Add to cart</button>
      </div>
    </div>    
    </>
  )
}

export default ProductCard