import React, { Component } from 'react';
import loader from '../assets/loader.gif';

export class Loader extends Component {
    render() {
        return (
            <div style={{ textAlign: "center" }}>
                <img className='my-3' src={loader} alt='loading....' />
            </div>
        )
    }
}

export default Loader
