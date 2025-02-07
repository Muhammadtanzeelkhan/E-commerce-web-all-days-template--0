import React from 'react';

interface WishlistItem {
    id: number;
    name: string;
    image: string;
    price: number;
}

const wishlistItems: WishlistItem[] = [
    {
        id: 1,
        name: 'Product 1',
        image: 'mainsofa.png',
        price: 100,
    },
    {
        id: 2,
        name: 'Product 2',
        image: 'mainsofy.png',
        price: 200,
    },
];

const WishlistPage: React.FC = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Wishlist</h1>
            {wishlistItems.length === 0 ? (
                <p style={styles.message}>Your wishlist is currently empty.</p>
            ) : (
                <div style={styles.wishlistItems}>
                    {wishlistItems.map(item => (
                        <div key={item.id} style={styles.wishlistItem}>
                            <img src={item.image} alt={item.name} style={styles.image} />
                            <div style={styles.details}>
                                <h2 style={styles.itemName}>{item.name}</h2>
                                <p style={styles.price}>${item.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        textAlign: 'center' as 'center',
    },
    header: {
        fontSize: '2em',
        marginBottom: '20px',
    },
    message: {
        fontSize: '1.2em',
        color: '#888',
    },
    wishlistItems: {
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center' as 'center',
    },
    wishlistItem: {
        display: 'flex',
        flexDirection: 'row' as 'row',
        alignItems: 'center' as 'center',
        marginBottom: '20px',
        border: '1px solid #ddd',
        padding: '10px',
        borderRadius: '5px',
        width: '80%',
    },
    image: {
        width: '150px',
        height: '150px',
        marginRight: '20px',
    },
    details: {
        textAlign: 'left' as 'left',
    },
    itemName: {
        fontSize: '1.5em',
        margin: '0 0 10px 0',
    },
    price: {
        fontSize: '1.2em',
        color: '#555',
    },
};

export default WishlistPage;