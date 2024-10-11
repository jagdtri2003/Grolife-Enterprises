import React, { useState, useEffect, useMemo } from 'react';
import '../style/userprofile.css';
import Header from './Header';
import firebaseInstance from '../firebase/firebase.js';
import { updateProfile } from 'firebase/auth';
import { useTable } from 'react-table';

const UserProfile = ({ user }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const localOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(localOrders);

    firebaseInstance.getOrderHistory(user.uid).then((querySnapshot) => {
      if (!querySnapshot.empty) {
        const firebaseOrders = [];
        querySnapshot.forEach((doc) => {
          firebaseOrders.push({ ...doc.data(), id: doc.id });
        });
        setOrders(firebaseOrders);
        localStorage.setItem('orders', JSON.stringify(firebaseOrders));
      } else {
        setOrders([]);
        localStorage.setItem('orders', JSON.stringify([]));
      }
    });
  }, [user.uid]);

  const updatePic = () => {
    const fileInput = document.getElementById('upload-pic');
    fileInput.click();

    fileInput.onchange = async () => {
      const file = fileInput.files[0];
      try {
        const url = await firebaseInstance.uploadProfilePic(file, user.uid);
        if (user) {
          await updateProfile(user, { photoURL: url });
          document.getElementById('profile-img').src = url;
          console.log('Profile updated successfully');
        } else {
          console.error('No authenticated user');
        }
      } catch (error) {
        console.error('Error uploading file and updating profile:', error);
      }
    };
  };

  // Define the columns for the React Table
  const columns = useMemo(
    () => [
      {
        Header: 'Order ID',
        accessor: 'id', // accessor is the key in the order object
      },
      {
        Header: 'Date',
        accessor: 'date',
      },
      {
        Header: 'Items',
        accessor: 'items',
        Cell: ({ value }) => (
          <ul style={{ padding: 0 }}>
            {value.map((item, index) => (
              <li key={index}>{item.name} ({item.quantity})</li>
            ))}
          </ul>
        ),
      },
      {
        Header: 'Total',
        accessor: 'total',
        Cell: ({ value }) => `₹${value}`,
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ value }) => (
          <span style={{ color: value === 'Delivered' ? 'green' : value === 'Cancelled' ? 'red' : 'grey', fontWeight: 'bold' }}>
            {value}
          </span>
        ),
      },
    ],
    []
  );

  // Use the orders as the data for the table
  const data = useMemo(() => orders, [orders]);

  const tableInstance = useTable({ columns, data });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <>
      <Header />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '30px', paddingBottom: '30px' }}>
        <div className="user-profile">
          <h1>User Profile</h1>
          <div className="user-info">
            <div className="profile-image-container">
              <img id="profile-img" src={user.photoURL ? user.photoURL : `https://placehold.co/300x200?text=${user.displayName.charAt(0)}`} alt="Profile" className="profile-image" />
              <i onClick={updatePic} className="fa-duotone fa-user-pen edit-icon"></i>
              <input id='upload-pic' type='file' accept="image/*" hidden />
            </div>
            <div className="user-details">
              <h2>{user.displayName} <i title='Logout' onClick={() => {
                localStorage.setItem('cartItems', JSON.stringify([]));
                firebaseInstance.signOut();
              }} style={{ color: 'red', cursor: 'pointer' }} className="fa-solid fa-right-from-bracket"></i></h2>
              <p>Email: {user.email} { !user.emailVerified && (<i title='Email not Verified !' style={{ color: 'red' }} className="fa-regular fa-circle-exclamation"></i>)}</p>
            </div>
          </div>
          <div className="order-history">
            <h2>Order History</h2>
            {orders.length > 0 ? (
              <table {...getTableProps()} style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                  {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()} style={{ borderBottom: '2px solid #ddd' }}>
                      {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()} style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>
                          {column.render('Header')}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map(row => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()} style={{ borderBottom: '1px solid #ddd' }}>
                        {row.cells.map(cell => (
                          <td {...cell.getCellProps()} style={{ padding: '10px', textAlign: 'left' }}>
                            {cell.render('Cell')}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
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
