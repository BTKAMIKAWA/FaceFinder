import React from 'react';

const Navigation = ({ onSignOut }) => {
    return (
        <nav style={{justifyContent: 'flex-end', marginRight: '15px'}}>
            <p onClick={onSignOut} className='f3 link dim black pa2 pointer' style={{marginTop: '54%'}}>Sign Out</p>
        </nav>
    );
}

export default Navigation;