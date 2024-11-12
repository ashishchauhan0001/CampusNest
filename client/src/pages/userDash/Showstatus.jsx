import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Side from './side';
import { useSelector } from 'react-redux';

const Showstatus = () => {
  const [properties, setProperties] = useState([]);
  const userDetails = useSelector((state) => state.user.currentUser);
  const id = userDetails._id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/request/getproperty/${id}`);
        const responseData = response.data.responseData;
        
        const formattedProperties = responseData.map((item) => ({
          name: item.propertyId?.name,
          address: item.propertyId?.address,
          rent: item.propertyId?.rent,
          security: item.propertyId?.security,
          wifi: item.propertyId?.wifi,
          parking: item.propertyId?.parking,
          laundry: item.propertyId?.laundry,
          mess: item.propertyId?.mess,
          ac: item.propertyId?.ac,
          gym: item.propertyId?.gym,
          furnished: item.propertyId?.furnished,
          electricBackup: item.propertyId?.electricBackup,
          houseKeeping: item.propertyId?.houseKeeping,
          imageURL: item.propertyId?.imageURL || 'https://via.placeholder.com/150',
        }));
        
        setProperties(formattedProperties);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Side />
      <div className="flex flex-col items-center p-8 bg-gray-50 min-h-screen">
        {properties.length === 0 ? (
          <p className="text-gray-500 text-lg">Loading...</p>
        ) : (
          properties.map((property, index) => (
            <div
              key={index}
              className="w-3/4 max-w-4xl bg-white shadow-md rounded-lg p-6 mb-6 ml-20 flex flex-col md:flex-row items-start md:items-center md:justify-between space-y-4 md:space-y-0"
            >
              <div className="md:w-1/3 flex-shrink-0">
                <img
                  src={property.imageURL}
                  alt="Property"
                  className="w-full h-48 object-contain rounded-lg"
                />
              </div>
              <div className="md:w-2/3 md:ml-6 space-y-2">
                <h3 className="text-xl font-semibold text-gray-800">{property.name}</h3>
                <p className="text-gray-600"><strong>Address:</strong> {property.address}</p>
                <p className="text-gray-600"><strong>Rent:</strong> ₹{property.rent}</p>
                <p className="text-gray-600"><strong>Security:</strong> ₹{property.security}</p>
                <p className="text-gray-600"><strong>Amenities:</strong> 
                  {property.wifi && ' WiFi,'}
                  {property.parking && ' Parking,'}
                  {property.laundry && ' Laundry,'}
                  {property.mess && ' Mess,'}
                  {property.ac && ' AC,'}
                  {property.gym && ' Gym,'}
                  {property.furnished && ' Furnished,'}
                  {property.electricBackup && ' Electric Backup,'}
                  {property.houseKeeping && ' Housekeeping,'}
                </p>
              </div>
              <div className="md:w-1/6 flex flex-col space-y-2">
                <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 text-sm font-bold"> View Status</button>
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">Send Token</button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Showstatus;
