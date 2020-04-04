import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { useAuth } from '../Login/useAuth';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';

const Shipment = () => {
    const { register, handleSubmit, errors } = useForm();
    const auth = useAuth();
    const onSubmit = data => { 
        
        const saveCart = getDatabaseCart();
        const orderfDetails = {email: auth.user.email, cart:saveCart};
        fetch('http://localhost:4000/placeOrder', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderfDetails)
        })
        .then(res => res.json())
        .then(data => {
            alert('Successfully Place Your Order with order id: ' + data._id)
            processOrder();
        })
    }

    return (
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
    )
}

export default Shipment;