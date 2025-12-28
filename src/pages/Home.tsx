import "../styles/components/Home.scss";

/**
 * Home page component
 * Simple welcome message
 */
const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to React ShopView</h1>
        <p>
          Navigate to the Products page to browse and filter our product
          catalog.
        </p>
      </div>
    </div>
  );
};

export default Home;
