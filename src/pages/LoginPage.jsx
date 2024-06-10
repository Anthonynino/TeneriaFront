import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GoAlertFill } from 'react-icons/go';

function LoginPage() {
  const { signin, errors: loginErrors, isAuthenticated } = useAuth();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [fadeOutTimeout, setFadeOutTimeout] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const nameUser = e.target[0].value;
    const passwordUser = e.target[1].value;
    if (nameUser === '' || passwordUser === '') {
      triggerAlert('Los campos deben estar llenos');
    } else {
      await signin(nameUser, passwordUser);
      if (loginErrors) {
        triggerAlert(
          loginErrors.length > 0
            ? loginErrors
            : 'El nombre del usuario o la contraseña son incorrectas'
        );
      }
    }
  };

  const triggerAlert = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
    // Si hay un timeout en proceso, lo limpiamos
    if (fadeOutTimeout) clearTimeout(fadeOutTimeout);
    // Configuramos el timeout para desvanecer la alerta
    const timeout = setTimeout(() => {
      setShowAlert(false);
      setAlertMessage('');
    }, 3000); // Duración de la animación de desvanecimiento
    setFadeOutTimeout(timeout);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/homepage');
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <div className="d-flex justify-content-center vh-100 align-items-center">
        <form
          className="p-5 border rounded form-login rounded-5 my-auto shadow-box"
          onSubmit={handleLogin}
        >
          <h3 className="mb-3 fw-bold text-center">Iniciar sesión</h3>
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
          <span style={{ marginRight: '0.5rem', fontSize: '1.5rem' }}>
            <GoAlertFill color="yellow" />
          </span>
          {alertMessage}
        </div>
      )}
    </>
  );
}

export default LoginPage;
