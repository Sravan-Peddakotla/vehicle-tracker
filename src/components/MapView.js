import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";

const RecenterMap = ({ latlng }) => {
  const map = useMap();

  useEffect(() => {
    if (latlng) {
      map.setView(latlng, map.getZoom(), { animate: true });
    }
  }, [latlng, map]);

  return null;
};


const carIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/744/744465.png",
  iconSize: [40, 40], 
});

const MapView = ({ route, isPlaying }) => {
  const [index, setIndex] = useState(0);
  const [position, setPosition] = useState(route[0]);

  const intervalRef = useRef(null);
  const polylinePoints = route.slice(0, index + 1).map(p => [p.latitude, p.longitude]);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setIndex((prev) => {
          if (prev < route.length - 1) {
            setPosition(route[prev + 1]);
            return prev + 1;
          } else {
            clearInterval(intervalRef.current);
            return prev;
          }
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPlaying, route]);

  return (
    <div className="map-container">
      <MapContainer
        center={[position.latitude, position.longitude]}
        zoom={16}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker
          position={[position.latitude, position.longitude]}
          icon={carIcon}
        />
        <Polyline positions={polylinePoints} color="blue" />
        <RecenterMap latlng={[position.latitude, position.longitude]} />
      </MapContainer>
      <div className="info">
        <p><strong>Lat:</strong> {position.latitude}</p>
        <p><strong>Lng:</strong> {position.longitude}</p>
        <p><strong>Time:</strong> {position.timestamp}</p>
      </div>
    </div>
  );
};

export default MapView;
