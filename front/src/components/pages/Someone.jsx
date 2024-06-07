import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import { SearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useStores } from '../../shared/hooks';

import { userPin } from "./pins/UserPin";
import { storePin } from "./pins/StorePin";

export const Someone = () => {
    const { getStores, isFetching, allStores } = useStores();
    const [map, setMap] = useState(null);
    const [searchControl, setSearchControl] = useState(null);
    const [searchInputValue, setSearchInputValue] = useState('');
    const [markerPosition, setMarkerPosition] = useState(null);
    const [stores, setStores] = useState([]);
    const [executions, setExecutions] = useState(0);

    useEffect(() => {
        if (executions < 2) {
            getStores();
            setExecutions(executions + 1);
        }
    }, [executions, getStores]);

    useEffect(() => {
        if (allStores.length > 0) {
            const processedStores = allStores.map(store => {
                const { name, coordenadas } = store;
                return { name, coordenadas };
            });
            setStores(processedStores);
            console.log(processedStores);
        }
    }, [allStores]);

    useEffect(() => {
        if (map && !searchControl) {
            const provider = new OpenStreetMapProvider();
            const searchControlInstance = new SearchControl({
                provider,
                style: 'bar',
                position: 'topleft',
                autoClose: true,
                keepResult: true,
            });
            setSearchControl(searchControlInstance);
            map.addControl(searchControlInstance);
        }
    }, [map, searchControl]);

    const handleMapInit = (map) => {
        setMap(map);
    };

    const handleInputChange = (event) => {
        setSearchInputValue(event.target.value);
    };

    const handleMapClick = (e) => {
        const { lat, lng } = e.latlng;
        setMarkerPosition([lat, lng]);
    };

    function MapClickHandler() {
        useMapEvents({
            click: handleMapClick,
        });
        return null;
    }

    const navigate = useNavigate();

    const handleUserTypeSelection = () => {
        navigate("/whatProblem?");
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${searchInputValue}&format=json`);
            if (response.ok) {
                const data = await response.json();
                if (data.length > 0) {
                    const { lat, lon } = data[0];
                    setMarkerPosition([parseFloat(lat), parseFloat(lon)]);
                    map.setView([parseFloat(lat), parseFloat(lon)], 12);
                } else {
                    toast('No results found', {
                        icon: '⛔',
                        style: {
                            borderRadius: '10px',
                            background: '#fff',
                            color: '#333',
                        },
                    });
                    toast('Try district or zone names', {
                        icon: '⚠️',
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

    function SetViewOnUserLocation({ location }) {
        const map = useMap();

        useEffect(() => {
            if (location) {
                map.setView(location, 13);
            }
        }, [location, map]);

        return null;
    }

    return (
        <div className="home-container">
            <div>
                <form className="buscar-box" onSubmit={handleFormSubmit}>
                    <span className="buscar-text">Where is the person?</span>
                    <br></br>
                    <l>If Zolve is not for you, you can use the search bar or click on the map to adjust the location</l>
                    <div className="search-box">
                        <input
                            className="buscar"
                            type="text"
                            value={searchInputValue}
                            onChange={handleInputChange}
                            placeholder="Enter the location or search on the map"
                        />
                        <span className="btn-buscar" role="button" onClick={handleFormSubmit}>
                            <i className="fa-solid fa-magnifying-glass" style={{ color: '#fff' }}></i>
                        </span>
                    </div>
                </form >
            </div >

            <div className="map-box">
                <MapContainer
                    center={[14.64072, -90.51327]}
                    zoom={10}
                    style={{ height: '400px', width: '100%' }}
                    whenCreated={handleMapInit}
                >
                    <TileLayer
                        className="tile-layer"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MapClickHandler />
                    {markerPosition && (
                        <Marker position={markerPosition} icon={userPin}>
                            <Popup>Selected location</Popup>
                        </Marker>
                    )}
                    {stores.map((store, index) => (
                        <Marker
                            key={index}
                            position={store.coordenadas.split(',').map(coord => parseFloat(coord.trim()))}
                            icon={storePin}
                        >
                            {console.log(store.coordenadas)}
                            <Popup>{store.name}</Popup>
                        </Marker>
                    ))}
                    <SetViewOnUserLocation location={markerPosition} />
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