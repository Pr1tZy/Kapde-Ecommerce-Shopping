import React, { useState, useEffect } from 'react';
import AllCard from '../components/AllCard';
import Filter from '../components/Filter';
import styles from '../styles/ShopAll.module.css';

const ShopAll = () => {
  const [filteredItems, setFilteredItems] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [error, setError] = useState(null); // To handle errors

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/collections/');
        
        if (!response.ok) {
          throw new Error('Network response was not ok: ' + response.statusText);
        }

        const data = await response.json();
        setFilteredItems(data); // Set the fetched data as filteredItems
      } catch (err) {
        setError(err.message);
        console.error('Error fetching collections:', err);
      }
    };

    fetchCollections();
  }, []);

  const handleFilterChange = (size) => {
    let filtered = filteredItems; // Use the fetched data instead of collections
    if (size !== '') {
      filtered = filteredItems.filter(item => item.sizes.includes(size));
    }
    applySort(filtered, sortOption);
  };

  const handleSortChange = (sortOption) => {
    setSortOption(sortOption);
    applySort(filteredItems, sortOption); // Sort based on the fetched data
  };

  const applySort = (items, sortOption) => {
    let sortedItems = [...items];
    if (sortOption === 'asc') {
      sortedItems.sort((a, b) => parseFloat(a.price.replace('₹', '')) - parseFloat(b.price.replace('₹', '')));
    } else if (sortOption === 'desc') {
      sortedItems.sort((a, b) => parseFloat(b.price.replace('₹', '')) - parseFloat(a.price.replace('₹', '')));
    }
    setFilteredItems(sortedItems);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    applySort(filteredItems, sortOption);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOption]);

  if (error) {
    return <div>Error: {error}</div>; // Display error message
  }

  if (filteredItems.length === 0) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div className={styles.shopAllContainer}>
      <div className={styles.leftContainer}>
        <div className={styles.filterSection}>
          <Filter
            sizes={['XS', 'S', 'M', 'L', 'XL']}
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
          />
        </div>
      </div>
      <div className={styles.rightContainer}>
        <div className={`${styles.clothingGrid} ${isMobile ? styles.mobileGrid : ''}`}>
          {filteredItems.map(item => (
            <AllCard
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              imageUrl={item.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopAll;
