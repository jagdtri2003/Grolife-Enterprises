import React, { useState } from 'react';
import "../style/adressmodal.css"

const AddressModal = ({ isOpen, onClose, onSubmit }) => {
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

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
