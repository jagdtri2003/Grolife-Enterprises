import React from 'react';
import '../style/featuredproduct.css';
import {Link} from 'react-router-dom';

function FeaturedProducts({products,loading}) {
  return (
    <section className="featured-products">
      {loading && <div style={{width:'100vw',display:'flex',justifyContent:'center',alignItems:'center'}}><i className="fa-duotone fa-solid fa-loader fa-spin-pulse" style={{fontSize:'50px'}}></i></div>}
      {(!loading) && 
      <>
      <div className='heading-container'>
        <h2 className="heading">Featured Products
        </h2>
        <hr className='horizontal-rule'/>
        </div>
        <div className="product-carousel">
          {products && products.map((item,index) => (
              <Link to={`/item/${item.id}`} className="product-card" key={index}>
                  <img style={{height:'80%'}} loading='lazy' src={item.Image} alt="" />
                  <div className='discount'> <span style={{marginRight:'20px'}} className='discount-per'>Trending Now</span> Limited time deal</div>
              </Link>
          ))}
        </div></>}
    </section>
  );
}

export default FeaturedProducts;
