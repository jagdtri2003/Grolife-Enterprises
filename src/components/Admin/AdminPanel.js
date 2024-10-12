import React,{useEffect,useState} from 'react'
import firebaseInstance from '../../firebase/firebase'
import { useNavigate, useLocation,Link } from 'react-router-dom';
import Products from './Products';
import Orders from './Orders';
function AdminPanel() {
  const [authorised, setAuthorised] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const checkRole = async () => {
    const user = firebaseInstance.auth.currentUser;
    const role = (await firebaseInstance.getUser(user.uid)).data().role;
    if(role === 'admin'){
      setAuthorised(true);
    }else{
      console.log(role)
    }
    setLoading(false);
  }
  useEffect(()=>{
    document.title = "Grolife Enterprises - Admin";
    if (firebaseInstance.auth.currentUser === null) {
      navigate("/login", { state: { from: location } });
    }else{
      checkRole();
    }
  },[])
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1000);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (isSmallScreen) {
    return (
      <div className='centered-container'>
        <div style={{ color: 'red', fontSize: '25px' }}>
          This page is best viewed on a Larger Screen<br />
          Please open this page on a Larger Screen
        </div>
      </div>
    );
  }
  if (loading) {
    return(
      <div className='centered-container'>
        <div className="spinner-7"></div>
      </div>  
    );
  }
  return (
    authorised ? <>
      <div className="admin-panel" style={{display:'flex',gap:'50vw'}}>
        <h1 style={{padding:'10px'}}> <Link to={"/"} style={{textDecoration:'none',color:'inherit',fontWeight:'bold'}}>Grolife Enterprises</Link> - Admin Panel</h1>
        <h3 style={{padding:'10px'}}>Welcome,<br/> {firebaseInstance.auth.currentUser.displayName}</h3>
      </div> 
      <div>
        <Products/>
        <Orders/>
      <div style={{minHeight:'10px'}}></div>
      </div>   
    </> : <div style={{height:'100vh',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}} >
      <h1 style={{color:'red',marginBottom:'-16px'}}>Unauthorized Access</h1>
      <p style={{color:'red'}}>Only Admins can access this page</p>
      <Link to="/" className="continue-shopping-button">
              GO BACK TO HOME &nbsp;
        <i className="fa-light fa-arrow-right"></i>
      </Link>
    </div>
  )
}

export default AdminPanel