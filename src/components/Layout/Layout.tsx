import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import "../../styles/components/Layout.scss";

/**
 * Layout component providing shared structure
 * Includes sidebar navigation and header with main content area
 */
const Layout = () => {
  useEffect(() => {
    // Close sidebar when clicking outside on mobile
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.querySelector(".sidebar");
      const target = event.target as HTMLElement;

      if (
        sidebar?.classList.contains("open") &&
        !sidebar.contains(target) &&
        !target.closest(".mobile-menu-toggle") &&
        window.innerWidth < 768
      ) {
        sidebar.classList.remove("open");
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="layout">
      <Sidebar />
      <div className="layout-main">
        <Header />
        <main className="layout-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;

