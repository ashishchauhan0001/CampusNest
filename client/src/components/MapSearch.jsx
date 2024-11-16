import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconShadow from 'leaflet/dist/images/marker-shadow.png';

const defaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerIconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

const MapSearch = () => {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState(null);

  const locations = [
    { id: 1, name: 'Mumbai', lat: 19.0760, lng: 72.8777, description: 'Financial capital of India.' },
    { id: 2, name: 'Delhi', lat: 28.6139, lng: 77.2090, description: 'Capital city known for its historical sites.' },
    { id: 3, name: 'Bangalore', lat: 12.9716, lng: 77.5946, description: 'IT hub with pleasant weather.' },
    { id: 4, name: 'Chennai', lat: 13.0827, lng: 80.2707, description: 'Coastal city known for its cultural heritage.' },
    { id: 5, name: 'Hyderabad', lat: 17.3850, lng: 78.4867, description: 'City of pearls and biryani.' },
    { id: 6, name: 'Pune', lat: 18.5204, lng: 73.8567, description: 'Education and cultural hub.' },
    { id: 7, name: 'Kolkata', lat: 22.5726, lng: 88.3639, description: 'City of joy with a rich colonial history.' },
    { id: 8, name: 'Noida', lat: 28.5355, lng: 77.3910, description: 'Modern city known for IT parks and infrastructure.' }

  ];
  

  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
  };

  const handleNavigate = (location) => {
    const searchTerm = location.name.toUpperCase();
    navigate(`/search?searchTerm=${searchTerm}`);
  };
  

  return (
    <div className="flex flex-col md:flex-row h-screen" >
        
      {/* Sidebar */}
      <div className="w-full md:w-1/4 bg-gray-900 text-white p-4 overflow-y-auto ">
        <h2 className="text-2xl font-bold mb-4">Select a Location</h2>
        <ul className="space-y-4">
          {locations.map((location) => (
            <li
              key={location.id}
              className="p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition-all"
              onClick={() => handleNavigate(location)}
            >
              <h3 className="text-xl font-semibold">{location.name}</h3>
              <p className="text-gray-400">{location.description}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Map Container */}
      <div className="flex-1">
        <MapContainer center={[20.6245, 81.209]} zoom={5} className="h-full w-full">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
         {locations.map((location) => (
  <Marker
    key={location.id}
    position={[location.lat, location.lng]}
    eventHandlers={{
      click: () => handleMarkerClick(location),
    }}
  >
    <Popup>
      <div className="text-center">
        <h3 className="font-bold">{location.name}</h3>
        <p>{location.description}</p>
        <button
          onClick={() => handleNavigate(location)}
          className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all"
        >
          View Properties
        </button>
      </div>
    </Popup>
  </Marker>
))}

        </MapContainer>
      </div>

      {/* Info Box */}
      {selectedLocation && (
        <div className="absolute bottom-4 left-4 w-80 p-4 bg-white shadow-lg rounded-lg border border-gray-200">
          <h3 className="text-xl font-bold">{selectedLocation.name}</h3>
          <p className="text-gray-700">{selectedLocation.description}</p>
          <button
            onClick={() => handleNavigate(selectedLocation)}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all"
          >
            Explore Properties
          </button>
        </div>
      )}
    </div>
  );
};

export default MapSearch;
