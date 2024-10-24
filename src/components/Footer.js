import React from 'react';
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import styles from '../styles/Footer.module.css'; // Make sure the CSS path is correct

const Footer = () => {
    return (
        <footer className={styles.siteFooter}>
            <div className={styles.footerContent}>
                <div className={styles.footerSection}>
                    <p>Clothing Website :) HappyShopping!</p>
                    <p>Made by: JS,PS,BP,AP<br /></p> 
                    <div className={styles.logo}>
                        <h2>Kapde</h2>
                        <div className={styles.socialIcons}>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                <FaFacebookF />
                            </a>
                            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                                <FaInstagram />
                            </a>
                        </div>
                    </div>
                </div>
                <div className={`${styles.footerSection} ${styles.center}`}>
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="/terms">Terms & Conditions</a></li>
                        <li><a href="/shipping">Shipping & Returns</a></li>
                        <li><a href="/privacy">Privacy Policy</a></li>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/contact">Contact Us</a></li>
                        <li><a href="/stores">Our Stores</a></li>
                        <li><a href="/faq">FAQ</a></li>
                    </ul>
                </div>
            </div>
            <div className={styles.footerBottom}>
                <p>© 2024 Kapde.</p>
            </div>
        </footer>
    );
};

export default Footer;
