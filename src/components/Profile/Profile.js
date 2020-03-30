import React from 'react';
import './Profile.css';

const Profile = ({ user, onRouteChange }) => {

    return (
        <div style={{border: '1px solid black', position: 'relative' , zIndex: 1, display: 'flex', flexDirection: 'column'}} className='card center pa4 br3 shadow-5 w-40'>
            <h1>{user.name}</h1>
            <h2>{user.email}</h2>
            <h3>{`Joined: ${user.joined}`}</h3>
            <h3>{`Entries: ${user.entries}`}</h3>
            <p onClick={() => onRouteChange('home')} className='f3 link black pa2 pointer' style={{textDecoration: 'underline'}}>Back</p>
        </div>
    )
}

export default Profile;