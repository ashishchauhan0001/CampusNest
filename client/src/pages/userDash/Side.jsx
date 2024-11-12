import React from 'react';
import { Link } from 'react-router-dom';
import '../vendor/Dash.css';

const Side = () => {
    return (
        <div className="dash">

            <ul>
                <li>
                    <Link to="/rent">View Request Status</Link>
                </li>
                <li>
                    <Link to="/xxx">Your Campus Nest</Link>
                </li>

            </ul>
        </div>
    );
};

export default Side;
