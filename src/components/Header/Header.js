import React, { useContext, useState, useRef, useEffect } from 'react';
import logo from '../../images/logo.png';
import './Header.css';
import { UserContext } from '../../App';
import { useAuth } from '../Login/useAuth';
import { Link } from 'react-router-dom';

const usePrevious = value => {
    const prev = useRef();
    useEffect( () => {
        console.log(value);
        prev.current = value;
    }, [value])
    return prev.current;
}

const Header = () => {
    const auth = useAuth();
    //console.log(auth);
    // const [count, setCount] = useState(0);
    // const previous = usePrevious(count);
    return (            
        <div className="header">
            <img src={logo} alt=""/>
            {/* <h1>Count: {count} Previous: {previous}</h1>
            <button onClick={() => setCount(count + 1)}>+</button>
            <button onClick={() => setCount(count - 1)}>-</button> */}
            <nav>
                <a href="/shop">Shop</a>
                <a href="/review">Order Review</a>
                <a href="/orders">Order History</a>
                {auth.user && <span style={{color: 'yellow'}}>Welcome, {auth.user.name}</span>}
                {
                    auth.user ? <a href="/login">Sign out</a>
                    : <a href="/login">Sign in</a>
                }
            </nav>
        </div>
    );
};

export default Header;  