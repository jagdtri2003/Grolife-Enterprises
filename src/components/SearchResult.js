import React, { useState, useEffect } from "react";
import Header from "./Header";
import { useSearchParams, Link,useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import Footer from "./Footer";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { failToast } from "./ToastComponent";
import ReactPaginate from "react-paginate";
import '../style/pagination.css';
import { setItemTillMidnight, getItemWithExpiry } from "../util/localStorage";

function SearchResult() {


  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q");
  const page = searchParams.get("page") || 1; 

  const [sortCriteria, setSortCriteria] = useState("None");
  const [sortedProducts, setSortedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(localStorage.getItem("totalPages-"+query.toLowerCase()) || 1);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProducts = async () => {
      setLoading(true);
      setProducts([]); // Clear previous products
      setSortedProducts([]); // Clear previous sorted products
      if (getItemWithExpiry(query.toLowerCase()+page)) {
        setProducts(JSON.parse(getItemWithExpiry(query.toLowerCase()+page)));
        setSortedProducts(JSON.parse(getItemWithExpiry(query.toLowerCase()+page)));
        setLoading(false);
        return;
      }
      try {
        const url = `https://test-axios-iota.vercel.app/search/?q=${query}`;
        const response = await fetch(url);
        const temp = await response.json();
        if (response.status !== 200) {
          failToast("Something went wrong!! Please Wait !");
          fetchProducts();
          return;
        }
        setTotalPages(temp.pages);
        localStorage.setItem("totalPages-"+query.toLowerCase(), temp.pages);
        setItemTillMidnight(query.toLowerCase()+page, JSON.stringify(temp.item));
        setProducts(temp.item);
        setSortedProducts(temp.item);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [query,page]);

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

  function updateLinkText() {
    try{
      if (window.innerWidth <= 650) {
        document.querySelector('.prev-item a').textContent = '<';
        document.querySelector('.next-item a').textContent = '>';
      } else {
        document.querySelector('.prev-item a').textContent = '< Previous';
        document.querySelector('.next-item a').textContent = 'Next >';
      }
    }catch(err){
      console.log(err);
    }
  }
  updateLinkText();
  // Add an event listener to handle window resize
  window.addEventListener('resize', updateLinkText);

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
            <ReactPaginate
              breakLabel="..."
              nextLabel="Next >"
              pageRangeDisplayed={3}
              pageCount={totalPages}
              previousLabel="< Previous"
              onPageChange={(e) => {
                navigate(`/search/?q=${query}&page=${e.selected + 1}`);
              }}
              initialPage={parseInt(page) - 1}
              renderOnZeroPageCount={null}
              containerClassName={'pagination'}
              pageClassName={'page-item'}
              pageLinkClassName={'page-link'}
              previousClassName={'prev-item'}
              previousLinkClassName={'prev-link'}
              nextClassName={'next-item'}
              nextLinkClassName={'next-link'}
              breakClassName={'break-item'}
              breakLinkClassName={'break-link'}
              activeClassName={'active'}
            />
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
