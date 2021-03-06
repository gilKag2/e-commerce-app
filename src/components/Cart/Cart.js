import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyles from './Styles';
import CartItem from './CartItem/CartItem';


const Cart = ({ cart, handleUpdateCartQuantity, handleRemoveFromCart, handleEmptyCart }) => {
    const classes = useStyles();


    const EmptyCart = () => (
        <Typography variant='subtitle1'>You Have no items in your shopping cart,
            <Link to="/" className={classes.link}>start adding some!</Link>
        </Typography>
    );

    const FilledCart = () => (
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((item) => (
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem onUpdateCartQuantity={handleUpdateCartQuantity} onRemoveFromCart={handleRemoveFromCart} item={item} />
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cartDetails}>
                <Typography variant='h4'>Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
                <div>
                    <Button onClick={handleEmptyCart} className={classes.emptyButton} size="large" type='button' variant='contained' color='secondary'>Empty Cart</Button>
                    <Button component={Link} to="/checkout" className={classes.checkoutButton} size="large" type='button' variant='contained' color='primary'>Checkout</Button>
                </div>
            </div>
        </>
    );

    if (!cart.line_items) return "Loading...";
    return (
        <Container>
            <div className={classes.toolBar} />
            <Typography className={classes.title} variant='h3' gutterBottom>Your Shopping Cart</Typography>
            {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
        </Container>
    );
};

export default Cart;