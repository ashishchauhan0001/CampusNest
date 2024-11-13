import { Link } from 'react-router-dom';
import { MdLocationOn,MdFoodBank,MdWindPower  } from 'react-icons/md';
import { FaWifi, FaParking, FaCouch, FaBolt, FaSwimmingPool } from 'react-icons/fa';
import { GiVacuumCleaner, GiWashingMachine } from 'react-icons/gi';
import { BiDumbbell } from 'react-icons/bi';
import axios from 'axios';
import { useEffect,useState } from 'react';

export default function Card({ listing }) {

  const [organizationCount, setOrganizationCount] = useState(0);

  useEffect(() => {

    const organization = localStorage.getItem('organization');
    
    if (organization) {
        const fetchOrganizationCount = async () => {
          try {
            const response = await axios.get(`http://localhost:3000/api/vendor/getcount/${organization}`, {
                params: {
                    id: listing._id,
                },
            });
            console.log('Count of vendors:', response.data.count);
                if (response.data.success) {
                    setOrganizationCount(response.data.count);
                } else {
                    console.error('Failed to fetch count:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching organization count:', error);
            }
        };
        fetchOrganizationCount();
    }
}, []);

  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
      {/* <Link to={`/listing/${listing._id}`}> */}
      <Link to={`/property/${listing._id}`}>
        {/* Image Section */}
        <img
          src={
            listing.imageURL?.[0] ||
            'https://cdn.pixabay.com/photo/2024/06/14/19/14/house-8830418_1280.jpg'
          }
          alt='listing cover'
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
        />

        {/* Content Section */}
        <div className='p-3 flex flex-col gap-2 w-full'>
          {/* Title and Location */}
          <p className='truncate text-lg font-semibold text-slate-700'>
            {listing.name}
          </p>
          <div className='flex items-center gap-1'>
            <MdLocationOn className='h-4 w-4 text-green-700' />
            <p className='text-sm text-gray-600 truncate w-full'>
              {listing.address}
            </p>
          </div>

          {/* Description */}
          <p className='text-sm text-gray-600 line-clamp-2'>
            {listing.description}
          </p>

          {/* Rent and Market Distance */}
          <p className='text-slate-500 mt-2 font-semibold'>
            Rent: ₹{listing.rent?.toLocaleString('en-US')} / month
          </p>
          <p className='text-slate-500'>
            Market Distance: {listing.marketDistance} meters
          </p>
          <p className='text-green-600'> <span className='text-green-600 text-xl'> {organizationCount} </span> people from your organization stay here</p>

          {/* Room Details */}
          <div className='text-slate-700 flex gap-4'>
            <div className='font-bold text-xs'>
              {listing.totalRooms > 1
                ? `${listing.totalRooms} rooms`
                : `${listing.totalRooms} room`}
            </div>
            <div className='font-bold text-xs'>
              {listing.availRooms > 1
                ? `${listing.availRooms} available`
                : `${listing.availRooms} available`}
            </div>
          </div>

          {/* Amenities Section */}
          <div className='flex flex-wrap gap-2 mt-2 text-xs text-gray-600'>
            {listing.wifi && (
              <div className='flex items-center gap-1'>
                <FaWifi className='text-blue-500' /> Wi-Fi
              </div>
            )}
            {listing.parking && (
              <div className='flex items-center gap-1'>
                <FaParking className='text-yellow-600' /> Parking
              </div>
            )}
            {listing.electricBackup && (
              <div className='flex items-center gap-1'>
                <FaBolt className='text-red-500' /> E.Backup
              </div>
            )}
             {listing.ac && (
              <div className='flex items-center gap-1'>
                <MdWindPower  className='text-red-500' /> AC
              </div>
            )}
            {listing.gym && (
              <div className='flex items-center gap-1'>
                <BiDumbbell className='text-green-700' /> Gym
              </div>
            )}
            {listing.laundry && (
              <div className='flex items-center gap-1'>
                <GiWashingMachine className='text-purple-500' /> Laundry
              </div>
            )}
            {listing.houseKeeping && (
              <div className='flex items-center gap-1'>
                <GiVacuumCleaner className='text-pink-500' /> Housekeeping
              </div>
            )}
            {listing.furnished && (
              <div className='flex items-center gap-1'>
                <FaCouch className='text-brown-700' /> Furnished
              </div>
            )}
             {listing.mess && (
              <div className='flex items-center gap-1'>
                <MdFoodBank  className='text-green-700' /> Mess
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
