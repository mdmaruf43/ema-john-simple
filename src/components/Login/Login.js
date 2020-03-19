import React from 'react'
import Auth from './useAuth';

const Login = () => {
    const auth = Auth();
    const handleSignIn = () => {
        auth.signInWithGoogle()
        .then(res => {
            window.location.pathname = '/review';
        })
    }

    const handleSignOut = () => {
        auth.signOut()
        .then(res => {
            window.location.pathname = '/shop';
        })
    }
    return (
        <div>
            <h1>Join ....</h1>
            {   auth.user ? <button onClick={handleSignOut}>Sign Out</button> :
                <button onClick={handleSignIn}>Sign in With Google</button>
            }
        </div>
    )
}

export default Login;