import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Typography, Box, Grid, Card, CardContent, Avatar } from '@mui/material';
import { GiConsoleController } from 'react-icons/gi';
import "./showlist.css";
import Dash from './dash';

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

                if (response.status === 201) {
                    setTenantData(response.data.request);
                } else {
                    console.log("No tenant data found:");
                    setError('No tenant data found for this user.');
                }
            } catch (err) {
                console.error("Error fetching tenant data:", err.message);
                setError('Failed to fetch tenant data. Please try again later.');
            }
        };
        checkTenant();
    }, [userId]);
    console.log(tenantData, 900);

    // Handle click for Accept or Reject
    const handleClick = async (status, id) => {
        console.log("Status : ", status, " ID : ", id);
        // setClick(true)

        try {
            // API call to update the tenant status
            const response = await axios.put(`http://localhost:3000/api/request/updateStatus/${id}`, {
                status: status,
            });

            if (response.status === 200) {
                alert(`Tenant request ${status} successfully.`);
                // Update the local state to reflect the change
                setTenantData(prevData =>
                    prevData.map(tenant =>
                        tenant._id === id ? { ...tenant, status: status } : tenant
                    )
                );
            } else {
                alert(`Failed to update the status. Please try again.`);
            }
        } catch (err) {
            console.error("Error updating tenant status:", err.message);
            alert(`Error: ${err.message}`);
        }
    };

    return (
        <>
            <Dash />
            <div className="show-tenant-container main-box2 ">
                {error && (
                    <Typography color="error" className="error-message">
                        {error}
                    </Typography>
                )}
                {console.log("Tenant data ", tenantData)}
                {tenantData && tenantData.length > 0 ? (
                    tenantData.map((tenant) => (
                        <div key={tenant._id} className="tenant-card">
                            <div className=" profile1">
                                <img
                                    onClick={() => window.open(tenant.tenantData.userImg, '_blank')}
                                    src={tenant.tenantData.userImg}
                                    alt="Profile Image"
                                    
                                />
                            </div>



                            <div className="tenant-details">
                                <Typography variant="h6" className="tenant-name">
                                    Name: {tenant.tenantData.name}
                                </Typography>
                                <div className="tenant-info">
                                    <div>
                                        <strong>Organization:</strong> {tenant.tenantData.organization}
                                    </div>
                                    <div>
                                        <strong>Designation:</strong> {tenant.tenantData.designation}
                                    </div>
                                    <div>
                                        <strong>Address:</strong> {tenant.tenantData.address}
                                    </div>
                                    <div>
                                        <strong>Govt Id Number:</strong> {tenant.tenantData.aadhaarNo}
                                    </div>
                                    <div>
                                        <strong>Experience:</strong> {tenant.tenantData.experience} years
                                    </div>
                                    <button
                                        onClick={() => window.open(tenant.tenantData.aadhaarURL, '_blank')}
                                        className="view-id-btn"
                                    >
                                        View Govt ID
                                    </button>

                                    <div className="action-buttons">
                                        <button onClick={() => handleClick('accepted', tenant._id)} className="action-button accept">
                                            Accept
                                        </button>
                                        <button onClick={() => handleClick('rejected', tenant._id)} className="action-button reject">
                                            Reject
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <Typography variant="body1" className="no-requests">No requests</Typography>
                )}
            </div>
        </>
    );
}

export default Showtenant;
