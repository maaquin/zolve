import { useNavigate } from "react-router-dom";
import { Input } from "../Input";
import { useEffect, useState } from "react";
import {
  validateTitle,
  validateDescription,
  validateCoo,
  validationEmail,
} from "../../shared/validators";
import { useNewStore } from "../../shared/hooks";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { useDropzone } from "react-dropzone";

export const ImgPreview = ({ file }) => {
    const defaultImageUrl =
      "https://img.freepik.com/vector-premium/vector-icono-imagen-predeterminado-pagina-imagen-faltante-diseno-sitio-web-o-aplicacion-movil-no-hay-foto-disponible_87543-11093.jpg";
    const imageUrl = file ? URL.createObjectURL(file) : defaultImageUrl;
  
    return (
      <div className="img" style={{ width: '100%', height: '100%' }}>
        <img src={imageUrl} width="100%" height="100%" alt="Preview" style={{ objectFit: 'cover' }} />
      </div>
    );
  };
  

export const NewUser = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const { newStore, isLoading } = useNewStore();
  const [isStoreOwner, setIsStoreOwner] = useState(false);
  const [files, setFiles] = useState({ avatarUrl: null, imgUrl: null });

  const [formState, setFormState] = useState({
    name: {
      value: "",
      isValid: false,
      showError: false,
    },
    email: {
      value: "",
      isValid: false,
      showError: false,
    },
    direction: {
      value: "",
      isValid: false,
      showError: false,
    },
    coordenadas: {
      value: "0, 0",
      isValid: false,
      showError: false,
    },
  });

  const handleInputValueChange = (value, field) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        value,
      },
    }));
  };

  const [coordinates, setCoordinates] = useState([0, 0]);

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setCoordinates([lat, lng]);
    handleInputValueChange(`${lat}, ${lng}`, "coordenadas");
  };

  function MapClickHandler() {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  }

  const handleInputValidationOnBlur = (value, field) => {
    let isValid = false;
    switch (field) {
      case "name":
        isValid = validateTitle(value);
        break;

      case "email":
        isValid = validationEmail(value);
        break;

      case "direction":
        isValid = validateDescription(value);
        break;

      case "coordenadas":
        isValid = validateCoo(value);
        break;

      default:
        break;
    }

    setFormState((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        isValid,
        showError: !isValid,
      },
    }));
  };

  const handleNewStore = (event) => {
    event.preventDefault();

    // Convert files to base64 or formData to send them to the backend
    // Assuming newStore function can handle files directly
    newStore(
      formState.name.value,
      formState.email.value,
      formState.direction.value,
      files.avatarUrl,
      files.imgUrl,
      formState.coordenadas.value
    );
  };

  const handleUserTypeSelection = (userType) => {
    if (userType === "storeOwner") {
      setIsStoreOwner(true);
    } else {
      setIsStoreOwner(false);
      navigate("/");
    }
  };

  const isSubmitButtonDisable =
    isLoading ||
    !formState.name.isValid ||
    !formState.email.isValid ||
    !formState.direction.isValid ||
    !formState.coordenadas.isValid;

  const onDrop = (acceptedFiles, field) => {
    setFiles((prevState) => ({
      ...prevState,
      [field]: acceptedFiles[0],
    }));
  };

  const {
    getRootProps: getAvatarRootProps,
    getInputProps: getAvatarInputProps,
  } = useDropzone({
    onDrop: (files) => onDrop(files, "avatarUrl"),
    accept: "image/*",
  });
  const { getRootProps: getImgRootProps, getInputProps: getImgInputProps } =
    useDropzone({
      onDrop: (files) => onDrop(files, "imgUrl"),
      accept: "image/*",
    });

  return (
    <div className="auth-container">
      <div className="new-store-container">
        <form className="auth-form" onSubmit={handleNewStore}>
          <div className="input-box">
            <Input
              field="name"
              placeholder="Name store"
              className="login-input"
              value={formState.name.value}
              onChangeHandler={handleInputValueChange}
              type="text"
              onBlurHandler={handleInputValidationOnBlur}
            />
            <i className="fa-solid fa-signature"></i>
          </div>

          <div className="input-box">
            <Input
              field="email"
              placeholder="Email store"
              className="login-input"
              value={formState.email.value}
              onChangeHandler={handleInputValueChange}
              type="text"
              onBlurHandler={handleInputValidationOnBlur}
            />
            <i className="fa-solid fa-envelope"></i>
          </div>

          <div className="input-box" style={{ marginBottom: "20px" }}>
            <Input
              field="direction"
              placeholder="Direction store"
              className="login-input"
              value={formState.direction.value}
              onChangeHandler={handleInputValueChange}
              type="text"
              onBlurHandler={handleInputValidationOnBlur}
            />
            <i className="fa-solid fa-route"></i>
          </div>

          <div
            className="dropzone-container"
            style={{ marginBottom: "10px", width: "100%" }}
            {...getAvatarRootProps()}>
            <input {...getAvatarInputProps()} />
            {files.avatarUrl ? (
              <ImgPreview file={files.avatarUrl} />
            ) : (
              <>
                <p>Drag and drop an image from the avatar or click to select one</p>
                <i className="fa-solid fa-camera" style={{ color: 'white'}}></i>
              </>
            )}
          </div>

          <div
            className="dropzone-container"
            style={{ width: "100%" }}
            {...getImgRootProps()}>
            <input {...getImgInputProps()} />
            {files.imgUrl ? (
              <ImgPreview file={files.imgUrl} />
            ) : (
              <>
                <p>Drag and drop an image from the store or click to select one</p>
                <i className="fa-solid fa-image" style={{ color: 'white'}}></i>
              </>
            )}
          </div>

          <div className="input-box">
            <Input
              field="coordenadas"
              placeholder=""
              className="login-input"
              value={formState.coordenadas.value}
              onChangeHandler={handleInputValueChange}
              disabled={true}
              type="text"
              onBlurHandler={handleInputValidationOnBlur}
            />
            <i className="fa-solid fa-compass"></i>
          </div>
          <MapContainer
            center={[0, 0]}
            zoom={1}
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer
              className="tile-layer"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapClickHandler />
            <Marker
              position={formState.coordenadas.value
                .split(",")
                .map((coord) => parseFloat(coord.trim()))}
              className="marker"
            >
              <Popup className="popup">your store xd</Popup>
            </Marker>
          </MapContainer>
          <button type="submit" disabled={isSubmitButtonDisable}>
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};
