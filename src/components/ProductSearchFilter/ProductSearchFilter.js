import React, { useContext, useRef, useState, useEffect } from 'react';
import ClothingCard from '../ClothingCard';
import styles from '../../styles/ProductSearchFilter.module.css';
import { Link } from 'react-router-dom';
import { SearchContext } from './SearchContext';

const ProductSearchFilter = ({ collections }) => {
  const { searchTerm } = useContext(SearchContext);
  const [sliderValue, setSliderValue] = useState(0);
  const [filteredItems, setFilteredItems] = useState(collections || []); // Initialize with an empty array
  const clothingCardsRef = useRef(null);
  const spring24Ref = useRef(null);

  // Update filtered items when collections change
  useEffect(() => {
    if (collections) {
      setFilteredItems(collections);
    }
  }, [collections]);

  // Filter logic based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredItems(collections);
    } else {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      const filtered = collections.filter(item =>
        item.name.toLowerCase().includes(lowercasedSearchTerm) ||
        item.price.toString().includes(lowercasedSearchTerm)
      );
      setFilteredItems(filtered);
      if (spring24Ref.current) {
        spring24Ref.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [searchTerm, collections]);

  const handleSliderChange = (e) => {
    const value = e.target.value;
    setSliderValue(value);
    if (clothingCardsRef.current) {
      const maxScrollLeft = clothingCardsRef.current.scrollWidth - clothingCardsRef.current.clientWidth;
      clothingCardsRef.current.scrollLeft = (maxScrollLeft * value) / 100;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.clothingItemsContainer}>
        <h1 ref={spring24Ref} className={styles.clothingTitle}>Spring'24</h1>
        <div className={styles.clothingCardsWrapper}>
          <div className={styles.clothingCards} ref={clothingCardsRef}>
            {filteredItems.length > 0 ? (
              filteredItems.map(item => (
                <Link to={`/collections/${item.id}`} key={item.id} className={styles.clothingCardLink}>
                  <ClothingCard name={item.name} price={item.price} imageUrl={item.imageUrl} />
                </Link>
              ))
            ) : (
              <p>Sorry, we can't find what you're looking for.</p>
            )}
          </div>
        </div>
        {filteredItems.length > 0 && (
          <div className={styles.sliderContainer}>
            <div className={styles.sliderFill} style={{ width: `${sliderValue}%` }}></div>
            <input
              type="range"
              className={styles.slider}
              value={sliderValue}
              onChange={handleSliderChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSearchFilter;
