import React from 'react';
import { Link } from 'react-router-dom';
import './Dash.css';

const Dash = () => {
    return (
        <div className="dash">
       
            <ul>
                <li>
                    <Link to="/viewlist">View Listings</Link>
                </li>
                <li>
                    <Link to="/vend">Create Listing</Link>
                </li>
                <li>
                    <Link to="/view-tenants">View Tenants</Link>
                </li>
            </ul>
        </div>
    );
};

export default Dash;
