import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { SearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { useUserDetails } from "../../shared/hooks";

import carro from '../../assets/home/coche.png'
import grua from '../../assets/home/camion-de-remolque.png'
import pc from '../../assets/home/computadora.png'
import phone from '../../assets/home/marketing.png'

const ImgPreview = ({ src, height, alt }) => {
    const defaultImageUrl =
        "https://img.freepik.com/vector-premium/vector-icono-imagen-predeterminado-pagina-imagen-faltante-diseno-sitio-web-o-aplicacion-movil-no-hay-foto-disponible_87543-11093.jpg";
    
    const img = src ? src : defaultImageUrl;

    return (
        <div className="image" style={{ height }}>
            <img
                src={img}
                className="img-home"
                alt={alt}
                style={{ objectFit: "cover" }}
            />
        </div>
    );
};

export const Home = () => {
    const [map, setMap] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [searchControl, setSearchControl] = useState(null);
    const [searchInputValue, setSearchInputValue] = useState('');
    const [markerPosition, setMarkerPosition] = useState(null);

    const { isLogged } = useUserDetails();

    const [formState, setFormState] = useState({
        location: {
            value: ''
        }
    })

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
            {!isLogged ? (
                <div>
                    <div className="container-no-login">

                        <section id="about" className="section">
                            <div className="text">
                                <h2>Asistencia en emergencias vehiculares</h2>
                                <p>Pide asistencia, recibe ayuda rápidamente y sigue tu camino.</p>
                            </div>
                            <ImgPreview src={grua} alt="Emergencia vehicular" height="%100" />
                        </section>

                        <section id="services" className="section">
                            <div class="text">
                                <h2>Conduce sin preocupaciones</h2>
                                <p>Genera tranquilidad en tu propio tiempo con nuestros servicios de asistencia automotriz. Puedes estar seguro de que siempre tendrás ayuda a mano, ya sea que uses tu propio auto o un vehículo de renta.</p>
                            </div>
                            <ImgPreview src={carro} alt="Servicios automotrices" height="%100" />
                        </section>

                        <section id="how-it-works" className="section">
                            <div className="text">
                                <h2>Cómo funciona</h2>
                                <p>Desarrollamos una aplicación móvil para solicitar rápida asistencia automotriz en emergencias, sin importar la ubicación o el seguro del usuario. Nos aliamos con negocios locales de servicios automotrices para garantizar respuestas eficientes y fortalecer la comunidad empresarial.</p>
                            </div>
                            <ImgPreview src={phone} alt="Cómo funciona la aplicación" height="%100" />
                        </section>

                        <section id="contact" className="section">
                            <div className="mails">
                                <h2>Contacto</h2>
                                <p>Para más información, contáctanos en:</p>
                                <ul>
                                    <li><i className="fa-solid fa-at"></i><a href="mailto:info@zolve.com">Correo Electrónico</a></li>
                                    <li><i className="fa-brands fa-google"></i><a href="https://mail.google.com/mail/?view=cm&fs=1&to=info@zolve.com" target="_blank">Gmail</a></li>
                                    <li><i className="fa-brands fa-microsoft"></i><a href="https://outlook.office.com/mail/deeplink/compose?to=info@zolve.com" target="_blank">Outlook</a></li>
                                </ul>
                            </div>
                            <ImgPreview src={pc} alt="Contacto" height="%100" />
                        </section>

                    </div>
                    <footer>
                        <p>&copy; 2024 Zolve. Todos los derechos reservados.</p>
                    </footer>
                </div>
            ) : (
                <>
                    <div>
                        <form className="buscar-box" onSubmit={handleFormSubmit}>
                            <span className="buscar-text">Change location</span>
                            <div className="search-box">
                                <input
                                    className="buscar"
                                    type="text"
                                    value={searchInputValue}
                                    onChange={handleInputChange}
                                    placeholder="Ingrese una dirección..."
                                />
                                <span className="btn-buscar" role="button" onClick={handleFormSubmit}>
                                    <i className="fa-solid fa-magnifying-glass" style={{ color: '#fff' }}></i>
                                </span>
                            </div>
                        </form >
                    </div >

                    <div className="map-box">
                        <MapContainer
                            center={userLocation || [14.64072, -90.51327]}
                            zoom={10}
                            style={{ height: '500px', width: '100%' }}
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
                </>
            )}
        </div >
    );
};