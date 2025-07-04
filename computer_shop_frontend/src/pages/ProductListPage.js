import React, { useEffect, useState } from "react";

/**
 * ProductListPage fetches product data from backend and displays as cards.
 */
const BACKEND_API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:3001"; // Change as needed

// PUBLIC_INTERFACE
function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the products from the backend (GET /products)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${BACKEND_API_BASE}/products`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("Could not load products, please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="product-list-section container">
      <h2>Product Catalog</h2>
      {loading && <p>Loading products...</p>}
      {error && <p className="error">{error}</p>}
      <div className="product-grid">
        {products.map((prod) => (
          <div className="product-card" key={prod.id}>
            <h3>{prod.name}</h3>
            <p>{prod.description || "No description."}</p>
            <div className="price">${prod.price?.toFixed(2) ?? "--"}</div>
          </div>
        ))}
        {!loading && products.length === 0 && (
          <div>No products found.</div>
        )}
      </div>
    </section>
  );
}

export default ProductListPage;
