import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function LoginPage() {
  const { signin, errors: loginErrors, isAuthenticated } = useAuth()
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    const nameUser = e.target[0].value
    const passwordUser = e.target[1].value
    if (nameUser === '' || passwordUser === '') {
      setShowAlert(true)
      setAlertMessage('Los campos deben estar llenos')
      const timeout = setTimeout(() => {
        setShowAlert(false)
        setAlertMessage('')
      }, 3000)
      return () => {
        clearTimeout(timeout)
      }
    } else {
      await signin(nameUser, passwordUser)
      if (loginErrors) {
        setShowAlert(true)
        setAlertMessage(
          loginErrors.lenght > 0
            ? loginErrors
            : 'El nombre del usuario o la contraseña son incorrectas'
        )
        const timeout = setTimeout(() => {
          setShowAlert(false)
          setAlertMessage('')
        }, 3000)
        return () => {
          clearTimeout(timeout)
        }
      }
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/homepage')
    }
  }, [isAuthenticated, navigate])
  return (
    <>
      <div className="d-flex justify-content-center vh-100 aling-items-center">
        <form
          className="p-5 border rounded form-login rounded-5 my-auto shadow-box"
          onSubmit={handleLogin}
        >
          <h3 className="mb-3 fw-bold text-center">Iniciar sesion</h3>
          <div className="text-center">
            <img src="../src/assets/logo2.png" alt="" className="logo mb-4" />
          </div>
          <div className="form-floating mb-4">
            <input
              type="text"
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
          <button
            className="text-white w-100 py-2 mt-4 mb-3 border rounded-pill fw-bold button-submit"
            type="submit"
          >
            Ingresar
          </button>
        </form>
      </div>
      {showAlert && (
        <div
          className="alert position-fixed top-0 start-50 translate-middle-x mt-5 text-white"
          style={{ background: '#DF3030' }}
          role="alert"
        >
          {alertMessage}
        </div>
      )}
    </>
  )
}

export default LoginPage
