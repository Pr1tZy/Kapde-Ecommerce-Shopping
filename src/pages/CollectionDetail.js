import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/productdetails.css';

const CollectionDetail = () => {
  const { id } = useParams();
  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCollectionDetail = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8000/api/collections/${id}/`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCollection(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCollectionDetail();
  }, [id]);

  const addToCart = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/cart/add/${id}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}` // Assuming you have auth token saved in localStorage
        },
      });
      if (response.ok) {
        setMessage('Item added to cart');
      } else {
        setMessage('Failed to add item to cart');
      }
    } catch (error) {
      setMessage('Error occurred while adding to cart');
    }
  };

  if (loading) return <div className="loading">Loading collection detail...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="collection-detail-page">
      <div className="collection-detail-container">
        <div className="image-section">
          <img src={collection.imageUrl} alt={collection.name} className="collection-image" />
        </div>
        <div className="info-section">
          <h1 className="collection-title">{collection.name}</h1>
          <p className="collection-price">Price:₹{collection.price}</p>
          <p className="collection-description">{collection.description}</p>
          <button className="add-to-cart-button" onClick={addToCart}>
            Add to Cart
          </button>
          {message && <p className="message">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default CollectionDetail;
