import React,{useContext,useEffect,useState} from 'react';
import '../style/header.css';
import { Link,useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContex';
import firebaseInstance from '../firebase/firebase';

function Header({query}) {

  const {cart} = useContext(CartContext);
  const [search,setSearch] = useState("");

  useEffect(()=>{
    if (query){
      setSearch(query);
    }
  },[query])

  const navigate = useNavigate();

  const handleSubmit = () =>{
    if (search.trim()){
      firebaseInstance.logEvent('search',{search_term:search});
      navigate(`/search/?q=${search.toLowerCase()}`);
    }
  }
  const handleKeyDown = (e) =>{
    if(e.key ==='Enter'){
      handleSubmit();
    }
  }

  return (
    <header className="header">
      <Link to='/' className="logo">Grolife</Link>
      <input value={search} onChange={(e)=>setSearch(e.target.value)} type="text" className="search-bar" placeholder="Search for products..." onKeyDown={handleKeyDown}/>
      <span style={{cursor:'pointer'}} onClick={handleSubmit} className='search-logo' ><i className="fa-solid fa-magnifying-glass"></i></span> 
      <nav className="navigation">
        <Link className='navigation-item' to="/account"><i title='Account' className="fa-duotone fa-user"></i></Link>
        <Link className='navigation-item' to="/cart">
        <div className="cart-icon-container">
            <i title="Your Cart" className="fa-duotone fa-cart-shopping cart-icon"></i>
            <div className="cart-count" id="cart-count">{cart || 0}</div>
        </div>
          
        </Link>
      </nav>
    </header>
  );
}

export default Header;
