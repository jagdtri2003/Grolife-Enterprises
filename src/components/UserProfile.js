import React,{useState,useEffect} from 'react';
import '../style/userprofile.css';
import Header from './Header';
import firebaseInstance from '../firebase/firebase.js';
import { updateProfile } from 'firebase/auth';

const UserProfile =  ({ user }) => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const localOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(localOrders);

    firebaseInstance.getOrderHistory(user.uid).then((querySnapshot) => {
      if (!querySnapshot.empty) {
        const firebaseOrders = [];
        querySnapshot.forEach((doc) => {
          firebaseOrders.push(doc.data());
        });
        setOrders(firebaseOrders);
        localStorage.setItem('orders', JSON.stringify(firebaseOrders));
      }
    });
  }, [user.uid]);

  const updatePic = () => {
    const fileInput = document.getElementById('upload-pic');
    fileInput.click();
  
    fileInput.onchange = async () => {
      const file = fileInput.files[0];
      // console.log(photo);
      try {
        const url = await firebaseInstance.uploadProfilePic(file,user.uid);
        // console.log(url);
  
        if (user) {
          await updateProfile(user, { photoURL: url });
          document.getElementById('profile-img').src=url;
          console.log('Profile updated successfully');
        } else {
          console.error('No authenticated user');
        }
      } catch (error) {
        console.error('Error uploading file and updating profile:', error);
      }
    };
  };

  return (
    <>
    <Header/>
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',marginTop:'30px',paddingBottom:'30px'}}>
    <div className="user-profile">
      <h1>User Profile</h1>
      <div className="user-info">
      <div className="profile-image-container">  
      <img id="profile-img" src={user.photoURL?user.photoURL:`https://via.placeholder.com/300x200.png?text=${user.displayName.charAt(0)}`} alt="Profile" className="profile-image" />
      <i onClick={updatePic} class="fa-duotone fa-user-pen edit-icon"></i>
      <input id='upload-pic' type='file' accept="image/*" hidden/>
      </div>
      <div className="user-details">
      <h2>{user.displayName}  <i title='Logout' onClick={()=>{
        localStorage.setItem('cartItems',JSON.stringify([]));
        firebaseInstance.signOut();
      }} style={{color:'red',cursor:'pointer'}} className="fa-solid fa-right-from-bracket"></i></h2>
      <p>Email: {user.email} {  !user.emailVerified && (<i title='Email not Verified !' style={{color:'red'}} class="fa-regular fa-circle-exclamation"></i>)} </p>
      </div>
      </div>
      <div className="order-history">
        <h2>Order History</h2>
        {orders.length > 0 ? (
          <ul>
            {orders.map((order) => (
              <li key={order.paymentId}>
                <p>Order ID: {order.paymentId.slice(4)}</p>
                <p>Date: {order.date}</p>
                <p>Total: ₹ {order.total}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
    </div>
    </>
  );
};

export default UserProfile;
