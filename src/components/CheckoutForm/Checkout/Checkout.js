import React, { useState } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';

import useStyles from './Styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';

const steps = [ "Shipping Address", "Payment Details" ];

const Checkout = () => {
    const classes = useStyles();

    const [ activeStep, setActiveStep ] = useState(0);

    const Confirmation = () => <div>Confirmation</div>;

    const Form = () => activeStep === 0 ? <AddressForm /> : <PaymentForm />;

    return (
        <>
            <div className={classes.toolBar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">Checkout</Typography>
                    <Stepper active={activeStep} className={classes.stepper}>
                        {steps.map((step) => (<Step key={step}>
                            <StepLabel>{step}</StepLabel>
                        </Step>))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : <Form />}
                </Paper>
            </main>
        </>
    );
};

export default Checkout;;;