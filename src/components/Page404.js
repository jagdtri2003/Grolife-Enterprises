import React from 'react';
import { Link } from 'react-router-dom';

function Page404() {
  return (
    <>
    <div style={{width:'100vw',height:'80vh',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
      <div>
      <h1 style={{fontSize:'3.5rem'}}>404 Error </h1>
      <p>This Page Doesn't Exist !!</p>
      <br/>
      <Link to={''}><button  className='add-to-cart'>Go To Home</button></Link>
      </div>
    </div>
    </>
  )
}

export default Page404;