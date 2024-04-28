import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <>
      <div className="d-flex justify-content-center vh-100 aling-items-center">
        <form className="p-5 border rounded form-login rounded-5 my-auto shadow-box">
          <h3 className="mb-3 fw-bold text-center">Iniciar sesion</h3>
          <div className="text-center">
            <img src="../src/assets/logo2.png" alt="" className="logo mb-4" />
          </div>
          <div className="form-floating mb-4">
            <input
              type="email"
              className="form-control shadow-sm bg-white rounded-4"
              placeholder="name@example.com"
            />
            <label>Usuario</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control shadow-sm bg-white rounded-4"
              placeholder="Contraseña"
            />
            <label>Contraseña</label>
          </div>
          <Link to="/homepage">
            <button
              className="text-white w-100 py-2 mt-4 mb-3 border rounded-pill fw-bold button-submit"
              type="submit"
            >
              Ingresar
            </button>
          </Link>
          <small className="fw-bold">
            No tienes cuenta?{" "}
            <a href="#" style={{ color: "#F4D010" }}>
              Registrate
            </a>
          </small>
        </form>
      </div>
    </>
  );
}

export default LoginPage;
