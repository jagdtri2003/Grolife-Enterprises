import React, { useEffect, useState } from "react";
import firebaseInstance from '../../firebase/firebase'; // Ensure this imports your Firebase setup

function ProductModal({ isOpen, onClose, onSave, product }) {
  const [name, setName] = useState(product ? product.Name : "");
  const [price, setPrice] = useState(product ? product.Price : "");
  const [image, setImage] = useState(product ? product.Image : "");
  const [category, setCategory] = useState(product ? product.Category : "");
  const [featured, setFeatured] = useState(product ? product.Featured : false);
  const [file, setFile] = useState(null); 
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = () => {
    const productData = { Name: name, Price: price, Image: image, Category: category, Featured: featured };
    onSave(productData);
    // Reset the form
    setName("");
    setPrice("");
    setImage("");
    setCategory("");
    setFeatured(false);
    setFile(null); // Reset file input
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an image to upload");
      return;
    }
    if(file.size > 300 * 1024) {
      setFile(null);
      alert("File size should not exceed 300 KB");
      return;
    }
    setIsLoading(true); // Start loading
    try {
      const url = await firebaseInstance.uploadProductPic(file, file.name);
      setImage(url); 
    } catch (error) {
      console.error("Error uploading file:", error);
    }finally{
      setIsLoading(false);
    }
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

        <div style={{ marginBottom: "10px" }}>
          <label>Name:</label>
          <input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Price:</label>
          <input
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            disabled={isLoading}
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Image URL:</label>
          <input
            name="image"
            value={image} 
            onChange={(e) => setImage(e.target.value)}
            disabled={isLoading}
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ marginBottom: "10px" }}
            disabled={isLoading}
          />
          <button onClick={handleUpload} disabled={isLoading} style={{ cursor: "pointer", padding: "8px", backgroundColor: "blue", color: "white", border: "none", borderRadius: "5px" }}>
          { isLoading ?  "Uploading Image..." : "Upload Image"}
          </button>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Category:</label>
          <input
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
            disabled={isLoading}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              disabled={isLoading}
            />
            Featured
          </label>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button disabled={isLoading} onClick={onClose} style={{ cursor: "pointer", padding: "10px", backgroundColor: "red", color: "white", border: "none", borderRadius: "5px" }}>
            Cancel
          </button>
          <button disabled={isLoading} onClick={handleSubmit} style={{ cursor: "pointer", padding: "10px", backgroundColor: "green", color: "white", border: "none", borderRadius: "5px" }}>
            {product ? "Save Changes" : "Add Product"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
