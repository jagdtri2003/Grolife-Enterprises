import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import {UserContext} from './context/UserContext';
import Signup from './components/Signup';
import { useState,useEffect } from 'react';
import firebaseInstance from './firebase/firebase';
import './App.css';
import { CartProvider } from './context/CartContex';
import UserProfile from './components/UserProfile';
import ItemComponent from './components/ItemComponent';
import Cart from './components/Cart';
import { ToastContainer } from 'react-toastify';
import ContactUs from './components/ContactUs';
import CategoryResult from './components/CategoryResult';
import SearchResult from './components/SearchResult';
import Page404 from './components/Page404';
import AdminPanel from './components/Admin/AdminPanel';


function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebaseInstance.auth.onAuthStateChanged( (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
      setInterval(() => {
        setLoading(false);
      },250);
  
    });

    return () => unsubscribe();
  }, []);


  if (loading) {
    // Render a loading indicator while checking authentication state
    return(
      <div className='centered-container'>
        <div className="spinner-7"></div>
      </div>  
    );
  }

  return (
    <>
    <CartProvider>
    <UserContext>
    <ToastContainer/>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/about' element={<h1>About</h1>}></Route>
        <Route path='/login' element={!user ?<Login/>:<Navigate to='/'/>}></Route>
        <Route path='/signup' element={!user ? <Signup/> : <Navigate to='/'/>}></Route>
        <Route path='/account' element={!user ? <Login/> : <UserProfile user={user}/>}></Route>
        <Route path="/item/:id" element={<ItemComponent/>} />
        <Route path='/cart' element={<Cart user={user}/>} />
        <Route path='/contact' element={<ContactUs/>}/>
        <Route path='/category/:categoryName' element={<CategoryResult/>}/>
        <Route path='/search' element={<SearchResult/>}/>
        <Route path='/admin' element={<AdminPanel/>}/>
        <Route path='*' element={<Page404/>}/>
      </Routes>
    </Router>
    </UserContext>
    </CartProvider>
    </>
  );
}

export default App;
