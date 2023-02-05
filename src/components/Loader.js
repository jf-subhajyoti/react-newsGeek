import React from 'react';
import loader from '../assets/loader.gif';

const Loader = () => {
    return (
        <div style={{ textAlign: "center" }}>
            <img className='my-3' src={loader} alt='loading....' />
        </div>
    );
}

export default Loader
