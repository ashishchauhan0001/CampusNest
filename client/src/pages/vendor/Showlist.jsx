import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dash from './dash';
import './showlist.css';
import { useSelector } from 'react-redux';
import Card from '../../components/Card';

const Showlist = () => {
    const userDetails = useSelector((state) => state.user.currentUser);
    console.log(userDetails)
    const id = userDetails._id;
    console.log(id);
    const [properties, setProperties] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/vendor/getvendor/${id}`);
                setProperties(response.data);


                console.log(response.data, "response");

            } catch (err) {
                setError('Failed to load properties.');
            }
        };

        fetchProperties();
    }, []);
    console.log(properties, "properties");


        return (
            <>
                <Dash />
                <div className='main-box'>
                    {console.log(properties, "inside div")}
                    {
                        Array.isArray(properties) && properties.length > 0 
                        ? properties.map((property) => <Card key={property._id} listing={property} />)
                        : <p>No properties available</p> 
                    }
                </div>
            </>
        );
    };
    
    export default Showlist;
    
