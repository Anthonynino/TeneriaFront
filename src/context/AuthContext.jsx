import { createContext, useContext, useEffect, useState } from 'react'
import { loginRequest, verifyTokenRequest, logoutRequest } from '../api/auth.js'
import Cookies from 'js-cookie'
import PropTypes from 'prop-types'

// Crea un contexto de autenticación llamado 'AuthContext'.
export const AuthContext = createContext()

// Hook personalizado para usar el contexto de autenticación.
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error(
      'El uso de la autenticación podría estar usándose sin un proveedor de autenticación.'
    )
  }
  return context
}

// Componente 'AuthProvider' que acepta un prop 'children'.
export const AuthProvider = ({ children }) => {
  // Estado para almacenar la información del usuario autenticado.
  const [user, setUser] = useState(null)

  // Estado para verificar si el usuario está autenticado.
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Estado para almacenar errores de autenticación.
  const [errors, setErrors] = useState([])

  // Estado para controlar el estado de carga.
  const [loading, setLoading] = useState(true)

  // Verificar si el usuario está autenticado cuando se carga la página.
  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get()
      if (!cookies.token) {
        setIsAuthenticated(false)
        setLoading(false)
        return
      }

      try {
        const res = await verifyTokenRequest(cookies.token)
        if (!res.data) {
          setIsAuthenticated(false)
          setLoading(false)
          return
        }

        // Verificar si hay un usuario guardado en el localStorage
        const userFromStorage = localStorage.getItem('user')
        if (userFromStorage) {
          setUser(JSON.parse(userFromStorage))
          setIsAuthenticated(true)
        } else {
          // Si no hay usuario en localStorage, guardar el usuario desde la respuesta del servidor
          setUser(res.data)
          localStorage.setItem(
            'user',
            JSON.stringify({
              id: res.data.id,
              username: res.data.username,
              rolId: res.data.rolId,
            })
          )
        }

        setIsAuthenticated(true)
        setLoading(false)
      } catch (error) {
        setIsAuthenticated(false)
        setLoading(false)
      }
    }

    checkLogin()
  }, [])

  // Función para el inicio de sesión de usuarios.
  const signin = async (name, password) => {
    try {
      const res = await loginRequest(name, password)
      setUser(res.data)
      setIsAuthenticated(true)

      // Guardar el usuario en localStorage para persistencia.
      localStorage.setItem(
        'user',
        JSON.stringify({
          id: res.data.id,
          username: res.data.username,
          rolId: res.data.rolId,
        })
      )
    } catch (error) {
      setErrors(error.response.data)
    }
  }

  // Función para cerrar sesión de usuarios.
  const logout = async () => {
    try {
      await logoutRequest()

      // Eliminar el usuario de localStorage al cerrar sesión.
      localStorage.removeItem('user')

      setUser(null)
      setIsAuthenticated(false)
    } catch (error) {
      console.log(error)
    }
  }

  // Retorna el componente 'AuthContext.Provider', que proporciona el contexto de autenticación
  return (
    <AuthContext.Provider
      value={{ user, signin, isAuthenticated, errors, loading, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// PropType para 'children' del componente 'AuthProvider'.
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
