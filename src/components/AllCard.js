import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/AllCard.module.css';

const AllCard = ({ id, name, price, imageUrl }) => {
    return (
        <div className={styles.card}>
            <Link to={`/collections/${id}`} className={styles.cardLink}>
                <div className={styles.imageContainer}>
                    <img src={imageUrl} alt={name} className={styles.image} />
                </div>
                <div className={styles.info}>
                    <h3 className={styles.name}>{name}</h3>
                    <p className={styles.price}>₹{price}</p>
                </div>
            </Link>
        </div>
    );
};

export default AllCard;
