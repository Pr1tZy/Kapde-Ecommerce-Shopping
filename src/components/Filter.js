import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSortAmountUp, faSortAmountDown } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Filter.module.css';

const Filter = ({onFilterChange, onSortChange }) => {
  const [isSizeDropdownOpen, setIsSizeDropdownOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  const handleSortChange = (sortOption) => {
    onSortChange(sortOption);
    setIsSortDropdownOpen(false); 
  };

  return (
    <div className={styles.filterContainer}>
      {/* Sort by Price Button */}
      <div className={styles.filterButtonContainer}>
        <button onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)} className={styles.filterButton}>
          <FontAwesomeIcon icon={faSortAmountUp} /> <FontAwesomeIcon icon={faSortAmountDown} />
        </button>
        {isSortDropdownOpen && (
          <div className={styles.filterOptions}>
            <div className={styles.filterOption} onClick={() => handleSortChange('')}>No Sorting</div>
            <div className={styles.filterOption} onClick={() => handleSortChange('asc')}>Price: Low to High</div>
            <div className={styles.filterOption} onClick={() => handleSortChange('desc')}>Price: High to Low</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;
