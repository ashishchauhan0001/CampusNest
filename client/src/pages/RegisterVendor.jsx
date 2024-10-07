import React, { useState } from 'react';
import { Button, TextField, Grid } from '@mui/material';
import './vend.css';

const RegisterVendor = () => {
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [rooms, setRooms] = useState('');
    const [vendorDetails, setVendorDetails] = useState({
        Address1: '',
        State: '',
        City: '',
        Rent: '',
        Security: '',
        MarketDistance: '',
        AvailableRooms: '',
        TotalRooms: '',
        Amenities: [],
        Images: []
    });

    const amenOptions = ['Wi-Fi', 'Parking', 'Laundry', 'Mess', 'AC', 'Gym', 'Furnished', 'Electric Backup', 'House Keeping'];

    const handleAmenityClick = (amenity) => {
        const newAmenities = new Set(selectedAmenities); // Use Set for efficient data management
        if (newAmenities.has(amenity)) {
            newAmenities.delete(amenity); // Remove if already selected
        } else {
            newAmenities.add(amenity); // Add if not selected
        }
        setSelectedAmenities(Array.from(newAmenities)); // Convert Set to Array and update state
        setVendorDetails({ ...vendorDetails, Amenities: Array.from(newAmenities) });
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files); // Convert FileList to array
        setSelectedFiles(files);
    };

    const handleUploadClick = () => {
        document.getElementById('fileInput').click();
    };

    const handleRoomsChange = (e) => {
        setRooms(e.target.value);
        setVendorDetails({ ...vendorDetails, TotalRooms: e.target.value });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setVendorDetails({ ...vendorDetails, [name]: value });
    };

    const addVendor = async () => {
        let responseData;
        let formData = new FormData();
        
        // Append selected images to formData
        selectedFiles.forEach((file) => {
            formData.append('images', file);
        });

        // Upload images
        await fetch('http://localhost:5173/upload', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: formData,
        })
            .then((resp) => resp.json())
            .then((data) => {
                responseData = data;
            });

        if (responseData.success) {
            // If images are successfully uploaded, update vendor details with image URLs
            const imageUrls = responseData.image_urls;
            setVendorDetails({ ...vendorDetails, Images: imageUrls });

            // Now send the full vendor details to the server
            await fetch('http://localhost:5173/addvendor', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...vendorDetails, Images: imageUrls }),
            })
                .then((resp) => resp.json())
                .then((data) => {
                    if (data.success) {
                        alert('Vendor Registered Successfully');
                    } else {
                        alert('Failed to Register Vendor');
                    }
                });
        }
    };

    return (
        <form className="pg-form">
            <h1 className="text-2xl text-center p-5 font-mono">List Your Property</h1>
            <Grid container spacing={3}>
                {/* Address Section */}
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Address Line 1"
                        fullWidth
                        required
                        name="Address1"
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="State"
                        required
                        fullWidth
                        name="State"
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="City"
                        fullWidth
                        required
                        name="City"
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Rent Amount"
                        fullWidth
                        required
                        type="number"
                        name="Rent"
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Security Amount"
                        fullWidth
                        required
                        type="number"
                        name="Security"
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Market distance(km)"
                        fullWidth
                        required
                        name="MarketDistance"
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Available Rooms"
                        fullWidth
                        required
                        type="number"
                        name="AvailableRooms"
                        onChange={handleInputChange}
                    />
                </Grid>

                {/* Number of Rooms Section */}
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Number of Rooms"
                        fullWidth
                        required
                        type="number"
                        value={rooms}
                        onChange={handleRoomsChange}
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
                    {selectedFiles.length > 0 && <p>{selectedFiles.length} file(s) selected</p>}
                </Grid>

                {/* Amenities Section */}
                <Grid item xs={12}>
                    <div className="amen-box">
                        <p>Amenities:</p>
                        <div className="amen-btns">
                            {amenOptions.map((amenity, index) => (
                                <Button
                                    key={index}
                                    variant={selectedAmenities.includes(amenity) ? 'contained' : 'outlined'}
                                    onClick={() => handleAmenityClick(amenity)}
                                    style={{ margin: '5px' }}
                                >
                                    {amenity}
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
                        onClick={addVendor} // Call addVendor when button is clicked
                    >
                        Add
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default RegisterVendor;
