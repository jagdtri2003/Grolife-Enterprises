// ImageSlider.js
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import '../style/imageslider.css';

const ImageSlider = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  return (
    <div style={{ width: '100%', overflow: 'hidden'}}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img className='slider-img'
              src={image} 
              loading='lazy'
              alt={`slide-${index}`} 
              style={{ width: '100%', height: '30vh',objectFit:'cover' }} 
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
