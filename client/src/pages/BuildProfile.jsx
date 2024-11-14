import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, TextField, Chip, Grid } from '@mui/material';
import axios from 'axios';
import { storage } from '../firebase.js';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './profile.css';
import { useDispatch } from 'react-redux';
import { build, org } from '../redux/user/userSlice.js';

const BuildProfile = () => {
    const dispatch = useDispatch();
    const userDetails = useSelector((state) => state.user.currentUser);

    const id = userDetails._id;
    const [tenantDetails, setTenantDetails] = useState({
        name: '',
        userImg: userDetails.avatar,
        userID: id,
        address: '',
        designation: '',
        aadhaarNo: '',
        organization: '',
        skills: [],
        experience: 0,
    });


    const [aadhaarURL, setAadhaarURL] = useState(null);
    const [skillInput, setSkillInput] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTenantDetails({ ...tenantDetails, [name]: value });
    };


    const handleSkillInputChange = (e) => {
        setSkillInput(e.target.value);
    };

    const addSkill = (e) => {
        if (e.key === 'Enter' && skillInput.trim()) {
            setTenantDetails((prevState) => ({
                ...prevState,
                skills: [...prevState.skills, skillInput.trim()],
            }));
            setSkillInput('');
        }
    };

    const removeSkill = (index) => {
        setTenantDetails((prevState) => ({
            ...prevState,
            skills: prevState.skills.filter((_, i) => i !== index),
        }));
    };

    const handleAadhaarURL = (e) => {
        setAadhaarURL(e.target.files[0]);
    };

    const uploadAadhaarImage = async () => {
        if (!aadhaarURL) return null;

        const storageRef = ref(storage, `aadhaar/${Date.now()}_${aadhaarURL.name}`);
        await uploadBytes(storageRef, aadhaarURL);
        const url = await getDownloadURL(storageRef);
        return url;
    };
    console.log("Tenant Data : ", tenantDetails);
    console.log("URL : ", aadhaarURL);


    const handleProfileSubmit = async () => {
        try {
            const aadhaarImageURL = await uploadAadhaarImage();
            console.log("URL : ", aadhaarImageURL);


            const profileData = {
                ...tenantDetails,
                aadhaarURL: aadhaarImageURL, // Add uploaded Aadhaar image URL
            };
             
            const response = await axios.post('http://localhost:3000/api/tenant/addtenant', profileData);
            if (response.data.success) {
                alert('Profile created successfully');
                dispatch(build(true));
                console.log(tenantDetails.organization,899);
                dispatch(org(tenantDetails.organization));

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
                        value={tenantDetails.name}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Address"
                        fullWidth
                        required
                        name="address"
                        value={tenantDetails.address}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Designation"
                        fullWidth
                        required
                        name="designation"
                        value={tenantDetails.designation}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Aadhaar Number"
                        fullWidth
                        required
                        name="aadhaarNo"
                        value={tenantDetails.aadhaarNo}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Organization"
                        fullWidth
                        required
                        name="organization"
                        value={tenantDetails.organization}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Add Skill"
                        fullWidth
                        value={skillInput}
                        onChange={handleSkillInputChange}
                        onKeyDown={addSkill}
                        placeholder="Type a skill and press Enter"
                    />
                    <div className="skills-chips">
                        {tenantDetails.skills.map((skill, index) => (
                            <Chip
                                key={index}
                                label={skill}
                                onDelete={() => removeSkill(index)}
                                color="primary"
                                style={{ margin: '5px' }}
                            />
                        ))}
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Experience (years)"
                        type="number"
                        fullWidth
                        required
                        name="experience"
                        value={tenantDetails.experience}
                        onChange={handleInputChange}
                    />
                </Grid>

                <Grid item xs={12}>
                    <div className="photo-upload">
                        <p>Upload Aadhaar Photo</p>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleAadhaarURL}
                        />
                    </div>
                </Grid>

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
