import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import { useNavigate } from "react-router-dom";

import { userPin } from "./pins/UserPin";

export const You = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [markerPosition, setMarkerPosition] = useState(null);

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation([latitude, longitude]);
                },
                (error) => {
                    console.error("Error al obtener la ubicación:", error);
                }
            );
        } else {
            console.error("Geolocalización no es compatible en este navegador.");
        }
    }, []);

    const navigate = useNavigate();

    const handleUserTypeSelection = () => {
        navigate("/whatProblem?");
    };

    const handleMapClick = (e) => {
        const { lat, lng } = e.latlng;
        setMarkerPosition([lat, lng]);
        setUserLocation(null);
    };

    function MapClickHandler() {
        useMapEvents({
            click: handleMapClick,
        });
        return null;
    }

    function SetViewOnUserLocation({ location }) {
        const map = useMap();

        useEffect(() => {
            if (location) {
                map.setView(location, 14);
            }
        }, [location, map]);

        return null;
    }

    return (
        <div className="home-container">
            <div>
                <form className="buscar-box">
                    <span className="buscar-text">Where you are?</span>
                    <br />
                    <label>Your location will be obtained automatically through geolocation, this may take a few minutes. But you can adjust it by clicking the map</label>
                </form>
            </div>

            <div className="map-box">
                <MapContainer
                    id="map"
                    center={userLocation || [14.64072, -90.51327]}
                    zoom={10}
                    style={{ height: '400px', width: '100%' }}
                >
                    <TileLayer
                        className="tile-layer"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MapClickHandler />
                    {userLocation && (
                        <Marker position={userLocation} icon={userPin}>
                            <Popup>User location</Popup>
                        </Marker>
                    )}
                    {markerPosition && (
                        <Marker position={markerPosition} icon={userPin}>
                            <Popup>User location</Popup>
                        </Marker>
                    )}
                    <SetViewOnUserLocation location={userLocation} />
                </MapContainer>
            </div>
            <div className="btns">
                <button className="btn-user zolve-btn" onClick={handleUserTypeSelection}>
                    Continue
                </button>
            </div>
        </div>
    );
};