import React,{useEffect,useState} from 'react'
import { useParams,Link } from 'react-router-dom';
import product from '../products/products';
import ProductCard from './ProductCard';
import Header from './Header';
import Footer from './Footer';

function CategoryResult() {

    useEffect(()=>{
      window.scrollTo(0, 0);
    },[])

    const [sortCriteria, setSortCriteria] = useState('None');
    const [sortedProducts, setSortedProducts] = useState([]);

    const { categoryName } = useParams();

    useEffect(() => { 

      const products = Object.values(product).filter((product)=> product.category.toLowerCase() === categoryName.toLowerCase());

      if (sortCriteria === 'Price: Low to High') {
        products.sort((a, b) => a.price - b.price);
      }else if(sortCriteria === 'Price: High to Low'){ 
        products.sort((a, b) => b.price - a.price);
      }
      
      else if (sortCriteria === 'Name') {
        products.sort((a, b) => a.name.localeCompare(b.name));
      }
      setSortedProducts(products);
    }, [categoryName, sortCriteria]);

    const handleSortChange = (e) => {
      setSortCriteria(e.target.value);
    };


  return (
    <>
    <Header/>
    <div className="breadcrumb">
        <Link to="/">Home</Link> / <span>{categoryName[0].toUpperCase()+categoryName.slice(1)}</span>
    </div>
    <div className="category" style={{maxWidth:'90vw'}}>
      <div className='category-header'>
      <h2>Showing Results for {categoryName[0].toUpperCase()+categoryName.slice(1)} ...</h2>
      <div>Sort by &nbsp;
      <select  value={sortCriteria} onChange={handleSortChange}>
        <option selected>None</option>
        <option>Price: Low to High</option>
        <option>Price: High to Low</option>
        <option>Name</option>
      </select></div>
      </div>
      <div style={{paddingBottom:'30px'}} className="product-list">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default CategoryResult;