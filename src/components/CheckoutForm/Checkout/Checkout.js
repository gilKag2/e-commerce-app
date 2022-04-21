import React, { useEffect, useState } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import { commerce } from '../../../lib/Commerce';
import useStyles from './Styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';

const steps = [ "Shipping Address", "Payment Details" ];

const Checkout = ({ cart, onCaptureCheckout, order, error }) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [ checkoutToken, setCheckoutToken ] = useState(null);
    const [ shippingData, setShippingData ] = useState({});
    const [ activeStep, setActiveStep ] = useState(0);


    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
                setCheckoutToken(token);
            } catch (error) {
                navigate('/');
            }
        };
        generateToken();
    }, [ cart, navigate ]);

    const nextStep = () => { setActiveStep((prevActiveStep) => prevActiveStep + 1); };
    const backStep = () => { setActiveStep((prevActiveStep) => prevActiveStep - 1); };

    const next = (data) => {
        setShippingData(data);
        nextStep();
    };

    let Confirmation = () => order.customer ? (
        <>
            <div>
                <Typography variant='h5'>Thank you for you purchase, {order.customer.firstname} {order.customer.lastname}</Typography>
                <Divider className={classes.divider} />
                <Typography variant='subtitle2'>Order ref: {order.customer_reference}</Typography>
            </div>
            <br />
            <Button variant='outlined' type='button' component={Link} to="/">Back To Home</Button>
        </>
    ) : (
        <div className={classes.spinner}>
            <CircularProgress />
        </div>
    );
    if (error) {
        <>
            <Typography variant='h5'>Error: {error}</Typography>
            <br />
            <Button variant='outlined' type='button' component={Link} to="/">Back To Home</Button>
        </>;
    }

    const Form = () => activeStep === 0 ? <AddressForm checkoutToken={checkoutToken} next={next} />
        : <PaymentForm backStep={backStep} checkoutToken={checkoutToken} shippingData={shippingData} onCaptureCheckout={onCaptureCheckout} nextStep={nextStep} />;

    return (
        <>
            <CssBaseline />
            <div className={classes.toolBar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">Checkout</Typography>
                    <Stepper active={activeStep} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
                </Paper>
            </main>
        </>
    );
};

export default Checkout;;;