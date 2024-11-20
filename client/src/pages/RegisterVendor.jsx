import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Grid } from '@mui/material';
import { storage } from '../firebase'; // import Firebase storage
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './vend.css';
import toast, { Toaster } from 'react-hot-toast';

const RegisterVendor = () => {
    const userDetails = useSelector((state) => state.user.currentUser);
    const id = userDetails._id;
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [imageURLs, setImageURLs] = useState([]);
    const [rooms, setRooms] = useState('');
    const [vendorDetails, setVendorDetails] = useState({
        vendorId: id,
        name: '',
        description: '',
        address: '',
        state: '',
        city: '',
        type:'',
        rent: 0,
        security: 0,
        marketDistance: 0,
        availRooms: 0,
        totalRooms: 0,
        wifi: false,
        parking: false,
        laundry: false,
        mess: false,
        ac: false,
        gym: false,
        furnished: false,
        electricBackup: false,
        houseKeeping: false,
    });

    const amenOptions = [
        { label: 'Wi-Fi', key: 'wifi' },
        { label: 'Parking', key: 'parking' },
        { label: 'Laundry', key: 'laundry' },
        { label: 'Mess', key: 'mess' },
        { label: 'AC', key: 'ac' },
        { label: 'Gym', key: 'gym' },
        { label: 'Furnished', key: 'furnished' },
        { label: 'Electric Backup', key: 'electricBackup' },
        { label: 'House Keeping', key: 'houseKeeping' },
    ];

    const handleAmenityClick = (amenityKey) => {
        setVendorDetails(prevDetails => ({
            ...prevDetails,
            [amenityKey]: !prevDetails[amenityKey]
        }));
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(files);
    };

    const handleUploadClick = () => {
        document.getElementById('fileInput').click();
    };

    const handleRoomsChange = (e) => {
        setRooms(e.target.value);
        setVendorDetails({ ...vendorDetails, totalRooms: parseInt(e.target.value, 10) || 0 });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setVendorDetails({
            ...vendorDetails,
            [name]: ['rent', 'security', 'marketDistance', 'availRooms'].includes(name) ? parseInt(value, 10) || 0 : value
        });
    };

    const uploadImagesToFirebase = async () => {
        const urls = [];
        for (const file of selectedFiles) {
            const storageRef = ref(storage, `vendors/${Date.now()}_${file.name}`);
            await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);
            urls.push(url);
        }
        setImageURLs(urls);
        console.log("NOrmal urls : ",urls);
        console.log("Image urls : ",imageURLs);
        
        return urls;
    };

    const addVendor = async () => {
        try {
            const urls = await uploadImagesToFirebase();
            const vendorData = {
                ...vendorDetails,
                imageURL: urls, // Add image URLs to vendor details
            };

            const response = await axios.post('http://localhost:3000/api/vendor/addvendor', vendorData);
            if (response.data.success) {
                toast.success('Vendor Registered Successfully');
                
            } else {
                toast.error('Failed to Register Vendor: ' + response.data.message);

            }
        } catch (error) {
            console.error('Error registering vendor:', error);
            toast.error('Failed to Register Vendor: Network or Server error');
            
        }
    };

    return (
        <form className="pg-form">
            <h1 className="text-2xl text-center p-5 font-mono">List Your Property</h1>
            <Grid container spacing={3}>
                
                <Grid item xs={12} >
                    <TextField label="Name Of The Property" fullWidth 
                    required name="name" 
                    onChange={handleInputChange} />
                </Grid>
                <Grid item xs={12} >
                    <TextField label="Description" fullWidth 
                    required name="description" 
                    onChange={handleInputChange} 
                    multiline
                    rows={4} />
                </Grid>
                {/* Address Section */}
                <Grid item xs={12} sm={6}>
                    <TextField label="Address" fullWidth 
                    required name="address" 
                    onChange={handleInputChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="State" required fullWidth
                     name="state" onChange={handleInputChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="City" fullWidth 
                    required name="city" onChange={handleInputChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Rent Amount" fullWidth
                     required type="number" name="rent" onChange={handleInputChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Security Amount" fullWidth
                     required type="number" name="security" onChange={handleInputChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Market distance(km)" fullWidth
                     required name="marketDistance" onChange={handleInputChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Available Rooms" fullWidth 
                    required type="number" name="availRooms" onChange={handleInputChange} />
                </Grid>

                {/* Number of Rooms Section */}
                <Grid item xs={12} sm={6}>
                    <TextField label="Number of Rooms" fullWidth
                     required type="number" value={rooms} onChange={handleRoomsChange} />
                </Grid>
                <Grid item xs={12} >
                    <TextField label="Paste your Google Calendar link" fullWidth
                     required   name="calendar" onChange={handleInputChange} />
                </Grid>

                {/* Upload Photos Section */}
                <Grid item xs={12}>
                    <div className="photo-box" onClick={handleUploadClick}>
                        <p>Upload Image</p>
                        <input id="fileInput" type="file" multiple accept="image/*" 
                        onChange={handleFileChange} style={{ display: 'none' }} />
                    </div>
                    {selectedFiles.length > 0 && <p>{selectedFiles.length} file(s) selected</p>}
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        select
                      
                        fullWidth
                        required
                        name="type"
                        value={vendorDetails.type}
                        onChange={handleInputChange}
                        SelectProps={{
                            native: true,
                        }}
                    >
                        <option value="">Select Type :</option>
                        <option value="Boys">Boys</option>
                        <option value="Girls">Girls</option>
                        <option value="Girls">Both</option>
                    </TextField>
                </Grid>

                {/* Amenities Section */}
                <Grid item xs={12}>
                    <div className="amen-box">
                        <p>Amenities:</p>
                        <div className="amen-btns">
                            {amenOptions.map((amenity) => (
                                <Button
                                    key={amenity.key}
                                    variant={vendorDetails[amenity.key] ? 'contained' : 'outlined'}
                                    onClick={() => handleAmenityClick(amenity.key)}
                                    style={{ margin: '5px' }}
                                >
                                    {amenity.label}
                                </Button>
                            ))}
                        </div>
                    </div>
                </Grid>

                {/* Register Button */}
                <Grid item xs={12} className="next-box">
                    <Button variant="contained" style={{ margin: '0px' }} onClick={addVendor}>
                        Add
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default RegisterVendor;
