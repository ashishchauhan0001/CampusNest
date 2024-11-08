import React, { useState } from 'react';
import { Button, TextField, Grid } from '@mui/material';
import axios from 'axios';
import './profile.css';

const BuildProfile = () => {
    const [tenantDetails, setTenantDetails] = useState({
        name: '',
        address: '',
        aadhaarNumber: '',
        organization: '',
        skills: '',
        experience: '',
    });
    const [aadhaarPhoto, setAadhaarPhoto] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTenantDetails({ ...tenantDetails, [name]: value });
    };

    const handleAadhaarPhotoChange = (e) => {
        setAadhaarPhoto(e.target.files[0]);
    };

    const handleProfileSubmit = async () => {
        const formData = new FormData();
        formData.append('name', tenantDetails.name);
        formData.append('address', tenantDetails.address);
        formData.append('aadhaarNumber', tenantDetails.aadhaarNumber);
        formData.append('organization', tenantDetails.organization);
        formData.append('skills', tenantDetails.skills);
        formData.append('experience', tenantDetails.experience);

        // Append Aadhaar photo if selected
        if (aadhaarPhoto) {
            formData.append('aadhaarPhoto', aadhaarPhoto);
        }

        try {
            const response = await axios.post('http://localhost:3000/api/tenant/createprofile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                alert('Profile created successfully');
            } else {
                alert('Failed to create profile: ' + response.data.message);
            }
        } catch (error) {
            console.error('Error creating profile:', error);
            alert('Failed to create profile: Network or server error');
        }
    };

    return (
        <form className="profile-form">
            <h1 className="text-2xl text-center p-5 font-mono">Create Tenant Profile</h1>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Name"
                        fullWidth
                        required
                        name="name"
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Address"
                        fullWidth
                        required
                        name="address"
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Designation"
                        fullWidth
                        required
                        name="designation"
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Aadhaar Number"
                        fullWidth
                        required
                        name="aadhaarNumber"
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Organization"
                        fullWidth
                        required
                        name="organization"
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Skills"
                        fullWidth
                        required
                        name="skills"
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Experience"
                        type="number"
                        fullWidth
                        required
                        name="experience"
                        onChange={handleInputChange}
                    />
                </Grid>

                {/* Aadhaar Photo Upload Section */}
                <Grid item xs={12}>
                    <div className="photo-upload">
                        <p>Upload Aadhaar Photo</p>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleAadhaarPhotoChange}
                        />
                    </div>
                </Grid>

                {/* Submit Button */}
                <Grid item xs={12} className="submit-box">
                    <Button
                        variant="contained"
                        onClick={handleProfileSubmit}
                    >
                        Submit Profile
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default BuildProfile;
