import { menuOption } from './json/AllObjects'
import { useAuth } from './context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { Navbar as BootstrapNavbar } from 'react-bootstrap'
import './Navbar.css'
import logo from './assets/logo4.png'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import Leather1 from "./assets/Leathers2.jpg"
import Leather2 from "./assets/Leathers3.png"
import Leather3 from "./assets/Leathers4.jpg"

function Navbar() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleActionButton = async (values) => {
    try {
      if (values.title === 'Salir') {
        await logout()
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

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
              style={{ background: '#DAA520', border: '0', cursor: 'pointer' }}
              onClick={() => {
                handleActionButton(opt)
              }}
            >
              <div className="me-2">{opt.icon}</div>
              <h5 className="mb-0">{opt.title}</h5>
            </Link>
          ))}
        </ul>

        {/* Carrusel de imágenes de cuero */}
        <div className="mt-3 mx-5">
          <Slider
            infinite={true}
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
            autoplay={true}
            autoplaySpeed={3000}
          >
            <div>
              <img
                src={Leather1}
                alt="Cuero 1"
                className="img-fluid rounded"
              />
            </div>
            <div>
              <img
                src={Leather2}
                alt="Cuero 2"
                className="img-fluid rounded"
              />
            </div>
            <div>
              <img
                src={Leather3}
                alt="Cuero 3"
                className="img-fluid rounded"
              />
            </div>
          </Slider>
        </div>
      </div>
      {/* Contenido principal */}
      <div className="main-content">
        {/* Barra de navegación fija en la parte superior */}
        <BootstrapNavbar className="navbar-custom shadow fixed-top">
          <BootstrapNavbar.Brand className="d-flex">
            <img
              src={logo}
              alt="Icon"
              height="40"
              width="75"
              className="mx-3"
            />
            <h4
              className="text-white my-1 user-select-none"
              style={{ textShadow: '2px 2px 5px #000' }}
            >
              TENERÍA RUBIO
            </h4>
          </BootstrapNavbar.Brand>
        </BootstrapNavbar>
      </div>
    </div>
  )
}

export default Navbar
