import React, { useState } from "react";
import "../style/login.css";
import { Link,useNavigate, useLocation } from "react-router-dom";
import firebaseInstance from "../firebase/firebase";
import googleImg from "../images/google.png";
import ReCAPTCHA from "react-google-recaptcha"

function Login() {

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState(null);
  const [msg,setMsg] = useState(null);

  const handleGoogleSignIn = () => {
    firebaseInstance.signInWithGoogle().then((result) => {
      navigate(from, { replace: true });
    }).catch((error) => {
      console.error(error);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError(null);
    setMsg(null);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    firebaseInstance.signIn( formData.email, formData.password ).then((user)=>{
      navigate(from, { replace: true });
    }).catch((err)=>{
      if(err.message.toLowerCase().includes('user-disabled')){
        setError("Account Disabled! Contact Admin ")
      }else{
        setError("Invalid Email ID or Password !");
      }
    })
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if(!formData.email){ 
      setError("Please Enter Email ID");
      return;
    } 
    firebaseInstance.passwordReset(formData.email).then(() => {
      setMsg("Password reset email sent. Check your inbox.");
    }).catch((error) => {
      console.error(error);
    });

  }
  return (
    <div className="container">
    <div className="login-container">
      <div className="login-box">
        <div className="logo">
          <i
            className="fa-solid fa-shield-check fa-2xl"
            style={{ color: "#74C0FC" }}
          ></i>
        </div>
        <h2>Welcome Back!</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email ID</label>
            <input
              type="email"
              placeholder="xyz@gmail.com"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <a style={{ cursor: "pointer" }} onClick={handleForgotPassword} className="forgot-password">
              Forgot Password?
            </a>
          </div>
          {error && <div className="error-message">{error}</div>}
          {msg && <div className="msg-message">{msg}</div>}
          {<ReCAPTCHA sitekey="6Ldj1l4qAAAAAJR1oGtkGMTLe42zhSz-f0d4EkFP"/>}
          <br/>
          <button type="submit" className="sign-in-btn">
            SIGN IN
          </button>
        </form>
        <div className="or-separator">OR</div>
        <button className="google-btn" onClick={handleGoogleSignIn}>
          <img src={googleImg} alt="Google Icon" /> Continue with Google
        </button>
        <div className="sign-up-link">
          Don't have an account?{" "}
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Login;
