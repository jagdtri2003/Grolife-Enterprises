import React,{useContext,useEffect,useState} from 'react';
import '../style/header.css';
import { Link,useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContex';

function Header({query}) {

  const {cart} = useContext(CartContext);
  const [search,setSearch] = useState("");
  const [isListening, setIsListening] = useState(false);
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';
  const navigate = useNavigate();

  const handleSubmit = () =>{
    if (search.trim()){
      navigate(`/search/?q=${search.toLowerCase()}`);
    }
  }

  const startListening = () => {
    setIsListening(true);
    recognition.start();
  };

  const stopListening = () => {
    setIsListening(false);
    recognition.stop();
  };

  recognition.onresult = (event) => {
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }
    setSearch(transcript);
    if(transcript.trim()){
      navigate(`/search/?q=${transcript.toLowerCase()}`);
    }
  };  
  recognition.onend = () => {
    setIsListening(false);  
  };

  useEffect(()=>{
    if (query){
      setSearch(query);
    }
  },[query])

  const handleKeyDown = (e) =>{
    if(e.key ==='Enter'){
      handleSubmit();
    }
  }

  return (
    <header className="header">
      <Link to='/' className="logo">Grolife</Link>
      <input value={search} onChange={(e)=>setSearch(e.target.value)} type="text" className="search-bar" placeholder="Search for products..." onKeyDown={handleKeyDown}/>
      <span style={{cursor:'pointer'}} className='search-logo' ><i className={!isListening ? "fa-solid fa-microphone" : "fa-solid fa-microphone-slash"} onClick={isListening ? stopListening : startListening}></i>&nbsp;&nbsp;<i onClick={handleSubmit} className="fa-solid fa-magnifying-glass"></i></span> 
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
