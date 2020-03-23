import React from 'react';
import Tilt from 'react-tilt';
import MGlass from './MGlass.png';
import Face from './Face.png'
import './Logo.css';

const Logo = () => {
    return (
        <div className='mt0 pa4' style={{display: 'flex', marginLeft: '10px'}}>
            <Tilt options={{ max : 55 }} style={{ height: 75, width: 75, borderRadius: '90px' }} >
                <div className="Tilt-inner" style={{marginTop: "5px", position: 'relative'}}>
                    <img src={MGlass} alt='icon' className="image" style={{paddingBottom:'10px', zIndex: 2}} />
                    <img src={Face} alt='face' className="image" style={{zIndex: 1}} />
                </div>
            </Tilt>
        </div>
        
    );
}

export default Logo;