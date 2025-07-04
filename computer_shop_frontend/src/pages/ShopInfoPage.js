import React, { useEffect, useState } from "react";

/**
 * ShopInfoPage fetches and displays shop info from backend.
 */
const BACKEND_API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:3001"; // Change as needed

// PUBLIC_INTERFACE
function ShopInfoPage() {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await fetch(`${BACKEND_API_BASE}/shop-info`);
        if (!res.ok) throw new Error("Failed to fetch shop info");
        const data = await res.json();
        setInfo(data);
      } catch (err) {
        setError("Could not load shop information.");
      } finally {
        setLoading(false);
      }
    };
    fetchInfo();
  }, []);

  return (
    <section className="shop-info-section container">
      <h2>About Our Shop</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {info && (
        <div className="shop-info">
          <p><strong>Name:</strong> {info.name}</p>
          <p><strong>Address:</strong> {info.address}</p>
          <p><strong>Email:</strong> {info.email}</p>
          <p><strong>Phone:</strong> {info.phone}</p>
          <p><strong>Description:</strong> {info.description}</p>
        </div>
      )}
    </section>
  );
}

export default ShopInfoPage;
