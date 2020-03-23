import React from 'react';
import './FaceFinder.css'

const FaceFinder = ({ imageUrl, box }) => {
    return (
        <div className="center" style={{marginTop: '50px', marginBottom: '100px'}}>
            <div style={{position: 'relative', zIndex: 1, width: '1000px' }}>
                <img id="inputimage" alt="Please load image..." src={imageUrl} width='1000px' height='auto' />
                <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
            </div>
        </div>
    )
}

export default FaceFinder;