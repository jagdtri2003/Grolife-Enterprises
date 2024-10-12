import React, { useMemo, useState, useEffect } from 'react';
import { useTable } from 'react-table';
import firebaseInstance from '../../firebase/firebase';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState(''); // To track the status filter

  const getOrders = async () => {
    try {
      const fetchedOrders = await firebaseInstance.getAllOrderHistory();
      setOrders(fetchedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  // Handle order status change
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      // Call Firebase or your backend to update the status
      await firebaseInstance.updateOrderStatus(orderId, newStatus);
      // After successfully updating, reflect the change in UI
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  // Handle status filter change
  const handleFilterChange = (status) => {
    setStatusFilter(status);
  };

  const columns = useMemo(
    () => [
      {
        Header: 'Order ID',
        accessor: 'id',
      },
      {
        Header: 'Customer Name',
        accessor: 'name', 
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
        Header: 'Total Price',
        accessor: 'total', // Showing total price for the order
        Cell: ({ value }) => `₹${value}`,
      },
      {
        Header: 'Date',
        accessor: 'date', // Date when the order was placed
      },
      {
        Header: 'Phone Number',
        accessor: 'phoneNumber', // Phone number of the customer
      },
      {
        Header: 'Address',
        accessor: 'address', // Display the shipping address of the customer
        Cell: ({ value }) => (
          <p style={{ margin: 0 }}>{value}</p>
        ),
      },
      {
        Header: 'Status',
        accessor: 'status', // Display the current status of the order with a dropdown to change it
        Cell: ({ row, value }) => (
          <select
            value={value}
            onChange={(e) => handleStatusChange(row.original.id, e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        ),
      },
    ],
    []
  );

  // Filter orders based on the selected status filter
  const filteredOrders = useMemo(() => {
    if (statusFilter === '') {
      return orders; // If no filter is selected, show all orders
    }
    return orders.filter(order => order.status === statusFilter);
  }, [orders, statusFilter]);

  const tableInstance = useTable({ columns, data: filteredOrders });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <section style={{ backgroundColor: 'white', borderRadius: '10px', margin: '15px', padding: '20px', marginBottom: '40px'}}>
      <div className="heading-container">
        <h2 className="heading">Orders</h2>
        <hr className="horizontal-rule" />
      </div>
      <div style={{ display: 'flex', gap: '30px', marginBottom: '20px' }}>
        <button
          style={{ backgroundColor: statusFilter === 'Pending' ? 'grey' : 'transparent', color: statusFilter === 'Pending' ? 'white' : 'black',cursor: 'pointer' }}
          onClick={() => handleFilterChange('Pending')}
          className='continue-shopping-button'
        >
          <i className="fa-regular fa-clock"></i> &nbsp;PENDING
        </button>
        <button
          style={{ backgroundColor: statusFilter === 'Delivered' ? '#4CAF50' : 'transparent', color: statusFilter === 'Delivered' ? 'white' : 'black',cursor: 'pointer' }}
          onClick={() => handleFilterChange('Delivered')}
          className='continue-shopping-button'
        >
          <i className="fa-solid fa-check"></i> &nbsp;DELIVERED
        </button>
        <button
          style={{ backgroundColor: statusFilter === 'Cancelled' ? 'red' : 'transparent', color: statusFilter === 'Cancelled' ? 'white' : 'black',cursor: 'pointer' }}
          onClick={() => handleFilterChange('Cancelled')}
          className='continue-shopping-button'
        >
          <i className="fa-solid fa-xmark"></i> &nbsp;CANCELLED
        </button>
      </div>
      {loading ? <p>Loading orders...</p> : (
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
      )}
    </section>
  );
};

export default Orders;
