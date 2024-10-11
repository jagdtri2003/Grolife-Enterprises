import React from 'react';
import '../style/featuredproduct.css';
import {Link} from 'react-router-dom';
import firebaseInstance from '../firebase/firebase';

function FeaturedProducts() {
    const createDiscount = () =>{
      const discount = Math.round(Math.random() * 100);
      return discount>60 ? discount-50 : discount+1;
    }
    const [featuredList, setFeaturedList] = React.useState([]);const getFeaturedProducts = async () => {
      try {
        const products = await firebaseInstance.getFeaturedProducts();
        setFeaturedList(products);
      } catch (error) {
        console.error("Error fetching featured products: ", error);
      }
    };
    React.useEffect(() => {
        getFeaturedProducts();
    },[])
  return (
    <section className="featured-products">
    <div className='heading-container'>
      <h2 className="heading">Featured Products
      </h2>
      <hr className='horizontal-rule'/>
      </div>
      <div className="product-carousel">
        {featuredList && featuredList.map((item,index) => (
            <Link to={`/item/${item[1]}`} className="product-card" key={index}>
                <img style={{height:'80%'}} loading='lazy' src={item[0]} alt="" />
                <div className='discount'> <span className='discount-per'>{createDiscount()}% off</span> Limited time deal</div>
            </Link>
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;
