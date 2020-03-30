import React from 'react';
import './FaceFinder.css'

const FaceFinder = ({ imageUrl, boxes }) => {
    return (
        <div className="center" style={{marginTop: '50px', marginBottom: '100px'}}>
            <div style={{position: 'relative', zIndex: 1, width: '1000px' }}>
                <img id="inputimage" alt="Please load image..." src={imageUrl} width='1000px' height='auto' />
                {boxes.map(box =>
                    <div key={`box${box.topRow}${box.rightCol}`} className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
            )}
            </div>
        </div>
    )
}

export default FaceFinder;