import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from './app/hooks';
import Login from './features/auth/Login';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './pages/ProtectedRoute';
import Home from './pages/Home';
import Products from './features/products/Products';
import './styles/main.scss';

/**
 * Main App component
 * 
 * This is the root component that sets up:
 * - React Router v6 routing configuration
 * - Authentication-based route protection
 * - Route structure with nested protected routes
 * 
 * Route Structure:
 * - /login: Public route for authentication
 * - /: Root path redirects to /home if authenticated, /login otherwise
 * - /home: Protected route (requires authentication)
 * - /products: Protected route (requires authentication)
 * 
 * Protected routes are wrapped with:
 * 1. ProtectedRoute component (checks authentication, redirects if not authenticated)
 * 2. Layout component (provides sidebar and header structure)
 * 
 * The Layout uses React Router's Outlet to render child routes (Home, Products)
 */
function App() {
  // Get authentication state from Redux (no prop drilling)
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public route: Login page */}
        <Route path="/login" element={<Login />} />
        
        {/* Root path: Smart redirect based on auth state */}
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />
          }
        />
        
        {/* Protected routes: Wrapped with Layout and ProtectedRoute */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<Products />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

