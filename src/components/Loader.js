import React, { Component } from 'react';
import loader from '../assets/loader.gif';

export class Loader extends Component {
    render() {
        return (
            <div style={{ width: "100%", height: 0, paddingBottom: "100%", position: "relative" }}>
                <img src={loader} alt='loading....' />
            </div>
        )
    }
}

export default Loader
