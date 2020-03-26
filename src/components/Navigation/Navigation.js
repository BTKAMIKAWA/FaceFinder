import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn, route }) => {
    if (isSignedIn) {
        return (
            <nav style={{justifyContent: 'flex-end', marginRight: '15px'}}>
                <p onClick={() => onRouteChange('signout')} className='f3 link dim black pa2 pointer' style={{marginTop: '54%'}}>Sign Out</p>
            </nav>
        )
    } else {
        if (route === 'register') {
            return (
                <div style={{justifyContent: 'flex-end', marginRight: '15px', paddingLeft: '15px', paddingTop: '8px'}}>
                    <p onClick={() => onRouteChange('signin')} className='f3 link dim black pa2 pointer' style={{marginTop: '54%'}}>Sign in</p>
                </div>
            )
        } else {
            return (
                <div style={{justifyContent: 'flex-end', marginRight: '15px'}}>
                    <p onClick={() => onRouteChange('register')} className='f3 link dim black pa2 pointer' style={{marginTop: '54%'}}>Register</p>
                </div>
            )
        }

    }
}

export default Navigation;