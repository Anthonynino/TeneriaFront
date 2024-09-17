import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { GoAlertFill } from 'react-icons/go'
import imgLeathers from '../assets/Leathers.jpg'
import logo from '../assets/logo.png'
import LoadingScreen from '../public/LoadingScreen'
import { Link } from 'react-router-dom'


function LoginPage() {
  const { signin, errors: loginErrors, isAuthenticated } = useAuth()
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [fadeOutTimeout, setFadeOutTimeout] = useState(null)
  const [backgroundLoaded, setBackgroundLoaded] = useState(true)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    const nameUser = e.target[0].value
    const passwordUser = e.target[1].value
    if (nameUser === '' || passwordUser === '') {
      triggerAlert('Los campos deben estar llenos')
    } else {
      await signin(nameUser, passwordUser)
      if (loginErrors) {
        triggerAlert(
          loginErrors.length > 0
            ? loginErrors
            : 'El nombre del usuario o la contraseña son incorrectas'
        )
      }
    }
  }

  const triggerAlert = (message) => {
    setAlertMessage(message)
    setShowAlert(true)
    if (fadeOutTimeout) clearTimeout(fadeOutTimeout)
    const timeout = setTimeout(() => {
      setShowAlert(false)
      setAlertMessage('')
    }, 3000)
    setFadeOutTimeout(timeout)
  }

  useEffect(() => {
    const img = new Image()
    img.src = imgLeathers
    img.onload = () => {
      setTimeout(() => {
        setBackgroundLoaded(false)
      }, [1000])
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/homepage')
    }
  }, [isAuthenticated, navigate])

  return (
    <>
      {backgroundLoaded ? (
        <LoadingScreen />
      ) : (
        <>
          <Link
            to="/"
            className="position-absolute rounded-circle p-2 m-3 card-scale"
            type="button"
            style={{
              color: '#DAA520',
              zIndex: '2',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)',
            }}
          >
            
          </Link>
          <div className="vh-100 vw-100 position-absolute background-fallback">
            <img
              src={imgLeathers}
              className="vh-100 vw-100 position-absolute"
              style={{ filter: 'brightness(50%)' }}
            />
          </div>
          <div className="d-flex justify-content-center vh-100 align-items-center">
            <form
              className="p-4 rounded form-login rounded-5 my-auto shadow-box"
              style={{ zIndex: '100' }}
              onSubmit={handleLogin}
            >
              <div
                className="text-center mx-auto d-flex"
                style={{ maxWidth: '180px', height: '140px' }}
              >
                <img src={logo} alt="" className="logo mb-2" />
              </div>
              <div className="mb-3">
                <label className="text-white">
                  <small>Usuario</small>
                </label>
                <input
                  type="text"
                  className="form-control shadow-sm rounded-4 py-2 text-white input-login"
                  placeholder="nombre@ejemplo.com"
                  style={{ background: 'transparent' }}
                />
              </div>
              <div className="mb-3">
                <label className="text-white">
                  <small>Contraseña</small>
                </label>
                <input
                  type="password"
                  className="form-control shadow-sm rounded-4 py-2 text-white input-login"
                  placeholder="contraseña"
                  style={{ background: 'transparent' }}
                />
              </div>
              <button
                className="text-white w-100 py-2 mt-4 mb-4 btn rounded-pill fw-bold button-submit"
                type="submit"
                style={{ filter: 'opacity(0.8)' }}
              >
                Ingresar
              </button>
              <div className="mt-3">
                <h6 className="text-white">Credenciales de Invitado</h6>
                <span className="text-white me-5">Usuario: invitado</span>
                <span className="text-white ms-3">
                  Contraseña: Invitado2024
                </span>
              </div>
            </form>
          </div>
          {showAlert && (
            <div
              className="alert position-fixed top-0 start-50 translate-middle-x mt-5 text-white alert-animation"
              style={{ background: '#DF3030', zIndex: '100' }}
              role="alert"
            >
              <div className="mb-2">
                <span style={{ marginRight: '0.5rem', fontSize: '1.5rem' }}>
                  <GoAlertFill color="yellow" />
                </span>
                {alertMessage}
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}

export default LoginPage
