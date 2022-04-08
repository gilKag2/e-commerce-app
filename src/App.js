import { commerce } from './lib/Commerce';
import React, { useEffect, useState } from 'react';
import { Products, Navbar } from './components';
const App = () => {
    const [ products, setProducts ] = useState([]);


    const fetchProducts = async () => {
        const { data } = await commerce.products.list();
        setProducts(data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <>
            <Navbar />
            <Products products={products} />
        </>
    );
};

export default App;