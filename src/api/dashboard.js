import axios from './axios'

// Función para obtener las cantidades
export const getAllQuantities = async () => {
  const response = await axios.get('/dashboard')

  return response
}
