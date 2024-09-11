import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapLocation = ({ latitude, longitude, setLatitude, setLongitude }) => {
  const [position, setPosition] = useState([
    latitude || 23.7181,
    longitude || 90.4007,
  ]);
  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
        setLatitude(e.latlng.lat);
        setLongitude(e.latlng.lng);
      },
    });

    return <Marker position={position} />;
  };

  return (
    <MapContainer center={position} zoom={15} className="w-full h-[400px]">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
  );
};

export default MapLocation;
