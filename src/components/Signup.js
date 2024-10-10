import React,{useState} from "react";
import "../style/login.css"; 
import googleImg from '../images/google.png';
import { Link } from "react-router-dom";
import firebaseInstance from "../firebase/firebase";
import { sendEmailVerification, updateProfile } from "firebase/auth";

function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name:""
  });
  const [error, setError] = useState(null);

  const handleGoogleSignIn = () => {
    firebaseInstance.signInWithGoogle().then((result) => {
      console.log(result);
    }).catch((error) => {
      console.error(error);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError(null);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    firebaseInstance.createAccount( formData.email, formData.password ).catch((err)=>{
      setError("Email already exists");
    }).then(async (userCredential)=>{
      const user = userCredential.user;
      await updateProfile(user,{displayName:formData.name});
      sendEmailVerification(firebaseInstance.auth.currentUser);
    })

  };

  return (
    <div className="container">
    <div className="login-container">
      <div className="login-box">
        <div className="logo">
          <i className="fa-solid fa-shield-check fa-2xl" style={{ color: "#74C0FC" }}></i>
        </div>
        <h2>Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input type="text" onChange={handleChange} value={formData.name} placeholder="Enter your name" id="name" name="name" required />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email ID</label>
            <input type="email" onChange={handleChange} value={formData.email} placeholder="xyz@gmail.com" id="email" name="email" required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" onChange={handleChange} value={formData.password} id="password" name="password" required />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="sign-in-btn">SIGN UP</button>
        </form>
        <div className="or-separator">OR</div>
        <button className="google-btn" onClick={handleGoogleSignIn}>
          <img src={googleImg} alt="Google Icon" /> Continue with Google
        </button>
        <div className="sign-up-link">
          Already have an account? <a><Link to="/login">Login</Link></a>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Signup;
