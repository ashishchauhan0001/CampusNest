import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaWifi, FaCar, FaTshirt, FaUtensils, FaSnowflake, FaDumbbell, FaCouch, FaBolt, FaBroom } from 'react-icons/fa';
import SwiperCore from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import './property.css';
import CommentsSection from '../components/CommentSection';
import toast, { Toaster } from 'react-hot-toast';
import url from '../url.jsx';

SwiperCore.use([Navigation, Pagination, Autoplay]);

const Property = () => {
  const userDetails = useSelector((state) => state.user.currentUser);
  const profile = useSelector((state) => state.user.profile);
  const id = userDetails._id;
  const params = useParams();
  const [property, setProperty] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`${url}/api/vendor/getvendor/${params.listingId}`);
        setProperty(response.data[0]);
      } catch (err) {
        setError('Failed to load property details.');
      }
    };

    fetchProperty();
  }, [params.listingId]);


  const handleImageClick = (img) => {
    setSelectedImage(img);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const handleBookingRequest = async () => {
    try {
      console.log(profile, 90)
      if (!profile) {
        toast.error("Please create your profile first!");
        navigate('/build');
        return;
      }
      const response = await axios.get(`${url}/api/tenant/gettenant/${id}`);
      if (response.status === 200) {
        const tenantData = response.data.tenant;
        const data = {
          vendorId: property.vendorId,
          tenantData,
          propertyId: property._id,
        };

        if (id === data.vendorId) {
          toast.error("You cannot book your own property!");

          return;
        }

        const postResponse = await axios.post(`${url}/api/request/addrequest`, data);
        if (postResponse.status === 201) {
          toast.success("Request sent successfully!");
        } else {
          console.error('Failed to store data:', postResponse.statusText);
        }
      }
    } catch (error) {
      console.error('Error while fetching tenant profile data:', error.message);
    }
  };

  const handleContactClick = () => {
    navigate('/landlord-contact');
  };
  const handletourClick = () => {
    window.open(property.calendar);
  };

  if (!property) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold">Loading property details...</p>
      </div>
    );
  }

  return (


    <div className="p-6 bg-gradient-to-br from-blue-50 to-gray-100 min-h-screen flex flex-col items-center">
      <div className="max-w-3xl w-full bg-white shadow-2xl rounded-lg overflow-hidden">
        {/* Swiper for Property Images */}
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          className="w-full h-64"
        >
          {property.imageURL && property.imageURL.length > 0 ? (
            property.imageURL.map((img, index) => (
              <SwiperSlide key={index} onClick={() => handleImageClick(img)}>
                <img src={img} alt={`Property Image ${index + 1}`} className="w-full h-64 object-cover cursor-pointer" />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <img src="https://via.placeholder.com/600" alt="Placeholder Image" className="w-full h-64 object-cover" />
            </SwiperSlide>
          )}
        </Swiper>

        {/* Modal for Full-Size Image */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="relative">
              <img src={selectedImage} alt="Full View" className="max-w-full max-h-screen object-contain" />
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white bg-gray-800 rounded-full p-2 hover:bg-gray-600"
              >
                X
              </button>
            </div>
          </div>
        )}

        {/* Property Details */}
        <div className="p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{property.name}</h2>
          <p className="text-gray-600 mb-4">{property.description}</p>

          {/* Property Information */}
          <div className="mb-4">
            <p><span className="font-bold">Address:</span> {property.address}, {property.city}, {property.state}</p>
            <p><span className="font-bold">Rent:</span> ₹{property.rent}</p>
            <p><span className="font-bold">Security Deposit:</span> ₹{property.security}</p>
            <p><span className="font-bold">Market Distance:</span> {property.marketDistance} km</p>
            <p><span className="font-bold">Available Rooms:</span> {property.availRooms}</p>
            <p><span className="font-bold">Hostel Type:</span> {property.type}</p>
          </div>

          {/* Amenities */}
          <h4 className="text-2xl font-semibold mb-4">Amenities</h4>
          <div className="grid grid-cols-2 gap-4">
            {property.wifi && <Amenity icon={<FaWifi />} label="Wi-Fi" />}
            {property.parking && <Amenity icon={<FaCar />} label="Parking" />}
            {property.laundry && <Amenity icon={<FaTshirt />} label="Laundry" />}
            {property.mess && <Amenity icon={<FaUtensils />} label="Mess" />}
            {property.ac && <Amenity icon={<FaSnowflake />} label="Air Conditioning" />}
            {property.gym && <Amenity icon={<FaDumbbell />} label="Gym" />}
            {property.furnished && <Amenity icon={<FaCouch />} label="Furnished" />}
            {property.electricBackup && <Amenity icon={<FaBolt />} label="Electric Backup" />}
            {property.houseKeeping && <Amenity icon={<FaBroom />} label="House Keeping" />}
          </div>

          {/* Booking and Contact Buttons */}
          <div className="mt-6 flex space-x-4">
            <button
              onClick={handleBookingRequest}
              className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Request Booking
            </button>
            <button
              onClick={handleContactClick}
              className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition duration-300"
            >
              Contact Landlord
            </button>
            {property.calendar && (
              <button
                onClick={handletourClick}
                className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition duration-300"
              >
                Request Property Tour
              </button>
            )}

          </div>
        </div>
        {/* Other property details here */}
        <CommentsSection propertyID={property._id} />
      </div>
      {/* Comment Section starts here */}



    </div>
  );
};

// Amenity Component for Icons
const Amenity = ({ icon, label }) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="text-sky-600 text-2xl">{icon}</div>
      <p className="text-gray-700 font-medium">{label}</p>
    </div>
  );
};

export default Property;
