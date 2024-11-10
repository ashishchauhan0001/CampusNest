// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { Button, Card, Typography, Grid } from '@mui/material';
// import Carousel from 'react-material-ui-carousel'; // Carousel for displaying images
// import './property.css';

// const Property = () => {
//     const params = useParams();
//     const [property, setProperty] = useState(null);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchProperty = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:3000/api/vendor/getvendor/${params.listingId}`);
//                 setProperty(response.data);
//             } catch (err) {
//                 setError('Failed to load property details.');
//             }
//         };

//         fetchProperty();
//     }, [params.listingId]);

//     const handleBookingRequest = () => {
//         // Replace with actual authentication check
//         const isUserLoggedIn = true;
//         if (!isUserLoggedIn) {
//             alert('Please log in to request booking.');
//             return;
//         }
//         // Add booking request logic here
//     };

//     return (
//         <div className="property-container">
//             {error && <p>{error}</p>}
//             {property ? (
//                 <div className="property-details">
//                     {/* Carousel for Property Images */}
//                     <Carousel className="property-carousel">
//                         {/* Dummy image used for now */}
//                         {property.imageURL.length > 0 ? (
//                             property.imageURL.map((img, index) => (
//                                 <img src={img} alt={`Property Image ${index + 1}`} className="carousel-image" key={index} />
//                             ))
//                         ) : (
//                             <img src="https://via.placeholder.com/600x400" alt="Default Property Image" className="carousel-image" />
//                         )}
//                     </Carousel>

//                     {/* Property Info */}
//                     <div className="property-info">
//                         <Typography variant="h4" gutterBottom>{property.name}</Typography>
//                         <Typography variant="body1" className="property-description">
//                             {property.description}
//                         </Typography>

//                         <Grid container spacing={3}>
//                             {/* Property Details */}
//                             <Grid item xs={12} md={6}>
//                                 <Card className="property-card">
//                                     <Typography variant="h6">Address:</Typography>
//                                     <Typography variant="body1">{property.address}</Typography>
//                                 </Card>
//                             </Grid>
//                             <Grid item xs={12} md={6}>
//                                 <Card className="property-card">
//                                     <Typography variant="h6">City:</Typography>
//                                     <Typography variant="body1">{property.city}</Typography>
//                                 </Card>
//                             </Grid>
//                             <Grid item xs={12} md={6}>
//                                 <Card className="property-card">
//                                     <Typography variant="h6">State:</Typography>
//                                     <Typography variant="body1">{property.state}</Typography>
//                                 </Card>
//                             </Grid>
//                             <Grid item xs={12} md={6}>
//                                 <Card className="property-card">
//                                     <Typography variant="h6">Rent:</Typography>
//                                     <Typography variant="body1">${property.rent}</Typography>
//                                 </Card>
//                             </Grid>
//                             <Grid item xs={12} md={6}>
//                                 <Card className="property-card">
//                                     <Typography variant="h6">Security Deposit:</Typography>
//                                     <Typography variant="body1">${property.security}</Typography>
//                                 </Card>
//                             </Grid>
//                             <Grid item xs={12} md={6}>
//                                 <Card className="property-card">
//                                     <Typography variant="h6">Total Rooms:</Typography>
//                                     <Typography variant="body1">{property.totalRooms}</Typography>
//                                 </Card>
//                             </Grid>
//                             <Grid item xs={12} md={6}>
//                                 <Card className="property-card">
//                                     <Typography variant="h6">Available Rooms:</Typography>
//                                     <Typography variant="body1">{property.availRooms}</Typography>
//                                 </Card>
//                             </Grid>
//                             <Grid item xs={12} md={6}>
//                                 <Card className="property-card">
//                                     <Typography variant="h6">Market Distance:</Typography>
//                                     <Typography variant="body1">{property.marketDistance} km</Typography>
//                                 </Card>
//                             </Grid>

//                             {/* Amenities */}
//                             <Grid item xs={12}>
//                                 <Typography variant="h5" className="amenities-title">Amenities:</Typography>
//                                 <Grid container spacing={2} className="amenities-list">
//                                     {property.wifi && (
//                                         <Grid item xs={6} sm={4}>
//                                             <Card className="amenity-card">
//                                                 <Typography variant="body2">Wi-Fi</Typography>
//                                             </Card>
//                                         </Grid>
//                                     )}
//                                     {property.parking && (
//                                         <Grid item xs={6} sm={4}>
//                                             <Card className="amenity-card">
//                                                 <Typography variant="body2">Parking</Typography>
//                                             </Card>
//                                         </Grid>
//                                     )}
//                                     {property.gym && (
//                                         <Grid item xs={6} sm={4}>
//                                             <Card className="amenity-card">
//                                                 <Typography variant="body2">Gym</Typography>
//                                             </Card>
//                                         </Grid>
//                                     )}
//                                     {property.houseKeeping && (
//                                         <Grid item xs={6} sm={4}>
//                                             <Card className="amenity-card">
//                                                 <Typography variant="body2">Housekeeping</Typography>
//                                             </Card>
//                                         </Grid>
//                                     )}
//                                     {property.laundry && (
//                                         <Grid item xs={6} sm={4}>
//                                             <Card className="amenity-card">
//                                                 <Typography variant="body2">Laundry</Typography>
//                                             </Card>
//                                         </Grid>
//                                     )}
//                                     {property.mess && (
//                                         <Grid item xs={6} sm={4}>
//                                             <Card className="amenity-card">
//                                                 <Typography variant="body2">Mess</Typography>
//                                             </Card>
//                                         </Grid>
//                                     )}
//                                     {property.electricBackup && (
//                                         <Grid item xs={6} sm={4}>
//                                             <Card className="amenity-card">
//                                                 <Typography variant="body2">Electric Backup</Typography>
//                                             </Card>
//                                         </Grid>
//                                     )}
//                                     {property.furnished && (
//                                         <Grid item xs={6} sm={4}>
//                                             <Card className="amenity-card">
//                                                 <Typography variant="body2">Furnished</Typography>
//                                             </Card>
//                                         </Grid>
//                                     )}
//                                 </Grid>
//                             </Grid>
//                         </Grid>

//                         {/* Booking Button */}
//                         <Button variant="contained" color="primary" className="booking-button" onClick={handleBookingRequest}>
//                             Request Booking
//                         </Button>
//                     </div>
//                 </div>
//             ) : (
//                 <p>Loading property details...</p>
//             )}
//         </div>
//     );
// };

// export default Property;

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Card, Typography, Grid, Box, Divider } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import './property.css';
import { Chip } from '@mui/material';

// const userDetails = useSelector((state) => state.user.currentUser);
// const id = userDetails._id;

const Property = () => {
    const userDetails = useSelector((state) => state.user.currentUser);
    const id = userDetails._id;
    const params = useParams();
    const [property, setProperty] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/vendor/getvendor/${params.listingId}`);
                setProperty(response.data);
                console.log(property, "hello");
            } catch (err) {
                setError('Failed to load property details.');
            }
        };

        fetchProperty();
    }, [params.listingId]);

    
    const handleBookingRequest = async () => {
        try {
          
            const response = await axios.get(`http://localhost:3000/api/tenant/gettenant/${id}`); 
    
            if (response.status === 200) {
                const tenantData = response.data; 
                console.log("Tenant Profile Data:", tenantData);
                const data={
                    "vendorId":id,
                    "tenantData":tenantData.tenant,
                }
                console.log("My data : ",data);
                const postResponse = await axios.post('http://localhost:3000/api/request/addrequest',data);
    
                if (postResponse.status === 201) {
                    console.log("Data successfully sent and stored in the database:", postResponse.data);
                } else {
                    console.error("Failed to store data in the database:", postResponse.statusText);
                }
            } else {
                console.error("Failed to fetch tenant profile data:", response.statusText);
            }
        } catch (error) {
            console.error("Error while fetching tenant profile data:", error.message);
        }
    };
    

    return (

        <div className="property-container">
            {property ? (

                <Box sx={{ padding: 4 }}>
                    {/* Property Name */}
                    <Typography variant="h4" gutterBottom>
                        {property.name}
                    </Typography>

                    {/* Carousel for Property Images */}
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={8}>
                            <Carousel className="property-carousel">
                                {property[0].imageURL.length > 0 ? (
                                    property[0].imageURL.map((img, index) => (
                                        <img src={img} alt={`Property Image ${index + 1}`} key={index} className="carousel-image" />
                                    ))
                                ) : (
                                    <img src="https://via.placeholder.com/600" alt="Placeholder Image" className="carousel-image" />
                                )}
                            </Carousel>
                        </Grid>

                        {/* Additional Images */}
                        <Grid item xs={12} md={4}>
                            <Grid container spacing={1}>
                                {property[0].imageURL.map((img, index) => (
                                    <Grid item xs={6} key={index}>
                                        <img src={img || "https://via.placeholder.com/150"} alt={`Property Thumbnail ${index + 2}`} className="thumbnail-image" />
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Description */}
                    <Typography variant="h6" mt={3}>
                        Description
                    </Typography>
                    <Typography variant="body1" color="textSecondary" gutterBottom>

                        {property[0].description}
                    </Typography>

                    {/* Divider */}
                    <Divider sx={{ my: 2 }} />

                    {/* Additional Information */}
                    <Typography variant="h6">Property Information</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="body1">Rent: ₹{property[0].rent}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">Security: ₹{property[0].security}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">Available Rooms: {property[0].availRooms}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">City: {property[0].city}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">State: {property[0].state}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">Nearby Market: {property[0].marketDistance} km</Typography>
                        </Grid>
                    </Grid>

                    {/* Divider */}
                    <Divider sx={{ my: 2 }} />

                    {/* Amenities */}
                    <Typography variant="h6">Amenities</Typography>

                    <Grid container spacing={2} className="amenities-list">
                        {property[0].ac && <Chip label="AC" color="primary" sx={{ mt: 3 }} />}
                        {property[0].electricBackup && <Chip label="Electric Backup" color="primary" sx={{ mt: 3 }} />}
                        {property[0].furnished && <Chip label="Furnished" color="primary" sx={{ mt: 3 }} />}
                        {property[0].gym && <Chip label="Gym" color="primary" sx={{ mt: 3 }} />}
                        {property[0].houseKeeping && <Chip label="Housekeeping" color="primary" sx={{ mt: 3 }} />}
                        {property[0].laundry && <Chip label="Laundry" color="primary" sx={{ mt: 3 }} />}
                        {property[0].mess && <Chip label="Mess" color="primary" sx={{ mt: 3 }} />}
                        {property[0].parking && <Chip label="Parking" color="primary" sx={{ mt: 3 }}/>}
                        {property[0].wifi && <Chip label="WiFi" color="primary" sx={{ mt: 3 }}/>}
                    </Grid>

                    {/* Booking Button */}
                    <Button variant="contained" color="primary" className="booking-button" onClick={handleBookingRequest} sx={{ mt: 4 }}>
                        Request Booking
                    </Button>
                </Box>
            ) : (
                <p>Loading property details...</p>
            )}
        </div>
    );
};

export default Property;
