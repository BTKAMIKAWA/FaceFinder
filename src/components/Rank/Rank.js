import React from 'react';

const Rank = ({ name, entries }) => {
    return (
        <div>
            <div className='black b f3'>
                {`${name}, you have scanned `}
            </div>
            <div className='black f2'>
                {entries}
            </div>
            <div className='black b f3'>
                {'pictures'}
            </div>
            <h2 style={{color: 'white', fontWeight: 'normal'}}>FaceFinder finds all the faces in your pictures. Give it a try!</h2>
            
        </div>
    );
}

export default Rank;