import React from 'react';
import './ImageForm.css';

const ImageForm = ({ onInputChange, onSubmit, onEnter, value, onRouteChange }) => {
    return (
        <div>
            <div className='center'>
                <div style={{border: '1px solid black', position: 'relative' , zIndex: 1}} className='form center pa4 br3 shadow-5 w-50'>
                    <input value={value} id='imageurl' placeholder='Image url...' style={{border: '1px solid black'}} className='f4 pa2 w-50' type='tex' onChange={onInputChange} onKeyPress={onEnter} />
                    <button style={{border: '1px solid black', backgroundColor: 'royalblue'}} className='button w-20 grow f4 link ph3 pv2 dib black' onClick={onSubmit}>FIND</button>
                </div>
            </div>                
            <p onClick={() => onRouteChange('profile')} className='f3 link dim black pointer' style={{textDecoration: 'underline', position: 'relative', zIndex: 1}}>View Profile</p>

        </div>
    )
}

export default ImageForm;