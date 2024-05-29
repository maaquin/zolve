import { useNavigate } from "react-router-dom";

export const Botones = () => {
  const navigate = useNavigate();

  const handleUserTypeSelection = (userType) => {
    if (userType === "storeOwner") {
      navigate("/auth/store-owner");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="btn-container">
      <button className="btn-user" onClick={() => handleUserTypeSelection("consumer")}>
        Soy consumidor
      </button>
      <button className="btn-user" onClick={() => handleUserTypeSelection("storeOwner")}>
        Soy dueño de tienda
      </button>
    </div>
  );
};

