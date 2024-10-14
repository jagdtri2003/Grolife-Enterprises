import React, { useEffect, useState } from 'react';
import Header from './Header';
import ImageSlider from './ImageSlider';
import FeaturedProducts from './FeaturedProduct';
import Categories from './Categories';
import img2 from '../images/img2.jpg';
import Footer from './Footer';
import firebaseInstance from '../firebase/firebase';
import ProductCategory from './ProductCategory';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [featuredItems, setFeaturedItems] = useState([]);

  const getProductWithCategory = async () => {
    setLoading(true);
    
    // Check session storage
    const cachedProducts = sessionStorage.getItem('user-products');
    if (cachedProducts) {
      const parsedProducts = JSON.parse(cachedProducts);
      setProducts(parsedProducts);
      setLoading(false);
      return;
    }

    // Fetch from Firebase if not in session storage
    const data = await firebaseInstance.fetchProductsByCategory();
    sessionStorage.setItem('user-products', JSON.stringify(data));
    setProducts(data);
    setLoading(false);
  };

  // Recalculate featured items when products state changes
  useEffect(() => {
    if (products.length > 0) {
      const featuredItems = products.flatMap(category => 
        category.items.filter(item => item.Featured)
      );
      setFeaturedItems(featuredItems);
    }
  }, [products]); // <-- This ensures that featuredItems is recalculated when products change

  useEffect(() => {
    getProductWithCategory();
  }, []);

  const images = [
    img2,
    "https://firebasestorage.googleapis.com/v0/b/ecommerce-2d02b.appspot.com/o/Black%20Gradient%20Minimalistic%20Future%20Technology%20YouTube%20Banner%20(2).jpg?alt=media&token=f2fb3a3f-ebc2-4258-8ca6-0f102e9c2147",
    'https://firebasestorage.googleapis.com/v0/b/ecommerce-2d02b.appspot.com/o/Black%20Gradient%20Minimalistic%20Future%20Technology%20YouTube%20Banner.jpg?alt=media&token=7fc226e6-5c67-41c0-8c46-224f4b9c5627',
    'https://firebasestorage.googleapis.com/v0/b/ecommerce-2d02b.appspot.com/o/Black%20Gradient%20Minimalistic%20Future%20Technology%20YouTube%20Banner%20(1).jpg?alt=media&token=78a780e1-a13b-4412-931e-67fb138f9ce1',
  ];

  return (
    <>
      <Header />
      <ImageSlider images={images} />
      <FeaturedProducts products={featuredItems} loading={loading} />
      <Categories />
      {loading && (
        <div style={{ width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <i className="fa-duotone fa-solid fa-loader fa-spin-pulse" style={{ fontSize: '50px' }}></i>
        </div>
      )}
      {!loading && products.map((product, index) => (
        <ProductCategory key={index} category={product.category} items={product.items} />
      ))}
      <Footer />
    </>
  );
}

export default Home;
