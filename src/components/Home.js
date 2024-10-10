import React from 'react'
// import {Context } from '../context/UserContext'
import Header from './Header';
// import { CartContext } from '../context/CartContex';
import ImageSlider from './ImageSlider';
import FeaturedProducts from './FeaturedProduct';
import Categories from './Categories';
import img2 from '../images/img2.jpg'
import Footer from './Footer';


function Home() {
  const images = [
    img2,
    "https://firebasestorage.googleapis.com/v0/b/ecommerce-2d02b.appspot.com/o/Black%20Gradient%20Minimalistic%20Future%20Technology%20YouTube%20Banner%20(2).jpg?alt=media&token=f2fb3a3f-ebc2-4258-8ca6-0f102e9c2147",
    'https://firebasestorage.googleapis.com/v0/b/ecommerce-2d02b.appspot.com/o/Black%20Gradient%20Minimalistic%20Future%20Technology%20YouTube%20Banner.jpg?alt=media&token=7fc226e6-5c67-41c0-8c46-224f4b9c5627',
    'https://firebasestorage.googleapis.com/v0/b/ecommerce-2d02b.appspot.com/o/Black%20Gradient%20Minimalistic%20Future%20Technology%20YouTube%20Banner%20(1).jpg?alt=media&token=78a780e1-a13b-4412-931e-67fb138f9ce1',
  ];
  // const {cart,setCart} = useContext(CartContext);
  return (
  <>
    <Header />
    <ImageSlider images={images} />
    <FeaturedProducts/>
    <Categories/>
    <Footer/>
    </>
  )
}

export default Home;

