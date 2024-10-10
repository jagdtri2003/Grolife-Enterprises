import React from 'react';
import '../style/featuredproduct.css';
import {Link} from 'react-router-dom';

function FeaturedProducts() {
    const createDiscount = () =>{
      const discount = Math.round(Math.random() * 100);
      return discount>60 ? discount-50 : discount+1;
    }
    const featuredList = [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz0Sds1LwjVmAC8qgXOb2-NQipIjkWWXyVSg&s',
        'https://kinclimg3.bluestone.com/f_jpg,c_scale,w_828,q_80,b_rgb:f0f0f0/giproduct/BIDG0319R180_YAA18DIG6XXXXXXXX_ABCD00-PICS-00001-1024-66194.png',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKqaVlTzAjkWzG8_QJFqQRevGRCBcOefiPLw&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgW8FHvRuH6AlUkCe481pnxZeQq4DAWHMdmA&s',
        'https://cdn.thewirecutter.com/wp-content/media/2023/10/smartphone-2048px-4861.jpg?auto=webp&quality=30&width=1024',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn2yscgkxDOnZgwVJQt6Pa8VGrfBfJe5D5pA&s',
    ]
  return (
    <section className="featured-products">
    <div className='heading-container'>
      <h2 className="heading">Featured Products
      </h2>
      <hr className='horizontal-rule'/>
      </div>
      <div className="product-carousel">
        {featuredList.map((item, index) => (
            <Link to={`/item/100${index+1}`} className="product-card" key={index}>
                <img style={{height:'80%'}} loading='lazy' src={item} alt="" />
                <div className='discount'> <span className='discount-per'>{createDiscount()}% off</span> Limited time deal</div>
            </Link>
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;
