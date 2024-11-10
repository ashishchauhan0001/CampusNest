import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Typography, Box, Grid, Card, CardContent, Avatar } from '@mui/material';

function Showtenant() {
    const [tenantData, setTenantData] = useState(null);
    const [error, setError] = useState('');

    // Get the current user ID from Redux store
    const userDetails = useSelector((state) => state.user.currentUser);
    const userId = userDetails?._id;
    console.log("User ID : ", userId);
    

    useEffect(() => {
        const checkTenant = async () => {
            if (!userId) {
                alert('User ID not found. Please log in.');
                return;
            }

            try {
                // Call the API to fetch tenant data
                const response = await axios.get(`http://localhost:3000/api/request/getrequest/${userId}`);
                
                const tenants = response.data.request.map(req => req.tenantData.tenant);
                console.log("DATA : ", response.data.request[0].tenantData.userID);
                
                
                if (response.status === 201) {
                    setTenantData(response);
                } else {
                    console.log("NO Tenant data found:");
                    setError('No tenant data found for this user.');
                }
            } catch (err) {
                console.error("Error fetching tenant data:", err.message);
                setError('Failed to fetch tenant data. Please try again later.');
            }
        };

        checkTenant();
    }, [userId]);

    return (
        <Box sx={{ padding: 4 }}>
            {error && (
                <Typography color="error" sx={{ mb: 2 }}>
                    {error}
                </Typography>
            )}
            {tenantData ? (
                <Card variant="outlined" sx={{ mb: 3 }}>
                    <Grid container alignItems="center" spacing={2}>
                        {/* Avatar Section */}
                        <Grid item xs={2}>
                            <Avatar
                                src={tenantData.aadhaarURL}
                                alt="Aadhaar Image"
                                sx={{ width: 64, height: 64 }}
                            />
                        </Grid>

                        {/* Tenant Details Section */}
                        <Grid item xs={10}>
                            <CardContent>
                                <Typography variant="h6" sx={{ mb: 1 }}>
                                    Name: {tenantData.name}
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={3}>
                                        <Typography variant="body1">
                                            <strong>Organization:</strong> {tenantData.organization}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography variant="body1">
                                            <strong>Skills:</strong> {tenantData.skills}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography variant="body1">
                                            <strong>Experience:</strong> {tenantData.experience} years
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography variant="body1">
                                            <strong>Start Date:</strong> {new Date(tenantData.createdAt).toLocaleDateString()}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Grid>
                    </Grid>
                </Card>
            ) : (
                <Typography variant="body1">Loading tenant data...</Typography>
            )}
        </Box>
    );
}

export default Showtenant;
