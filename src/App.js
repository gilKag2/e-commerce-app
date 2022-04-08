import { commerce } from './lib/Commerce';
import React, { useEffect, useState } from 'react';
import { Products, Navbar, Cart } from './components';
const App = () => {
    const [ products, setProducts ] = useState([]);
    const [ cart, setCart ] = useState({});

    const fetchProducts = async () => {
        console.log("fetching");
        const { data } = await commerce.products.list();
        setProducts(data);
    };
    const fetchCart = async () => {
        const cart = await commerce.cart.retrieve();
        setCart(cart);
    };

    const handleAddToCart = async (productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity);
        setCart(item.cart);
    };
    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    return (
        <>
            <Navbar totalItems={cart.total_items} />
            {/* <Products products={products} onAddToCart={handleAddToCart} /> */}
            <Cart cart={cart} />
        </>
    );
};

export default App;