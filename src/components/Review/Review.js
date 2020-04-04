import React, { useEffect, useState } from 'react';
import './Review.css';
import { getDatabaseCart, removeFromDatabaseCart} from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/useAuth';

const Review = (props) => {
    
    const [cart, setCart] = useState([]);
    // const [orderPlaced, setOrderPlaced] = useState(false);
    const auth = useAuth();
    
    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        //console.log(productKeys);
        fetch('http://localhost:4000/getProductByKey', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => {
            //console.log(data);
            const cartProducts = productKeys.map(key => {
                const product = data.find(pd => pd.key === key);
                product.quantity = savedCart[key];
                return product;
            });
            setCart(cartProducts);
        })
    }, [])

    // let thankyou;
    // if(orderPlaced){
    //     thankyou = <img style={{marginTop:'5px'}} src={picture} alt="" />;
    // }
    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    cart.map(pd => <ReviewItem key={pd.key} removeProduct = {removeProduct} product={pd}></ReviewItem>)
                }
                {/* {thankyou} */}
                {
                    !cart.length && <h1>Your Cart is empty. <a href="/shop">Keep Shopping</a></h1>
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/shipment">
                        {   auth.user ?
                            <button className="btn">Proceed Shipment</button>
                            : <button className="btn">Login to Proceed</button>
                        }
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Review;