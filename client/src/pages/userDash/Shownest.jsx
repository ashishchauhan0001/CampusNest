import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaWifi, FaCar, FaTshirt, FaUtensils, FaSnowflake, FaDumbbell, FaCouch, FaBolt, FaBroom } from 'react-icons/fa';
import Side from './side';

function Shownest() {
  const [vendorData, setVendorData] = useState([]);
  const userDetails = useSelector((state) => state.user.currentUser);
  const id = userDetails._id;

  // Fetch vendor listing data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/vendor/getnest/${id}`);
        const data = await response.json();
        setVendorData(data);
      } catch (error) {
        console.error('Error fetching vendor data:', error);
      }
    };

    fetchData();
  }, [id]);

  // Check if there's data to display
  if (vendorData.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold">Loading your Campus Nest...</p>
      </div>
    );
  }

  const vendor = vendorData[0]; // Displaying only one property

  return (
    <>
      <Side />
      <div className="p-6 bg-gradient-to-br from-blue-50 to-gray-100 min-h-screen flex flex-col items-center">
        <div className="max-w-3xl w-full bg-white shadow-2xl rounded-lg overflow-hidden">
          {/* Image Section */}
          {vendor.imageURL && vendor.imageURL.length > 0 && (
            <img
              src={vendor.imageURL[0]}
              alt={vendor.name}
              className="w-full h-64 object-cover"
            />
          )}

          {/* Vendor Details */}
          <div className="p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{vendor.name}</h2>
            <p className="text-gray-600 mb-4">{vendor.description}</p>

            <div className="mb-4">
              <p>
                <span className="font-bold">Address:</span> {vendor.address}, {vendor.city}, {vendor.state}
              </p>
              <p>
                <span className="font-bold">Rent:</span> ₹{vendor.rent}
              </p>
              <p>
                <span className="font-bold">Security Deposit:</span> ₹{vendor.security}
              </p>
              <p>
                <span className="font-bold">Market Distance:</span> {vendor.marketDistance} km
              </p>
              <p>
                <span className="font-bold">Available Rooms:</span> {vendor.availRooms}
              </p>
              <p>
                <span className="font-bold">Total Rooms:</span> {vendor.totalRooms === -1 ? 'Not Specified' : vendor.totalRooms}
              </p>
            </div>

            {/* Amenities Section */}
            <div className="mt-6">
              <h4 className="text-2xl font-semibold mb-4">Amenities</h4>
              <div className="grid grid-cols-2 gap-4">
                {vendor.wifi && <Amenity icon={<FaWifi />} label="Wi-Fi" />}
                {vendor.parking && <Amenity icon={<FaCar />} label="Parking" />}
                {vendor.laundry && <Amenity icon={<FaTshirt />} label="Laundry" />}
                {vendor.mess && <Amenity icon={<FaUtensils />} label="Mess" />}
                {vendor.ac && <Amenity icon={<FaSnowflake />} label="Air Conditioning" />}
                {vendor.gym && <Amenity icon={<FaDumbbell />} label="Gym" />}
                {vendor.furnished && <Amenity icon={<FaCouch />} label="Furnished" />}
                {vendor.electricBackup && <Amenity icon={<FaBolt />} label="Electric Backup" />}
                {vendor.houseKeeping && <Amenity icon={<FaBroom />} label="House Keeping" />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Amenity Component for Icons
function Amenity({ icon, label }) {
  return (
    <div className="flex items-center space-x-2">
      <div className="text-sky-600 text-2xl">{icon}</div>
      <p className="text-gray-700 font-medium">{label}</p>
    </div>
  );
}

export default Shownest;
