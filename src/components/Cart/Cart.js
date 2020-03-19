import React from 'react';
// import { UserContext } from '../../App';
// import { useAuth } from '../Login/useAuth';

const Cart = (props) => {
    const cart = props.cart;
    // const auth = useAuth();
    // console.log(auth.user);
    //const total = cart.reduce((total, product) => total + product.price * product.quantity, 0);
    let total = 0;
    for(let i = 0; i < cart.length; i++){
        const product = cart[i];
        total = total + product.price * product.quantity;
    }
    let shipping = 0;
    if(total > 35){
        shipping = 0;
    }
    else if(total > 15){
        shipping = 4.99;
    }
    else if(total > 0){
        shipping = 12.99;
    }
    let tax = (total / 10);
    const grandTotal = (total + shipping + Number(tax)).toFixed(2);

    const formatNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }
    return (
        <div>
            <h3>Order Summery</h3>
            <p>Items Ordered: {props.cart.length}</p>
            <p>Product Price: {formatNumber(total)}</p>
            <p>Tax: {formatNumber(tax)}</p>
            <p><small>Shipping: {shipping}</small></p>
            <p>Total Price: ${grandTotal}</p>
            <br/>
            {props.children}
        </div>
    );
};

export default Cart;