import axios from './axios'
import { setCache, getCache } from '../public/globalCache.js' // Importa las funciones de caché

// Función para obtener todas las categorias
export const getAllCategories = async () => {
  const cacheKey = 'categories'

  // Verifica si los datos ya están en caché
  if (getCache(cacheKey)) {
    return getCache(cacheKey) // Devuelve los datos de la caché si están disponibles
  }

  // Si no están en caché, realiza la solicitud
  const response = await axios.get('/categories')
  setCache(cacheKey, response) // Almacena los datos en la caché

  return response // Devuelve los datos obtenidos
}
