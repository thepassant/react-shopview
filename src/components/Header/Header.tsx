import { useLocation } from "react-router-dom";
import { useState } from "react";
import "../../styles/components/Header.scss";

/**
 * Header component displaying active page title
 * Dynamically updates based on current route
 * Includes mobile menu toggle for sidebar
 */
const Header = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getPageTitle = (): string => {
    switch (location.pathname) {
      case "/home":
        return "Home";
      case "/products":
        return "Products";
      default:
        return "React ShopView";
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    // Toggle sidebar class on body
    const sidebar = document.querySelector(".sidebar");
    if (sidebar) {
      sidebar.classList.toggle("open");
    }
  };

  return (
    <header className="header">
      <button
        className="mobile-menu-toggle"
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <h1 className="header-title">{getPageTitle()}</h1>
    </header>
  );
};

export default Header;

