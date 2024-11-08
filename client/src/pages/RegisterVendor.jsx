// import React, { useState } from 'react';
// import { Button, TextField, Grid } from '@mui/material';
// import './vend.css';

// const RegisterVendor = () => {
//     const [selectedAmenities, setSelectedAmenities] = useState([]);
//     const [selectedFiles, setSelectedFiles] = useState([]);
//     const [rooms, setRooms] = useState('');
//     const [vendorDetails, setVendorDetails] = useState({
//         address: '',
//         state: '',
//         city: '',
//         rent: '',
//         security: '',
//         marketDistance: '',
//         availRooms: '',
//         totalRooms: '',
//         wifi: false,
//         parking: false,
//         laundry: false,
//         mess: false,
//         ac: false,
//         gym: false,
//         furnished: false,
//         electricBackup: false,
//         houseKeeping: false,
//         imageURL: []
//     });

//     const amenOptions = ['Wi-Fi', 'Parking', 'Laundry', 'Mess', 'AC', 'Gym', 'Furnished', 'Electric Backup', 'House Keeping'];

//     const handleAmenityClick = (amenity) => {
//         const newAmenities = new Set(selectedAmenities); // Use Set for efficient data management
//         if (newAmenities.has(amenity)) {
//             newAmenities.delete(amenity); // Remove if already selected
//         } else {
//             newAmenities.add(amenity); // Add if not selected
//         }
//         setSelectedAmenities(Array.from(newAmenities)); // Convert Set to Array and update state
//     };

//     const handleFileChange = (e) => {
//         const files = Array.from(e.target.files); // Convert FileList to array
//         setSelectedFiles(files);
//     };

//     const handleUploadClick = () => {
//         document.getElementById('fileInput').click();
//     };

//     const handleRoomsChange = (e) => {
//         setRooms(e.target.value);
//         setVendorDetails({ ...vendorDetails, totalRooms: e.target.value });
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setVendorDetails({ ...vendorDetails, [name]: value });
//     };

//     const addVendor = async () => {
//         let formData = new FormData();

//         // Append all vendor details to FormData
//         formData.append('address', vendorDetails.address);
//         formData.append('state', vendorDetails.state);
//         formData.append('city', vendorDetails.city);
//         formData.append('rent', vendorDetails.rent);
//         formData.append('security', vendorDetails.security);
//         formData.append('marketDistance', vendorDetails.marketDistance);
//         formData.append('availRooms', vendorDetails.availRooms);
//         formData.append('totalRooms', vendorDetails.totalRooms);

//         // Append selected amenities to FormData
//         selectedAmenities.forEach((amenity) => {
//             formData.append('amenities[]', amenity);
//         });

//         // Append selected images to FormData
//         selectedFiles.forEach((file) => {
//             formData.append('images', file);
//         });
//         console.log(vendorDetails);

//         try {
//             const response = await fetch('http://localhost:3000/api/vendor/addvendor', {
//                 method: 'POST',
//                 body: formData,
//             });
//             const data = await response.json();

//             if (data.success) {
//                 alert('Vendor Registered Successfully');
//             } else {
//                 alert('Failed to Register Vendor: ' + data.message); // Log detailed error message
//             }
//         } catch (error) {
//             console.error('Error registering vendor:', error); // Catch and log fetch errors
//             alert('Failed to Register Vendor: Network or Server error');
//         }
//     };


//     return (
//         <form className="pg-form">
//             <h1 className="text-2xl text-center p-5 font-mono">List Your Property</h1>
//             <Grid container spacing={3}>
//                 {/* Address Section */}
//                 <Grid item xs={12} sm={6}>
//                     <TextField
//                         label="Address Line 1"
//                         fullWidth
//                         required
//                         name="address"
//                         onChange={handleInputChange}
//                     />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                     <TextField
//                         label="State"
//                         required
//                         fullWidth
//                         name="state"
//                         onChange={handleInputChange}
//                     />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                     <TextField
//                         label="City"
//                         fullWidth
//                         required
//                         name="city"
//                         onChange={handleInputChange}
//                     />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                     <TextField
//                         label="Rent Amount"
//                         fullWidth
//                         required
//                         type="number"
//                         name="rent"
//                         onChange={handleInputChange}
//                     />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                     <TextField
//                         label="Security Amount"
//                         fullWidth
//                         required
//                         type="number"
//                         name="security"
//                         onChange={handleInputChange}
//                     />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                     <TextField
//                         label="Market distance(km)"
//                         fullWidth
//                         required
//                         name="marketDistance"
//                         onChange={handleInputChange}
//                     />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                     <TextField
//                         label="Available Rooms"
//                         fullWidth
//                         required
//                         type="number"
//                         name="availRooms"
//                         onChange={handleInputChange}
//                     />
//                 </Grid>

//                 {/* Number of Rooms Section */}
//                 <Grid item xs={12} sm={6}>
//                     <TextField
//                         label="Number of Rooms"
//                         fullWidth
//                         required
//                         type="number"
//                         value={rooms}
//                         onChange={handleRoomsChange}
//                     />
//                 </Grid>

//                 {/* Upload Photos Section */}
//                 <Grid item xs={12}>
//                     <div className="photo-box" onClick={handleUploadClick}>
//                         <p>Upload Image</p>
//                         <input
//                             id="fileInput"
//                             type="file"
//                             multiple
//                             accept="image/*"
//                             onChange={handleFileChange}
//                             style={{ display: 'none' }}
//                         />
//                     </div>
//                     {selectedFiles.length > 0 && <p>{selectedFiles.length} file(s) selected</p>}
//                 </Grid>

//                 {/* Amenities Section */}
//                 <Grid item xs={12}>
//                     <div className="amen-box">
//                         <p>Amenities:</p>
//                         <div className="amen-btns">
//                             {amenOptions.map((amenity, index) => (
//                                 <Button
//                                     key={index}
//                                     variant={selectedAmenities.includes(amenity) ? 'contained' : 'outlined'}
//                                     onClick={() => handleAmenityClick(amenity)}
//                                     style={{ margin: '5px' }}
//                                 >
//                                     {amenity}
//                                 </Button>
//                             ))}
//                         </div>
//                     </div>
//                 </Grid>

//                 {/* Register Button */}
//                 <Grid item xs={12} className="next-box">
//                     <Button
//                         variant="contained"
//                         style={{ margin: '0px' }}
//                         onClick={addVendor} // Call addVendor when button is clicked
//                     >
//                         Add
//                     </Button>
//                 </Grid>
//             </Grid>
//         </form>
//     );
// };

// export default RegisterVendor;




import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Grid } from '@mui/material';
import './vend.css';

const RegisterVendor = () => {
    const userDetails = useSelector((state) => state.user.currentUser);
    const id=userDetails._id;
    console.log(id,"hello");
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [rooms, setRooms] = useState('');
    const [vendorDetails, setVendorDetails] = useState({
        vendorId:id,
        name:'',
        description:'',
        address: '',
        state: '',
        city: '',
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

    const addVendor = async () => {
        try {
            console.log(vendorDetails);

            const response = await axios.post('http://localhost:3000/api/vendor/addvendor', vendorDetails);
            if (response.data.success) {
                alert('Vendor Registered Successfully');
            } else {
                alert('Failed to Register Vendor: ' + response.data.message);
            }
        } catch (error) {
            console.error('Error registering vendor:', error);
            alert('Failed to Register Vendor: Network or Server error');
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

                {/* Upload Photos Section */}
                <Grid item xs={12}>
                    <div className="photo-box" onClick={handleUploadClick}>
                        <p>Upload Image</p>
                        <input id="fileInput" type="file" multiple accept="image/*" 
                        onChange={handleFileChange} style={{ display: 'none' }} />
                    </div>
                    {selectedFiles.length > 0 && <p>{selectedFiles.length} file(s) selected</p>}
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
