import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Sidebar.module.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <div className={styles.sidebarContent}>
        <button className={styles.closeButton} onClick={toggleSidebar}>×</button>
        <Link to="/" className={styles.sidebarLink} onClick={toggleSidebar}>Home</Link>
        <div className={styles.dropdown}>
          <Link to="" className={styles.sidebarLink}>Shop</Link>
          <div className={styles.dropdownContent}>
            <Link to="/all" className={styles.sidebarLink} onClick={toggleSidebar}>ALL</Link>
            <Link to="/co-ord-sets" className={styles.sidebarLink} onClick={toggleSidebar}>Co-ord sets</Link>
            <Link to="/shirts" className={styles.sidebarLink} onClick={toggleSidebar}>Shirts</Link>
            <Link to="/dresses" className={styles.sidebarLink} onClick={toggleSidebar}>Dresses</Link>
          </div>
        </div>
        <Link to="/about-us" className={styles.sidebarLink} onClick={toggleSidebar}>About Us</Link>
        <Link to="/contact" className={styles.sidebarLink} onClick={toggleSidebar}>Contact</Link>
      </div>
    </div>
  );
};

export default Sidebar;
