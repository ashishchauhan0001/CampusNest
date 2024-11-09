import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Card, Typography, Grid } from '@mui/material';
import Carousel from 'react-material-ui-carousel'; // Carousel for displaying images
import './property.css';

const Property = () => {
    const params = useParams();
    const [property, setProperty] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/vendor/getvendor/${params.listingId}`);
                setProperty(response.data);
            } catch (err) {
                setError('Failed to load property details.');
            }
        };

        fetchProperty();
    }, [params.listingId]);

    const handleBookingRequest = () => {
        // Replace with actual authentication check
        const isUserLoggedIn = true;
        if (!isUserLoggedIn) {
            alert('Please log in to request booking.');
            return;
        }
        // Add booking request logic here
    };

    return (
        <div className="property-container">
            {error && <p>{error}</p>}
            {property ? (
                <div className="property-details">
                    {/* Carousel for Property Images */}
                    <Carousel className="property-carousel">
                        {/* Dummy image used for now */}
                        {property.imageURL.length > 0 ? (
                            property.imageURL.map((img, index) => (
                                <img src={img} alt={`Property Image ${index + 1}`} className="carousel-image" key={index} />
                            ))
                        ) : (
                            <img src="https://via.placeholder.com/600x400" alt="Default Property Image" className="carousel-image" />
                        )}
                    </Carousel>

                    {/* Property Info */}
                    <div className="property-info">
                        <Typography variant="h4" gutterBottom>{property.name}</Typography>
                        <Typography variant="body1" className="property-description">
                            {property.description}
                        </Typography>

                        <Grid container spacing={3}>
                            {/* Property Details */}
                            <Grid item xs={12} md={6}>
                                <Card className="property-card">
                                    <Typography variant="h6">Address:</Typography>
                                    <Typography variant="body1">{property.address}</Typography>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Card className="property-card">
                                    <Typography variant="h6">City:</Typography>
                                    <Typography variant="body1">{property.city}</Typography>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Card className="property-card">
                                    <Typography variant="h6">State:</Typography>
                                    <Typography variant="body1">{property.state}</Typography>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Card className="property-card">
                                    <Typography variant="h6">Rent:</Typography>
                                    <Typography variant="body1">${property.rent}</Typography>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Card className="property-card">
                                    <Typography variant="h6">Security Deposit:</Typography>
                                    <Typography variant="body1">${property.security}</Typography>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Card className="property-card">
                                    <Typography variant="h6">Total Rooms:</Typography>
                                    <Typography variant="body1">{property.totalRooms}</Typography>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Card className="property-card">
                                    <Typography variant="h6">Available Rooms:</Typography>
                                    <Typography variant="body1">{property.availRooms}</Typography>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Card className="property-card">
                                    <Typography variant="h6">Market Distance:</Typography>
                                    <Typography variant="body1">{property.marketDistance} km</Typography>
                                </Card>
                            </Grid>

                            {/* Amenities */}
                            <Grid item xs={12}>
                                <Typography variant="h5" className="amenities-title">Amenities:</Typography>
                                <Grid container spacing={2} className="amenities-list">
                                    {property.wifi && (
                                        <Grid item xs={6} sm={4}>
                                            <Card className="amenity-card">
                                                <Typography variant="body2">Wi-Fi</Typography>
                                            </Card>
                                        </Grid>
                                    )}
                                    {property.parking && (
                                        <Grid item xs={6} sm={4}>
                                            <Card className="amenity-card">
                                                <Typography variant="body2">Parking</Typography>
                                            </Card>
                                        </Grid>
                                    )}
                                    {property.gym && (
                                        <Grid item xs={6} sm={4}>
                                            <Card className="amenity-card">
                                                <Typography variant="body2">Gym</Typography>
                                            </Card>
                                        </Grid>
                                    )}
                                    {property.houseKeeping && (
                                        <Grid item xs={6} sm={4}>
                                            <Card className="amenity-card">
                                                <Typography variant="body2">Housekeeping</Typography>
                                            </Card>
                                        </Grid>
                                    )}
                                    {property.laundry && (
                                        <Grid item xs={6} sm={4}>
                                            <Card className="amenity-card">
                                                <Typography variant="body2">Laundry</Typography>
                                            </Card>
                                        </Grid>
                                    )}
                                    {property.mess && (
                                        <Grid item xs={6} sm={4}>
                                            <Card className="amenity-card">
                                                <Typography variant="body2">Mess</Typography>
                                            </Card>
                                        </Grid>
                                    )}
                                    {property.electricBackup && (
                                        <Grid item xs={6} sm={4}>
                                            <Card className="amenity-card">
                                                <Typography variant="body2">Electric Backup</Typography>
                                            </Card>
                                        </Grid>
                                    )}
                                    {property.furnished && (
                                        <Grid item xs={6} sm={4}>
                                            <Card className="amenity-card">
                                                <Typography variant="body2">Furnished</Typography>
                                            </Card>
                                        </Grid>
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* Booking Button */}
                        <Button variant="contained" color="primary" className="booking-button" onClick={handleBookingRequest}>
                            Request Booking
                        </Button>
                    </div>
                </div>
            ) : (
                <p>Loading property details...</p>
            )}
        </div>
    );
};

export default Property;
