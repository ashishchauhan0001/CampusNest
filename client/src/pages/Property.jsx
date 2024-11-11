import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Card, Typography, Grid, Box, Divider } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import "./property.css";
import { Chip } from "@mui/material";

// const userDetails = useSelector((state) => state.user.currentUser);
// const id = userDetails._id;

const Property = () => {
  const userDetails = useSelector((state) => state.user.currentUser);
  const id = userDetails._id;
  const params = useParams();
  const [property, setProperty] = useState(null);
  const [error, setError] = useState(null);
  const [contact, setContact] = useState(false);



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
                const data = {
                    "vendorId": property[0].vendorId,
                    "tenantData": tenantData.tenant,
                }
                console.log("My data : ", data);
                const postResponse = await axios.post('http://localhost:3000/api/request/addrequest', data);

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
    console.log(property, "data of property")


  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/landlord-contact");
  };

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/vendor/getvendor/${params.listingId}`
        );
        setProperty(response.data);
        console.log(property, "hello");
      } catch (err) {
        setError("Failed to load property details.");
      }
    };


    fetchProperty();
  }, [params.listingId]);

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
                    <img
                      src={img}
                      alt={`Property Image ${index + 1}`}
                      key={index}
                      className="carousel-image"
                    />
                  ))
                ) : (
                  <img
                    src="https://via.placeholder.com/600"
                    alt="Placeholder Image"
                    className="carousel-image"
                  />
                )}
              </Carousel>
            </Grid>

            {/* Additional Images */}
            <Grid item xs={12} md={4}>
              <Grid container spacing={1}>
                {property[0].imageURL.map((img, index) => (
                  <Grid item xs={6} key={index}>
                    <img
                      src={img || "https://via.placeholder.com/150"}
                      alt={`Property Thumbnail ${index + 2}`}
                      className="thumbnail-image"
                    />
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



                    <div className="property-info-container">
                        <h2 className="property-title">Property Information</h2>
                        <div className="property-info">
                            <div className="property-info-item">
                                <span className="info-label">Rent:</span>
                                <span className="info-value">₹{property[0].rent}</span>
                            </div>
                            <div className="property-info-item">
                                <span className="info-label">Security:</span>
                                <span className="info-value">₹{property[0].security}</span>
                            </div>
                            <div className="property-info-item">
                                <span className="info-label">Available Rooms:</span>
                                <span className="info-value">{property[0].availRooms}</span>
                            </div>
                            <div className="property-info-item">
                                <span className="info-label">City:</span>
                                <span className="info-value">{property[0].city}</span>
                            </div>
                            <div className="property-info-item">
                                <span className="info-label">State:</span>
                                <span className="info-value">{property[0].state}</span>
                            </div>
                            <div className="property-info-item">
                                <span className="info-label">Nearby Market:</span>
                                <span className="info-value">{property[0].marketDistance} km</span>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <Divider sx={{ my: 2 }} />

          <div className="property-info-container">
            <h2 className="property-title">Property Information</h2>
            <div className="property-info">
              <div className="property-info-item">
                <span className="info-label">Rent:</span>
                <span className="info-value">₹{property[0].rent}</span>
              </div>
              <div className="property-info-item">
                <span className="info-label">Security:</span>
                <span className="info-value">₹{property[0].security}</span>
              </div>
              <div className="property-info-item">
                <span className="info-label">Available Rooms:</span>
                <span className="info-value">{property[0].availRooms}</span>
              </div>
              <div className="property-info-item">
                <span className="info-label">City:</span>
                <span className="info-value">{property[0].city}</span>
              </div>
              <div className="property-info-item">
                <span className="info-label">State:</span>
                <span className="info-value">{property[0].state}</span>
              </div>
              <div className="property-info-item">
                <span className="info-label">Nearby Market:</span>
                <span className="info-value">
                  {property[0].marketDistance} km
                </span>
              </div>
            </div>
          </div>


          {/* Divider */}
          <Divider sx={{ my: 2 }} />


                    <Grid container spacing={2} className="amenities-list">
                        {property[0].ac && <Chip label="AC" color="primary" sx={{ mt: 3 }} />}
                        {property[0].electricBackup && <Chip label="Electric Backup" color="primary" sx={{ mt: 3 }} />}
                        {property[0].furnished && <Chip label="Furnished" color="primary" sx={{ mt: 3 }} />}
                        {property[0].gym && <Chip label="Gym" color="primary" sx={{ mt: 3 }} />}
                        {property[0].houseKeeping && <Chip label="Housekeeping" color="primary" sx={{ mt: 3 }} />}
                        {property[0].laundry && <Chip label="Laundry" color="primary" sx={{ mt: 3 }} />}
                        {property[0].mess && <Chip label="Mess" color="primary" sx={{ mt: 3 }} />}
                        {property[0].parking && <Chip label="Parking" color="primary" sx={{ mt: 3 }} />}
                        {property[0].wifi && <Chip label="WiFi" color="primary" sx={{ mt: 3 }} />}
                    </Grid>

          {/* Amenities */}
          <h2 className="amenities-title">WHAT DOES IT OFFER??</h2>


          <Grid container spacing={2} className="amenities-list">
            {property[0].ac && (
              <Chip label="AC" color="primary" sx={{ mt: 3 }} />
            )}
            {property[0].electricBackup && (
              <Chip label="Electric Backup" color="primary" sx={{ mt: 3 }} />
            )}
            {property[0].furnished && (
              <Chip label="Furnished" color="primary" sx={{ mt: 3 }} />
            )}
            {property[0].gym && (
              <Chip label="Gym" color="primary" sx={{ mt: 3 }} />
            )}
            {property[0].houseKeeping && (
              <Chip label="Housekeeping" color="primary" sx={{ mt: 3 }} />
            )}
            {property[0].laundry && (
              <Chip label="Laundry" color="primary" sx={{ mt: 3 }} />
            )}
            {property[0].mess && (
              <Chip label="Mess" color="primary" sx={{ mt: 3 }} />
            )}
            {property[0].parking && (
              <Chip label="Parking" color="primary" sx={{ mt: 3 }} />
            )}
            {property[0].wifi && (
              <Chip label="WiFi" color="primary" sx={{ mt: 3 }} />
            )}
          </Grid>

          {/* Booking Button */}
          <Button
            variant="contained"
            color="primary"
            className="booking-button"
            onClick={handleBookingRequest}
            sx={{ mt: 4 }}
          >
            Request Booking
          </Button>


          <Button
            onClick={handleClick}
            variant="contained"
            color="primary"
            className="booking-button"
            sx={{ ml: 4, mt: 4 }}
          >
            Contact Landlord
          </Button>

        </Box>
      ) : (
        <p>Loading property details...</p>
      )}
    </div>
  );
};

export default Property;
