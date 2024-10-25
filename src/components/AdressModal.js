import React, { useState } from 'react';
import "../style/adressmodal.css"

const AddressModal = ({ isOpen, onClose, onSubmit }) => {
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [locationLoading,setLocationLoading] = useState(false);

  React.useEffect(()=>{
      if(localStorage.getItem('address') && localStorage.getItem('phoneNumber')) {
        setAddress(localStorage.getItem('address'));
        setPhoneNumber(localStorage.getItem('phoneNumber'));
      }
  },[])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (address && phoneNumber) {
      localStorage.setItem('address', address);
      localStorage.setItem('phoneNumber', phoneNumber);
      onSubmit({ address, phoneNumber });
      onClose(); 
    }
  };
  const handleCurrentLocation = () => {
    setLocationLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        
        const options = {method: 'GET', headers: {accept: 'application/json'}};

        fetch(`https://us1.locationiq.com/v1/reverse?lat=${latitude}&lon=${longitude}&format=json&key=pk.4cb6822cb40a515d8d8c5f7d02cca2ca`, options)
          .then(res => res.json())
          .then(res => setAddress(res.display_name))
          .catch(err => console.error(err));
      }, 
      (error) => {
        console.error("Error getting location:", error);
        alert("Unable to retrieve your location.");
      });
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Enter Delivery Details</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="address">Address:</label>
            <textarea
              rows={4}
              cols={50}
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <hr style={{ flex: 1, maxWidth: '48%' }} />
            <span style={{ padding: '0 10px' }}>OR</span>
            <hr style={{ flex: 1, maxWidth: '48%' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center',justifyContent: 'center' }}>
            <button type='button'  onClick={handleCurrentLocation}
            disabled={locationLoading}
            style={{ width: '100%',maxWidth: '250px',padding: '10px 20px',marginBottom:'10px',borderRadius:'5px',backgroundColor:'black',color:'white',cursor:'pointer' }}>Use Current Location &nbsp;<i className="fa-solid fa-location-dot"></i></button> 
          </div>
          <div>
            <label htmlFor="phone">Phone Number:</label>
            <input
              type="tel"
              id="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <button className='submit-btn' type="submit">PLACE ORDER</button>
          <button className='cancel-btn' type="button" onClick={onClose}>CANCEL</button>
        </form>
      </div>
    </div>
  );
};

export default AddressModal;
