import React, { useEffect, useState } from "react";

function ProductModal({ isOpen, onClose, onSave, product }) {
  const [name, setName] = useState(product ? product.Name : "");
  const [price, setPrice] = useState(product ? product.Price : "");
  const [image, setImage] = useState(product ? product.Image : "");
  const [category, setCategory] = useState(product ? product.Category : "");
  const [featured, setFeatured] = useState(product ? product.Featured : false);

  const handleSubmit = () => {
    const productData = { Name: name, Price: price, Image: image, Category: category, Featured: featured };
    onSave(productData);
    setName("")
    setPrice("")
    setImage("")
    setCategory("")
    setFeatured(false)
  };

  useEffect(() => {
    if (product) {
      setName(product.Name);
      setPrice(product.Price);
      setImage(product.Image);
      setCategory(product.Category);
      setFeatured(product.Featured);
    } else {
      setName(""); // Clear form for adding a new product
      setPrice("");
      setImage("");
      setCategory("");
      setFeatured(false);
    }
  }, [product]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center"
    }}>
      <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", width: "45vw" }}>
        <h2>{product ? "Edit Product" : "Add New Product"}</h2>
        <div style={{ marginBottom: "10px", paddingRight: '10px' }}>
          <label>Name:</label>
          <input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "10px", paddingRight: '10px' }}
          />
        </div>
        <div style={{ marginBottom: "10px", paddingRight: '10px' }}>
          <label>Price:</label>
          <input
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "10px", paddingRight: '10px' }}
          />
        </div>
        <div style={{ marginBottom: "10px", paddingRight: '10px' }}>
          <label>Image URL:</label>
          <input
            name="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "10px", paddingRight: '10px' }}
          />
        </div>
        <div style={{ marginBottom: "10px", paddingRight: '10px' }}>
          <label>Category:</label>
          <input
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "10px", paddingRight: '10px' }}
          />
        </div>
        <div style={{ marginBottom: "10px", paddingRight: '10px' }}>
          <label>
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />
            Featured
          </label>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button onClick={onClose} style={{cursor: "pointer", padding: "10px", backgroundColor: "red", color: "white", border: "none", borderRadius: "5px" }}>
            Cancel
          </button>
          <button onClick={handleSubmit} style={{ cursor: "pointer",padding: "10px", backgroundColor: "green", color: "white", border: "none", borderRadius: "5px" }}>
            {product ? "Save Changes" : "Add Product"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
