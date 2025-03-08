import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker  } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100vh",
}

const Map = ({ children }) => {
  const [location, setLocation] = useState({ lat: 34.684930, lng: -82.814777 });

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <LoadScript googleMapsApiKey="AIzaSyCprRyn7dVMBMfLhB1s1BlSDfP8dagT8CQ">
        <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={12}>
          <Marker position={location} />
        </GoogleMap>
      </LoadScript>

      <button
        onClick={getUserLocation}
      >
        Get My Location
      </button>

      {children}
    </div>
  );
};

export default Map;