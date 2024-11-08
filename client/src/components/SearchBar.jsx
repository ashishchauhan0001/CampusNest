import React from 'react';
import './SearchBar.css';

const SearchBar = () => {
    return (
        <div className="search-bar">
            <div className="search-bar-field">
                <label>Looking For</label>
                <input type="text" placeholder="What to look for ?" />
            </div>
            <div className="search-bar-field">
                <label>Type</label>
                <select>
                    <option>Property Type</option>
                    <option>PG</option>
                    <option>Hostel</option>
                </select>
            </div>
            <div className="search-bar-field">
                <label>Price</label>
                <select>
                    <option>Price</option>
                    <option>Low to High</option>
                    <option>High to Low</option>
                </select>
            </div>
            <div className="search-bar-field">
                <label>Location</label>
                <select>
                    <option>All Cities</option>
                    <option>Mumbai</option>
                    <option>Noida</option>
                    <option>Greater Noida</option>
                    <option>Delhi</option>
                    <option>Hyderabad</option>
                    <option>Pune</option>
                    <option>Kolkata</option>
                    <option>Bangalore</option>
                    <option>Chennai</option>
                </select>
            </div>
            <button className="search-btn">
                <i className="fa fa-search"></i> Search
            </button>
        </div>
    );
};

export default SearchBar;
