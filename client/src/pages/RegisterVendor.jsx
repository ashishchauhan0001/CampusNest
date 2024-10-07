import React, { useState } from 'react';
import { Button, TextField, Grid } from '@mui/material';
import './vend.css';

const RegisterVendor = () => {
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [rooms, setRooms] = useState('');

    const amenOptions = ['Wi-Fi', 'Parking', 'Laundry', 'Meals', 'AC', 'Gym', 'Study Room'];

    const handleAmenityClick = (amenity) => {
        if (selectedAmenities.includes(amenity)) {
            setSelectedAmenities(selectedAmenities.filter(item => item !== amenity));
        } else {
            setSelectedAmenities([...selectedAmenities, amenity]);
        }
    };

    const handleFileChange = (e) => {
        setSelectedFiles(Array.from(e.target.files)); // Converts the FileList to an array
    };

    const handleUploadClick = () => {
        document.getElementById('fileInput').click();
    };

    const handleRoomsChange = (e) => {
        setRooms(e.target.value); // Updates the state for the number of rooms
    };

    return (
        <form className="pg-form">
            <h1 className="form-head" style={{ margin: '30px' }}>List Your Property</h1>
            <Grid container spacing={3}>
                {/* Address Section */}
                <Grid item xs={12} sm={6}>
                    <TextField label="Address Line 1" fullWidth required />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Rent" fullWidth required type="number" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Address Line 2" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Security" fullWidth required type="number" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="City" fullWidth required />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Distance from Market (km)" fullWidth required />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Pincode" fullWidth required />
                </Grid>

                {/* Number of Rooms Section */}
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Number of Rooms"
                        fullWidth
                        required
                        type="number"
                        value={rooms}
                        onChange={handleRoomsChange} // Handle room input change
                    />
                </Grid>

                {/* Upload Photos Section */}
                <Grid item xs={12}>
                    <div className="photo-box" onClick={handleUploadClick}>
                        <p>Upload Image</p>
                        <input
                            id="fileInput"
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                    </div>
                    {selectedFiles.length > 0 && (
                        <p>{selectedFiles.length} file(s) selected</p>
                    )}
                </Grid>

                {/* Amenities Section */}
                <Grid item xs={12}>
                    <div className="amen-box">
                        <p>Amenities:</p>
                        <div className="amen-btns">
                            {amenOptions.map((amen) => (
                                <Button
                                    key={amen}
                                    variant={selectedAmenities.includes(amen) ? 'contained' : 'outlined'}
                                    onClick={() => handleAmenityClick(amen)}
                                    style={{ margin: '5px' }}
                                >
                                    {amen}
                                </Button>
                            ))}
                        </div>
                    </div>
                </Grid>

                {/* Register Button */}
                <Grid item xs={12} className="next-box">
                    <Button
                        variant="contained"
                        style={{ margin: '0px' }}
                        onClick={() => { console.log('Form submitted with:', rooms, selectedFiles, selectedAmenities); }}
                    >
                        Register
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default RegisterVendor;
