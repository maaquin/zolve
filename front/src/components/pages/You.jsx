import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { SearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const You = () => {
    const [map, setMap] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [searchControl, setSearchControl] = useState(null);
    const [searchInputValue, setSearchInputValue] = useState('');
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

    useEffect(() => {
        if (map && !searchControl) {
            const provider = new OpenStreetMapProvider();
            const searchControl = new SearchControl({
                provider,
                style: 'bar',
                position: 'topleft',
                autoClose: true,
                keepResult: true,
            });
            setSearchControl(searchControl);
            map.addControl(searchControl);
        }
    }, [map, searchControl]);

    const handleMapInit = (map) => {
        setMap(map);
    };

    const handleInputChange = (event) => {
        setSearchInputValue(event.target.value);
    };

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

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${searchInputValue}&format=json`);
            if (response.ok) {
                const data = await response.json();
                if (data.length > 0) {
                    const { lat, lon } = data[0];
                    setMarkerPosition([parseFloat(lat), parseFloat(lon)]);
                    setUserLocation(null);
                    map.setView([parseFloat(lat), parseFloat(lon)], 12);
                } else {
                    toast('No se encontraron resultados', {
                        icon: '❌',
                        style: {
                            borderRadius: '10px',
                            background: '#fff',
                            color: '#333',
                        },
                    });
                    toast('Intenta con nombres de distritos o zonas', {
                        icon: '❗',
                        style: {
                            borderRadius: '10px',
                            background: '#fff',
                            color: '#333',
                        },
                    });
                    console.log("No se encontraron resultados");
                }
            } else {
                console.error("Error al realizar la búsqueda");
            }
        } catch (error) {
            console.error("Error de red:", error);
        }
    };

    return (
        <div className="home-container">
            <div>
                <form className="buscar-box" onSubmit={handleFormSubmit}>
                    <span className="buscar-text">Where you are?</span>
                    <br></br>
                    <l>Your location will be obtained automatically through geolocation, this may take a few minutes. But you can adjust it by clicking the map</l>
                </form >
            </div >

            <div className="map-box">
                <MapContainer
                    center={userLocation || [14.64072, -90.51327]}
                    zoom={10}
                    style={{ height: '400px', width: '100%' }}
                    whenCreated={handleMapInit}
                >
                    <TileLayer
                        className="tile-layer"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MapClickHandler />
                    {userLocation && (
                        <Marker position={userLocation}>
                            <Popup>Tu ubicación</Popup>
                        </Marker>
                    )}
                    {markerPosition && (
                        <Marker position={markerPosition}>
                            <Popup>Ubicación buscada</Popup>
                        </Marker>
                    )}
                </MapContainer>
            </div>
            <div className="btns">
                <button className="btn-user zolve-btn" onClick={() => handleUserTypeSelection()}>
                    Continue
                </button>
            </div>
        </div >
    );
};