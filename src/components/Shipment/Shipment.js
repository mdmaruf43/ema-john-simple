import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { useAuth } from '../Login/useAuth';
import {loadStripe} from '@stripe/stripe-js';
import {Elements,} from '@stripe/react-stripe-js';
import { getDatabaseCart, clearLocalShoppingCart} from '../../utilities/databaseManager';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import { useState } from 'react';

const Shipment = () => {
    const { register, handleSubmit, errors } = useForm();
    const [shipInfo, setShipInfo] = useState(null);
    const [orderId, setOrderId] = useState(null);
    const stripePromise = loadStripe('pk_test_IZQbJffjpldskrhIZwmHE4uk00YjXafcWn'); 
    const auth = useAuth();


    const onSubmit = data => { 
        setShipInfo(data);
    }

    const handlePlaceOrder = (payment) => {
        //ToDo: Someone move this after payment
        const saveCart = getDatabaseCart();
        const orderfDetails = {
            email: auth.user.email, 
            cart:saveCart,
            shipment: shipInfo,
            payment: payment
        };
        fetch('http://localhost:4000/placeOrder', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderfDetails)
        })
        .then(res => res.json())
        .then(order => {
            console.log('from database', order._id);
            setOrderId(order._id);
            //clear localstorage cart
            clearLocalShoppingCart();
        })
    }

    return (
        <div className="container">
            <div className="row">
                <div style={{display: shipInfo && 'none'}}  className="col-md-6">
                    <h3>Shipment Information</h3>
                    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
                        <input name="name" 
                            defaultValue={auth.user.name} 
                            ref={register({ required: true })} 
                            placeholder="Your Name"/>
                        {
                            errors.name && <span>Name is required</span>
                        }
                        <input name="email" defaultValue={auth.user.email} ref={register({ required: true })} placeholder="Email"/>
                        {
                            errors.email && <span>Email is required</span>
                        }
                        <input name="AddressLine1" ref={register({ required: true })} placeholder="Address Line 2"/>
                        {
                            errors.AddressLine1 && <span>Address is required</span>
                        }
                        <input name="AddressLine2" ref={register} placeholder="Address Line 1"/>
                        <input name="city" ref={register({ required: true })} placeholder="City"/>
                        {
                            errors.city && <span>City is required</span>
                        }
                        <input name="country" ref={register({ required: true })} placeholder="Country"/>
                        {
                            errors.country && <span>Country is required</span>
                        }
                        <input name="zipcode" ref={register({ required: true })} placeholder="Zip Code"/>
                        {
                            errors.zipcode && <span>Zip Code is required</span>
                        }
                        
                        <input type="submit" />
                    </form>
                </div>
                <div style={{marginTop: '200px', display: shipInfo? 'block' : 'none'}} className="col-md-6">
                    <h3>Payment Information</h3>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm handlePlaceOrder={handlePlaceOrder}>
                        </CheckoutForm>
                    </Elements>
                    <br/>
                    {
                        orderId && 
                        <div>
                            <h3>Thank you for shopping with us</h3>
                            <p>Your order is: {orderId}</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Shipment;