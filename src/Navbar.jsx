import { menuOption } from "./json/AllObjects";
import { useAuth } from "./context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Navbar as BootstrapNavbar } from "react-bootstrap";
import { AiOutlineDropbox } from "react-icons/ai";
import "./Navbar.css";
import logo from "./assets/logo4.png";

function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleActionButton = async (values) => {
    try {
      if (values.title === "Salir") {
        await logout();
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app-container user-select-none">
      {/* Menú lateral */}
      <div className="sidebar">
        <ul className="list-group">
          {menuOption.map((opt) => (
            <Link
              to={opt.link}
              key={opt.id}
              className="position-relative list-group-item fw-bold mb-3 text-white d-flex align-items-center mx-3 rounded button-hover"
              style={{ background: "#DAA520", border: "0", cursor: "pointer" }}
              onClick={() => {
                handleActionButton(opt);
              }}
            >
              <div className="me-2">{opt.icon}</div>
              <h5 className="mb-0">{opt.title}</h5>
            </Link>
          ))}
        </ul>
        <div className="text-white opacity-25 text-center mt-3">
          <AiOutlineDropbox size={150} />
        </div>
      </div>

      {/* Contenido principal */}
      <div className="main-content">
        {/* Barra de navegación fija en la parte superior */}
        <BootstrapNavbar className="navbar-custom shadow">
          <BootstrapNavbar.Brand className="d-flex">
              <img
                src={logo}
                alt="Icon"
                height="45"
                width="75"
                className="mx-3"
              />
            <h4 className="text-white my-2 user-select-none" style={{textShadow: "2px 2px 5px #000" }}>
              TENERÍA RUBIO
            </h4>
          </BootstrapNavbar.Brand>
        </BootstrapNavbar>
      </div>
    </div>
  );
}

export default Navbar;
