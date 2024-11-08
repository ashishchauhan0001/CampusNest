
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; // Import Leaflet for custom icons
import 'leaflet/dist/leaflet.css';


// Define the cities with their positions
const cities = [
    { name: 'Mumbai', position: [19.0760, 72.8777] },
    { name: 'Delhi', position: [28.6139, 77.2090] },
    { name: 'Bangalore', position: [12.9716, 77.5946] },
    { name: 'Chennai', position: [13.0827, 80.2707] },
    { name: 'Hyderabad', position: [17.3850, 78.4867] },
    { name: 'Pune', position: [18.5204, 73.8567] },
    { name: 'Kolkata', position: [22.5726, 88.3639] },
    { name: 'Ahmedabad', position: [23.0225, 72.5714] }
];

// Define a custom icon
const customIcon = new L.Icon({
    iconUrl: '/pointer.png', // Replace with your icon URL
    iconSize: [30, 30], // Size of the icon
    iconAnchor: [15, 30], // Point of the icon which will correspond to marker's location
    popupAnchor: [0, -30] // Point from which the popup should open relative to the iconAnchor
});

const MapSection = () => {
    return (
        <div className="map-container">
            <h1 className="page-title">Cities We Serve</h1>
            <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '500px', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {cities.map((city, index) => (
                    <Marker
                        key={index}
                        position={city.position}
                        icon={customIcon} // Use the custom icon
                    >
                        <Popup>{city.name}</Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default MapSection;
