import { useNavigate } from "react-router-dom"
import { Input } from '../Input'
import { useEffect } from 'react';
import {
    validateTitle,
    validateDescription,
    validateCoo,
    validationImgUrl,
    validationEmail
} from '../../shared/validators'
import { useNewStore } from '../../shared/hooks'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { useState } from "react"

export const ImgUrl = ({ imgUrl }) => {
    const defaultImageUrl = "https://img.freepik.com/vector-premium/vector-icono-imagen-predeterminado-pagina-imagen-faltante-diseno-sitio-web-o-aplicacion-movil-no-hay-foto-disponible_87543-11093.jpg";

    return (
        <div className="img">
            <img src={imgUrl || defaultImageUrl} width='100%' height='100%' alt="Image" />
        </div>
    )
}

export const NewUser = () => {
    console.log("NewUser component is rendered");


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    const navigate = useNavigate()

    const { newStore, isLoading } = useNewStore();

    const [isStoreOwner, setIsStoreOwner] = useState(false);
    const [formState, setFormState] = useState({
        name: {
            value: '',
            isValid: false,
            showError: false
        },
        email: {
            value: '',
            isValid: false,
            showError: false
        },
        direction: {
            value: '',
            isValid: false,
            showError: false
        },
        avatarUrl: {
            value: '',
            isValid: false,
            showError: false
        },
        imgUrl: {
            value: '',
            isValid: false,
            showError: false
        },
        coordenadas: {
            value: '0, 0',
            isValid: false,
            showError: false
        },
    })

    const handleInputValueChange = (value, field) => {
        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                value
            }
        }))
    }

    const [coordinates, setCoordinates] = useState([0, 0]);

    const handleMapClick = (e) => {
        const { lat, lng } = e.latlng;
        setCoordinates([lat, lng]);
        handleInputValueChange(`${lat}, ${lng}`, 'coordenadas');
    };

    function MapClickHandler() {
        useMapEvents({
            click: handleMapClick,
        });
        return null;
    }

    const handleInputValidationOnBlur = (value, field) => {
        let isValid = false
        switch (field) {
            case 'name':
                isValid = validateTitle(value)
                break

            case 'email':
                isValid = validationEmail(value)
                break

            case 'direction':
                isValid = validateDescription(value)
                break

            case 'avatarUrl':
                isValid = validationImgUrl(value)
                break

            case 'imgUrl':
                isValid = validationImgUrl(value)
                break

            case 'coordenadas':
                isValid = validateCoo(value)
                break

            default:
                break
        }

        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                isValid,
                showError: !isValid
            }
        }))
    }

    const handleNewStore = (event) => {
        event.preventDefault()

        newStore(
            formState.name.value,
            formState.email.value,
            formState.direction.value,
            formState.avatarUrl.value,
            formState.imgUrl.value,
            formState.coordenadas.value
        )
    }

    const handleUserTypeSelection = (userType) => {
        if (userType === "storeOwner") {
            setIsStoreOwner(true);
        } else {
            setIsStoreOwner(false);
            navigate("/");
        }
    };

    const isSubmitButtonDisable = isLoading || !formState.name.isValid || !formState.email.isValid || !formState.direction.isValid || !formState.avatarUrl.isValid || !formState.imgUrl.isValid
    
    return (
        <div className="auth-container">
                <div className="new-store-container">
                    <form className='auth-form'>
                        <div className="input-box">
                            <Input
                                field='name'
                                placeholder='Name store'
                                className='login-input'
                                value={formState.name.value}
                                onChangeHandler={handleInputValueChange}
                                type='text'
                                onBlurHandler={handleInputValidationOnBlur}
                            />
                            <i className="fa-solid fa-signature"></i>
                        </div>
                        <div className="input-box">
                            <Input
                                field='email'
                                placeholder='Email store'
                                className='login-input'
                                value={formState.email.value}
                                onChangeHandler={handleInputValueChange}
                                type='text'
                                onBlurHandler={handleInputValidationOnBlur}
                            />
                            <i className="fa-solid fa-envelope"></i>
                        </div>
                        <div className="input-box">
                            <Input
                                field='direction'
                                placeholder='Direction store'
                                className='login-input'
                                value={formState.direction.value}
                                onChangeHandler={handleInputValueChange}
                                type='text'
                                onBlurHandler={handleInputValidationOnBlur}
                            />
                            <i className="fa-solid fa-route"></i>
                        </div>
                        <div className="input-box">
                            <Input
                                field='avatarUrl'
                                placeholder='Your image'
                                className='login-input'
                                value={formState.avatarUrl.value}
                                onChangeHandler={handleInputValueChange}
                                type='text'
                                onBlurHandler={handleInputValidationOnBlur}
                            />
                            <i className="fa-solid fa-camera"></i>
                        </div>
                        <ImgUrl className='avatar-new-img' imgUrl={formState.avatarUrl.value} />
                        <div className="input-box">
                            <Input
                                field='imgUrl'
                                placeholder='Store image'
                                className='login-input'
                                value={formState.imgUrl.value}
                                onChangeHandler={handleInputValueChange}
                                type='text'
                                onBlurHandler={handleInputValidationOnBlur}
                            />
                            <i className="fa-solid fa-image"></i>
                        </div>
                        <ImgUrl className='store-new-img' imgUrl={formState.imgUrl.value} />
                        <div className="input-box">
                            <Input
                                field='coordenadas'
                                placeholder=''
                                className='login-input'
                                value={formState.coordenadas.value}
                                onChangeHandler={handleInputValueChange}
                                disabled={true}
                                type='text'
                                onBlurHandler={handleInputValidationOnBlur}
                            />
                            <i className="fa-solid fa-compass"></i>
                        </div>
                        <MapContainer
                            center={[0, 0]}
                            zoom={1}
                            style={{ height: '400px', width: '100%' }}
                        >
                            <TileLayer
                                className="tile-layer"
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <MapClickHandler />
                            <Marker
                                position={formState.coordenadas.value.split(',').map(coord => parseFloat(coord.trim()))}
                                className="marker"
                            >
                                <Popup className="popup">your store xd</Popup>
                            </Marker>
                        </MapContainer>
                        <button onClick={handleNewStore} disabled={isSubmitButtonDisable}>
                            Continue
                        </button>
                    </form>
                </div>
        </div >
    )
}