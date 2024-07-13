import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";

import Button from "../Button/Button";
import { useCities } from "../../contexts/CitiesProvider";

import { useGeolocation } from "../../hooks/useGeoLocation";
import { usePosition } from "../../hooks/usePosition";

import styles from "./Map.module.css";

function Map() {
  const [mapPoition, setMapPoition] = useState([40, 30]);
  const { cities } = useCities();
  const { position: myPosition, getPosition, isLoading } = useGeolocation();
  const [lat, lng] = usePosition();

  useEffect(() => {
    if (myPosition) {
      setMapPoition([myPosition.lat, myPosition.lng]);
    }
  }, [myPosition]);

  useEffect(() => {
    if (lat && lng) {
      setMapPoition([lat, lng]);
    }
  }, [lat, lng]);

  return (
    <div className={styles.mapContainer}>
      {!myPosition && (
        <Button onClick={getPosition} type="position">
          {isLoading ? "Loading..." : "Use my location"}
        </Button>
      )}
      <MapContainer
        className={styles.map}
        center={mapPoition}
        zoom={5}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker key={city.id} position={city.position}>
            <Popup>
              <span>{city.emoji}</span> {city.cityName}
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPoition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
  return null;
}

export default Map;
