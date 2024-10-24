import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ImageSlider from './components/imageSlider';
import Review from './components/Review';
import Unavailable from './pages/Unavailable';
import ShopAll from './pages/ShopAll';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductSearchFilter from './components/ProductSearchFilter/ProductSearchFilter';
import { SearchProvider } from './components/ProductSearchFilter/SearchContext';
import Signup from './pages/Signup'; 
import Login from './pages/Login';
import CollectionDetail from './pages/CollectionDetail'; 
import Cart from './pages/Cartpage'

function App() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCollections = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8000/api/collections/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCollections(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  if (loading) return <div>Loading collections...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <SearchProvider>
      <Router>
        <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <Routes>
            <Route path="/" element={
              <>
                <ImageSlider />
                <main>
                  <ProductSearchFilter collections={collections} /> {/* Pass collections here */}
                </main>
                <Review />
              </>
            } />
            <Route path="/signup" element={<Signup />} /> {/* Add signup route */}
            <Route path="/login" element={<Login />} />
            <Route path="/all" element={<ShopAll />} />
            <Route path="/collections/:id" element={<CollectionDetail />} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/about-us" element={<Unavailable />} />
            <Route path="/contact" element={<Unavailable />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </SearchProvider>
  );
}

export default App;
