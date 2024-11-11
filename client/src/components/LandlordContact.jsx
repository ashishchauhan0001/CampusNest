import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button } from '@mui/material';

const LandlordContact = () => {
  // Default landlord information
  const landlordInfo = {
    name: 'Rajesh Kumar',
    phone: '+91 9876543210',
    email: 'asch20080@gmail.com',
    address: '456, MG Road, Bengaluru, Karnataka, India',
    occupation: 'Real Estate Manager',
    experience: '10 years of property management experience',
    rating: '4.8/5',
  };

  const [message, setMessage] = useState('');

  // Handler for message input
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  // Handler for sending email
  const handleSendMessage = () => {
    // Open the user's email client with the message pre-filled
    window.location.href = `mailto:${landlordInfo.email}?subject=Inquiry about Property&body=${encodeURIComponent(
      message
    )}`;
  };

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', mt: 4, p: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ mb: 2 }}>
          Landlord Contact Information
        </Typography>
        <Typography variant="body1">
          <strong>Name:</strong> {landlordInfo.name}
        </Typography>
        <Typography variant="body1">
          <strong>Phone:</strong> {landlordInfo.phone}
        </Typography>
        <Typography variant="body1">
          <strong>Email:</strong> {landlordInfo.email}
        </Typography>
        <Typography variant="body1">
          <strong>Address:</strong> {landlordInfo.address}
        </Typography>
        <Typography variant="body1">
          <strong>Occupation:</strong> {landlordInfo.occupation}
        </Typography>
        <Typography variant="body1">
          <strong>Experience:</strong> {landlordInfo.experience}
        </Typography>
        <Typography variant="body1">
          <strong>Rating:</strong> {landlordInfo.rating}
        </Typography>

        {/* Message Input */}
        <TextField
          label="Your Message"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          sx={{ mt: 3 }}
          value={message}
          onChange={handleMessageChange}
        />

        {/* Send Message Button */}
        <Button
          onClick={handleSendMessage}
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
        >
          Send Message
        </Button>
      </CardContent>
    </Card>
  );
};

export default LandlordContact;
