import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from "react-router-dom";
import "./App.css";
import ProductListPage from "./pages/ProductListPage";
import ShopInfoPage from "./pages/ShopInfoPage";
import ContactFormPage from "./pages/ContactFormPage";

/**
 * Responsive main navigation component.
 */
function Navbar({ theme, toggleTheme }) {
  const [navOpen, setNavOpen] = useState(false);

  const handleNavToggle = () => setNavOpen(!navOpen);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link className="navbar-brand" to="/">Computer Shop</Link>
        <button className="navbar-toggler" onClick={handleNavToggle} aria-label="Toggle navigation">
          ☰
        </button>
        <div className={`navbar-links${navOpen ? " open" : ""}`}>
          <NavLink className="nav-link" to="/" end onClick={() => setNavOpen(false)}>
            Products
          </NavLink>
          <NavLink className="nav-link" to="/shop" onClick={() => setNavOpen(false)}>
            Shop Info
          </NavLink>
          <NavLink className="nav-link" to="/contact" onClick={() => setNavOpen(false)}>
            Contact
          </NavLink>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>
      </div>
    </nav>
  );
}

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));

  return (
    <Router>
      <div className="App">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<ProductListPage />} />
            <Route path="/shop" element={<ShopInfoPage />} />
            <Route path="/contact" element={<ContactFormPage />} />
            <Route path="*" element={<h2>404 - Page Not Found</h2>} />
          </Routes>
        </main>
        <footer className="footer">
          &copy; {new Date().getFullYear()} Computer Shop. Powered by React.
        </footer>
      </div>
    </Router>
  );
}

export default App;
