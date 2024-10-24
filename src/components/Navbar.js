import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Navbar.module.css';
import logo from '../images/scriptlogo.jpg';
import { FaBars, FaSearch, FaUserPlus, FaSignInAlt } from "react-icons/fa"; // Imported icons for Signup and Login
import { SearchContext } from './ProductSearchFilter/SearchContext';
import Sidebar from './Sidebar';

const Navbar = () => {
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.hamburger} onClick={toggleSidebar}>
          <FaBars />
        </div>
        <div className={styles.logo}>
          <img src={logo} alt="Logo" className={styles.logoImg} />
        </div>
        <div className={styles.searchIcon}>
          <FaSearch />
        </div>
        <div className={styles.links}>
          <Link to="/" className={styles.link}>Home</Link>
          <div className={styles.dropdown}>
            <Link to="" className={styles.link}>Shop</Link>
            <div className={styles.dropdownContent}>
              <Link to="/all">ALL</Link>
              <Link to="/co-ord-sets">Co-ord sets</Link>
              <Link to="/shirts">Shirts</Link>
              <Link to="/dresses">Dresses</Link>
            </div>
          </div>
          <Link to="/about-us" className={styles.link}>About Us</Link>
          <Link to="/contact" className={styles.link}>Contact</Link>
          <Link to="/signup" className={styles.link}>
            <FaUserPlus /> {/* Signup Icon */}
          </Link>
          <Link to="/login" className={styles.link}>
            <FaSignInAlt /> {/* Login Icon */}
          </Link>
          <Link to="/cart" className={styles.link}>Cart</Link>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className={styles.searchInput}
            />
          </div>
        </div>
      </nav>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
};

export default Navbar;
