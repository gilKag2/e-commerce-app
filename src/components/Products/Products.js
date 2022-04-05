import React from 'react';
import { Grid } from '@material-ui/core';
import Product from './Product/Product';
import useStyles from './Styles';

const products = [
    { id: 1, name: 'Shoes', description: "Running Shoes.", price: 5, image: 'https://media.cntraveler.com/photos/603e8e5eb3c7f5651f698239/master/pass/BestRunningSneakers-2021-Hoka-Lede.jpg' },
    { id: 2, name: 'Book', description: "Interesting Book.", price: 5, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8rI_tn3BpM-qwJC7iEu1ntsQtAN4ZDteE4g&usqp=CAU' }
];

const Products = () => {
    const classes = useStyles();
    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Grid container justifyContent='center' spacing={4}>
                {products.map(product => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} />
                    </Grid>
                ))}
            </Grid>
        </main>
    );
};

export default Products;