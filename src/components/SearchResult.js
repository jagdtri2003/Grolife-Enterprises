import React, { useState, useEffect } from "react";
import Header from "./Header";
import { useSearchParams, Link,useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import Footer from "./Footer";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import '../style/pagination.css';
import { setItemTillMidnight, getItemWithExpiry } from "../util/localStorage";
import firebaseInstance from "../firebase/firebase";

function SearchResult() {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q");
  const [sortCriteria, setSortCriteria] = useState("None");
  const [sortedProducts, setSortedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProducts = async () => {
      setLoading(true);
      setProducts([]); // Clear previous products
      setSortedProducts([]); // Clear previous sorted products
      if (getItemWithExpiry(query.toLowerCase())) {
        setProducts(JSON.parse(getItemWithExpiry(query.toLowerCase())));
        setSortedProducts(JSON.parse(getItemWithExpiry(query.toLowerCase())));
        setLoading(false);
        return;
      }
      try {
        const product = await firebaseInstance.searchProducts(query);
        console.log(product);
        setItemTillMidnight(query.toLowerCase(), JSON.stringify(product));
        setProducts(product);
        setSortedProducts(product);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [query]);

  useEffect(() => {
    let sorted = [...products];
    if (sortCriteria === "Price: Low to High") {
      sorted = sorted.sort(
        (a, b) =>
          parseInt(a.price.replace(",", "")) -
          parseInt(b.price.replace(",", ""))
      );
    } else if (sortCriteria === "Price: High to Low") {
      sorted = sorted.sort(
        (a, b) =>
          parseInt(b.price.replace(",", "")) -
          parseInt(a.price.replace(",", ""))
      );
    } else if (sortCriteria === "Name") {
      sorted = sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
    setSortedProducts(sorted);
  }, [sortCriteria, products]);

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
  };

  return (
    <>
      <Header query={query} />
      <div className="breadcrumb">
        <Link to="/">Home</Link> /search=
        <span>{query[0].toUpperCase() + query.slice(1).toLowerCase()}</span>
      </div>
      <div className="category" style={{ maxWidth: "90vw" }}>
        <div className="category-header">
          <h2>
            Showing Results for {query[0].toUpperCase() + query.slice(1).toLowerCase()} ...
          </h2>
          <div>
            Sort by &nbsp;
            <select
              style={{ padding: "5px", borderRadius: "10px" }}
              value={sortCriteria}
              onChange={handleSortChange}
            >
              <option>Relevance</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Name</option>
            </select>
          </div>
        </div>
        {loading ? (
          <div style={{ paddingBottom: "30px" }} className="product-list">
            {Array(10)
              .fill()
              .map((_, index) => (
                <div key={index} className="product-card2">
                  <div className="product-image">
                    <Skeleton style={{minWidth:'200px'}} height={200} />
                  </div>
                  <div className="product-details">
                    <Skeleton
                      style={{ marginBottom: "12px" }}
                      height={30}
                      count={4}
                      className="skeleton-details"
                    />
                  </div>
                </div>
              ))}
          </div>
        ) : sortedProducts.length > 0 ? (
          <div style={{ paddingBottom: "30px" }} className="product-list">
            {sortedProducts.map((product, index) => (
              <ProductCard key={`${product.asin}-${index}`} product={product} />
            ))}
            <br/>
          </div>
        ) : (
          <div
            className="category"
            style={{
              maxWidth: "90vw",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "43vh",
            }}
          >
            <h2>
              Sorry, no result found for{" "}
              {query[0].toUpperCase() + query.slice(1)}.
              <h5>Try checking your spelling or use more general terms</h5>
            </h2>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default SearchResult;
