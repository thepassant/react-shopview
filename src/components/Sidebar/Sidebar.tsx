import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logout } from '../../features/auth/authSlice';
import '../../styles/components/Sidebar.scss';

/**
 * Sidebar navigation component
 * Provides navigation links and logout functionality
 * Uses NavLink for active state styling without page reload
 */
const Sidebar = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>ShopView</h2>
        {user && <p className="user-info">Welcome, {user.username}</p>}
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/home" className={({ isActive }) => (isActive ? 'active' : '')}>
          Home
        </NavLink>
        <NavLink to="/products" className={({ isActive }) => (isActive ? 'active' : '')}>
          Products
        </NavLink>
      </nav>
      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;


