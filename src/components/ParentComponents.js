import React, { useEffect, useState } from 'react';
import ProductSearchFilter from './ProductSearchFilter/ProductSearchFilter';

const ParentComponent = () => {
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <ProductSearchFilter collections={collections} />
      {/* Optionally render CollectionComponent if needed */}
    </div>
  );
};

export default ParentComponent;
