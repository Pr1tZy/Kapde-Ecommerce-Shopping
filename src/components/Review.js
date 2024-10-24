import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import reviews from '../data/reviewdata';
import '../styles/Review.css';

const Review = () => {
    const [visibleReviews, setVisibleReviews] = useState(4);

    const loadMoreReviews = () => {
        setVisibleReviews(prev => prev + 4);
    };

    return (
        <div className="review-container">
            <h2>
                <span role="img" aria-label="stars">
                    <FontAwesomeIcon icon={faStar} /> <FontAwesomeIcon icon={faStar} /> <FontAwesomeIcon icon={faStar} /> <FontAwesomeIcon icon={faStar} /> <FontAwesomeIcon icon={faStar} />
                </span>
                189 Reviews
            </h2>
            <div className="reviews">
                {reviews.slice(0, visibleReviews).map((review, index) => (
                    <div key={index} className="review-card">
                        <div className="review-header">
                            <h3>{review.name} <span className="verified">&#10004;</span></h3>
                            <p>{review.date}</p>
                        </div>
                        <div className="review-body">
                            <div className="rating">
                                {[...Array(review.rating)].map((_, i) => (
                                    <FontAwesomeIcon key={i} icon={faStar} />
                                ))}
                            </div>
                            <p>{review.text}</p>
                        </div>
                    </div>
                ))}
            </div>
            {visibleReviews < reviews.length && (
                <button className="load-more" onClick={loadMoreReviews}>Show more reviews</button>
            )}
        </div>
    );
};

export default Review;
