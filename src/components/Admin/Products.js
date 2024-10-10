import React,{useEffect,useState} from "react";
import firebaseInstance from "../../firebase/firebase";
import { useTable } from "react-table"; 
import { useNavigate } from "react-router-dom";
function Products() {
    const [products,setProducts] = useState([]);
    const getProducts = async ()=>{
        const pro = await firebaseInstance.fetchProducts();
        setProducts(pro);
    }
    useEffect(()=>{
        getProducts();
    },[])  
    const navigate = useNavigate();
  // Handle edit product
  const handleEdit = (productId) => {
    console.log("Editing product with ID:", productId);
    // Add your edit logic here
  };

  // Handle delete product
  const handleDelete = async (productId) => {
    console.log("Deleting product with ID:", productId);
    // Add your delete logic here
    await firebaseInstance.deleteProduct(productId);
    getProducts();
  };

  // Define table columns
  const columns = React.useMemo(
    () => [
      {
        Header: "Image",
        accessor: "Image", // Accessor for the image URL
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
        accessor: "id", // Accessor corresponds to product ID
      },
      {
        Header: "Product Name",
        accessor: "Name", // Accessor corresponds to product data key
      },
      {
        Header: "Price",
        accessor: "Price",
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div style={{ display: "flex", gap: "7px" }}>
            <button style={{ cursor: "pointer", backgroundColor: "transparent", border: "none" }} onClick={() => handleEdit(row.original.id)}>Edit <i class="fa-regular fa-pen-to-square"></i></button>
            <button style={{ cursor: "pointer", backgroundColor: "transparent", border: "none",color:"red" }} onClick={() => handleDelete(row.original.id)}>Delete <i class="fa-solid fa-trash"></i></button>
          </div>
        ),
      },
    ],
    []
  ); 
  // Use the useTable hook
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: products,
    });
  return (
    <section style={{backgroundColor:'white',borderRadius:'10px',margin:'15px',marginBottom:'20px',padding:'10px',paddingBottom:'20px'}} className="featured-products">
      <div className="heading-container">
        <h2 className="heading">All Products</h2>
        <hr className="horizontal-rule" />
      </div>
      <div style={{ display: "flex", gap: "10px" }} className="add-new">
        <button
          style={{ cursor: "pointer", backgroundColor: "lightgreen", border: "none",padding:'10px',borderRadius:'5px' }}
          onClick={() => {
            navigate("/admin/add-product");
          }}
        >
          <i class="fa-light fa-plus"></i> Add new Product 
        </button>
        <button style={{ cursor: "pointer", backgroundColor: "lightblue", border: "none",padding:'10px',borderRadius:'5px' }} onClick={getProducts}>
          <i class="fa-solid fa-arrow-rotate-right"></i> Refresh
        </button>
      </div>
      <div className="product-table">
        {/* Render table */}
        <table {...getTableProps()} style={{ width: "100%" }}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    style={{ borderBottom: "1px solid black", padding: "10px", textAlign: "left" }}
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
                      style={{ padding: "10px", borderBottom: "1px solid black" }}
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
    </section>
  );
}

export default Products;
