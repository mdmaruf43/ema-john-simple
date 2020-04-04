import React, { useState, useEffect } from 'react';
//import fakeData from '../../fakeData';
import { Link } from 'react-router-dom';
import {addToDatabaseCart, getDatabaseCart} from '../../utilities/databaseManager'
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';

const Shop = () => {
    //const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    useEffect(() => {
        fetch('http://localhost:4000/products')
        .then(res => res.json())
        .then(data => {
            //console.log('Data from Database', data);
            setProducts(data);
            //console.log(products);
        })
    }, [])

    useEffect(() => {
        const saveCart = getDatabaseCart();
        const productKey = Object.keys(saveCart);
        //console.log(products);
        if(products.length){
            const previousCart = productKey.map(existingKey => {
                const product = products.find(pd => pd.key === existingKey);
                product.quantity = saveCart[existingKey];
                return product;
            })
            setCart(previousCart);
        }
    }, [products]);

    const handleAddProduct = (product) => {
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        // const sameProduct = newCart.filter(pd => pd.key === product.key);
        // const count = sameProduct.length;
        addToDatabaseCart(product.key, count);
    }
    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    products.map(product => <Product key={product.key} showAddToCart={true} handleAddProduct = {handleAddProduct} product={product}></Product>)
                }
            </div>
            <div className="card-container">
                <Cart cart={cart}>
                    <Link to="/review"> <button className="btn">Review Order</button></Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;