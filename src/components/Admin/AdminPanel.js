import React,{useEffect,useState} from 'react'
import firebaseInstance from '../../firebase/firebase'
import { Link } from 'react-router-dom';
function AdminPanel() {
  const [authorised, setAuthorised] = useState(false);
  const checkRole = async () => {
    const user = firebaseInstance.auth.currentUser;
    const role = (await firebaseInstance.getUser(user.uid)).data().role;
    if(role === 'admin'){
      setAuthorised(true);
    }else{
      console.log(role)
    }
  }
  useEffect(()=>{
    document.title = "Grolife Enterprises - Admin";
    checkRole();
  },[])
  return (
    authorised ? <h1>Admin Panel</h1> : <div style={{height:'100vh',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}} >
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