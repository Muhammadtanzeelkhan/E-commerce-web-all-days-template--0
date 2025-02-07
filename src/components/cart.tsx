'use client'
// import React, { useState, useEffect } from 'react';
// import { FaShoppingCart } from 'react-icons/fa';
// import { client } from '../lib/sanityClient';

// const Cart: React.FC = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     interface CartItem {
//         id: number;
//         name: string;
//         quantity: number;
//     }

    
//     const [cartItems, setCartItems] = useState<CartItem[]>([]);

//     const toggleCart = () => {
//         setIsOpen(!isOpen);
//     };

//     useEffect(() => {
//         if (isOpen) {
//             client.fetch('*[_type == "cartItem"]').then(data => {
//                 setCartItems(data);
//             }).catch(error => console.error('Error fetching cart items:', error));
//         }
//     }, [isOpen]);

//     return (
//         <div>
//             <nav>
//                 <FaShoppingCart onClick={toggleCart} style={{ cursor: 'pointer' }} />
//             </nav>
//             {isOpen && (
//                 <div className="cart">
//                     <h2>Your Cart</h2>
//                     {cartItems.length > 0 ? (
//                         <ul>
//                             {cartItems.map(item => (
//                                 <li key={item.id}>{item.name} - {item.quantity}</li>
//                             ))}
//                         </ul>
//                     ) : (
//                         <p>Your cart is empty</p>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Cart;