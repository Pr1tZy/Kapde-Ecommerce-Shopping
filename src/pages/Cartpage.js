import React, { useEffect, useState } from 'react';
import '../styles/CartPage.css';

const CartPage = () => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isCheckoutPopupOpen, setCheckoutPopupOpen] = useState(false);
    const [address, setAddress] = useState('');
    const [pincode, setPincode] = useState('');

    const fetchCart = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:8000/api/cart/', {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch cart');
            }
            const data = await response.json();
            setCart(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const handleDelete = async (itemId) => {
        if (!itemId) {
            console.error("No item ID provided!");
            return;
        }
        
        try {
            const response = await fetch(`http://localhost:8000/api/cart/items/${itemId}/`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to delete item');
            }
            fetchCart(); // Re-fetch the cart after deletion
        } catch (err) {
            setError(err.message);
        }
    };

    const handleCheckout = () => {
        setCheckoutPopupOpen(true);
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo) {
            setAddress(userInfo.address);
            setPincode(userInfo.pincode);
        }
    };

    const handleConfirmCheckout = () => {
        console.log('Checkout confirmed with:', { address, pincode });
        setCheckoutPopupOpen(false);
    };

    if (loading) return <p className="loading">Loading...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="cart-page">
            <h2>Your Cart</h2>
            {cart && cart.items && cart.items.length === 0 && <p>Your cart is empty.</p>}
            {cart && cart.items && cart.items.length > 0 && (
                <div className="cart-items">
                    <ul>
                        {cart.items.map(item => (
                            <li key={item.id} className="cart-item">
                                <div className="item-info">
                                    <img src={item.collection.imageUrl} alt={item.collection.name} className="item-image" />
                                    <div>
                                        <h3 className="item-name">{item.collection.name}</h3>
                                        <p className="item-quantity">Quantity: {item.quantity}</p>
                                    </div>
                                </div>
                                <button className="remove-button" onClick={() => handleDelete(item.id)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                    <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
                </div>
            )}
            {isCheckoutPopupOpen && (
                <div className="checkout-popup">
                    <h3>Checkout</h3>
                    <label>
                        Address:
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </label>
                    <label>
                        Pincode:
                        <input
                            type="text"
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                        />
                    </label>
                    <button className="confirm-button" onClick={handleConfirmCheckout}>Confirm Checkout</button>
                    <button className="cancel-button" onClick={() => setCheckoutPopupOpen(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default CartPage;
