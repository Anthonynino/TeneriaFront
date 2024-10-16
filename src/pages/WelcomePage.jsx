import { Link } from "react-router-dom";
import imgTenería from "../assets/Planta-Teneria-Red.jpg";

function WelcomePage() {
  return (
    <>
      <img
        className="position-absolute"
        src={imgTenería}
        alt="imgTeneria"
        style={{ minWidth: "100%", height: "100vh", zIndex: -1 }}
      />
      <div
        className="row justify-content-center align-items-center"
        style={{
          minHeight: "100vh",
        }}
      >
        <div className="text-center">
          <h1 className="text-white">Bienvenido al Sistema de Gestión</h1>
          <div className="d-flex flex-column align-items-center">
            <img
              src="../src/assets/logo.png"
              alt=""
              style={{ height: "140px", width: "190px" }}
            />
            <Link to="/login">
              <button
                className="text-white py-2 mt-4 rounded-5 btn fw-bold button-hover"
                style={{
                  backgroundColor:"#DAA520",
                  width: "280px",
                  opacity: "0.9",
                }}
              >
                Ingresar
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default WelcomePage;
