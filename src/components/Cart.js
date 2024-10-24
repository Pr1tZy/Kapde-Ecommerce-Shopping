import React, { useEffect, useState } from 'react';

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCart = async () => {
        setLoading(true);
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

    const handleDelete = async (itemId) => {
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
            console.log(`Deleted item with ID: ${itemId}`);
            await fetchCart(); // Refetch the cart after deletion
        } catch (err) {
            setError(err.message);
        }
    };

    const handleUpdate = async (itemId, newQuantity) => {
        try {
            const response = await fetch(`http://localhost:8000/api/cart/items/${itemId}/`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quantity: newQuantity }), // Update quantity
            });
            if (!response.ok) {
                throw new Error('Failed to update item');
            }
            console.log(`Updated item with ID: ${itemId} to quantity: ${newQuantity}`);
            await fetchCart(); // Refetch the cart after updating
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {cart.items.map((item) => (
                        <li key={item.id}>
                            {item.collection.name} - 
                            <input 
                                type="number" 
                                value={item.quantity} 
                                onChange={(e) => handleUpdate(item.id, parseInt(e.target.value, 10))}
                            />
                            <button onClick={() => handleDelete(item.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Cart;
