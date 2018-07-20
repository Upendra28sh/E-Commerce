import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div>
            <h1>Let's Shop</h1>
            <Link to="/shop"><button>Go</button></Link>     
        </div>

    );
}

export default Landing;