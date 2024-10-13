import React, { useEffect, useState } from "react";
import firebaseInstance from "../../firebase/firebase";
import { useTable } from "react-table";
import ProductModal from "./ProductModal"; // Import the modal component
import { confirmAlert } from 'react-confirm-alert'; // Import the confirmation library
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import default styles

function Products() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false); // Modal state
  const [editProduct, setEditProduct] = useState(null); // Product to edit

  const getProducts = async () => {
    setProducts([]);
    const pro = await firebaseInstance.fetchProducts();
    setProducts(pro);
  };

  useEffect(() => {
    getProducts();
  }, []);


  const handleEdit = (productId) => {
      const product = products.find((p) => p.id === productId);
      setEditProduct(product);
      setModalOpen(true);
  };

  const handleDelete = (productId) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to delete this product?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              await firebaseInstance.removeProduct(productId); // Wait for deletion
              console.log("Product deleted successfully.");
              await getProducts(); // Refresh product list
            } catch (error) {
              console.error("Error deleting product: ", error);
            }
          }
        },
        {
          label: "No",
          onClick: () => console.log("Deletion cancelled")
        }
      ]
    });
  };

  const handleSaveProduct = async (productData) => {
    if (editProduct) {
      await firebaseInstance.updateProduct(editProduct.id, productData);
    } else {
      await firebaseInstance.addProduct(productData);
    }
    await getProducts(); // Refresh products list
    setModalOpen(false); // Close the modal
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Image",
        accessor: "Image",
        Cell: ({ row }) => (
          <img
            src={row.original.Image}
            alt={row.original.Name}
            style={{ width: "60px", height: "60px", objectFit: "cover" }}
          />
        ),
      },
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Product Name",
        accessor: "Name",
        Cell: ({ value }) => (
          <>
            {value[0].toUpperCase() + value.slice(1).toLowerCase()}
          </>
        ),
      },
      {
        Header: "Category",
        accessor: "Category",
        Cell: ({ value }) => (
          <>
            {value[0].toUpperCase() + value.slice(1).toLowerCase()}
          </>
        ),
      },
      {
        Header: "Price",
        accessor: "Price",
        Cell: ({ value }) => (
          <>
            ₹{new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(value)}
          </>
        ),        
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div style={{ display: "flex", gap: "7px" }}>
            <button
              style={{ cursor: "pointer", backgroundColor: "transparent", border: "none" }}
              onClick={() => handleEdit(row.original.id)}
            >
              Edit <i className="fa-regular fa-pen-to-square"></i>
            </button>
            <button
              style={{ cursor: "pointer", backgroundColor: "transparent", border: "none", color: "red" }}
              onClick={() => handleDelete(row.original.id)}
            >
              Delete <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        ),
      },
    ],
    [products]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: products,
    });

  return (
    <section
      style={{
        backgroundColor: "white",
        borderRadius: "10px",
        margin: "15px",
        marginBottom: "20px",
        padding: "10px",
        paddingBottom: "20px",
      }}
      className="featured-products"
    >
      <div className="heading-container">
        <h2 className="heading">All Products</h2>
        <hr className="horizontal-rule" />
      </div>
      <div style={{ display: "flex", gap: "10px" }} className="add-new">
        <button
          style={{
            cursor: "pointer",
            backgroundColor: "lightgreen",
            border: "none",
            padding: "10px",
            borderRadius: "5px",
          }}
          onClick={() => {
            setEditProduct(null); // Reset edit product
            setModalOpen(true); // Open modal for adding new product
          }}
        >
          <i className="fa-light fa-plus"></i> Add new Product
        </button>
        <button
          style={{
            cursor: "pointer",
            backgroundColor: "lightblue",
            border: "none",
            padding: "10px",
            borderRadius: "5px",
          }}
          onClick={getProducts}
        >
          <i className="fa-solid fa-arrow-rotate-right"></i> Refresh
        </button>
      </div>
      <div className="product-table">
        <table {...getTableProps()} style={{ width: "100%" }}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    style={{
                      borderBottom: "1px solid black",
                      padding: "10px",
                      textAlign: "left",
                    }}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: "10px",
                        borderBottom: "1px solid black",
                      }}
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Render the modal for adding/editing products */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => {setModalOpen(false) 
          setEditProduct(null)
        }}
        onSave={handleSaveProduct}
        product={editProduct}
      />
    </section>
  );
}

export default Products;
