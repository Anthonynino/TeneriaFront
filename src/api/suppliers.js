import axios from './axios'
import { setCache, getCache, clearCache } from '../public/globalCache.js' // Importa las funciones de caché

// Función para obtener todos los proveedores
export const getAllSuppliers = async () => {
  const cacheKey = 'suppliers'

  // Verifica si los datos ya están en caché
  if (getCache(cacheKey)) {
    return getCache(cacheKey) // Devuelve los datos de la caché si están disponibles
  }

  // Si no están en caché, realiza la solicitud
  const response = await axios.get('/suppliers')
  setCache(cacheKey, response) // Almacena los datos en la caché

  return response // Devuelve los datos obtenidos
}

export const getOneSupplier = (supplierId) => {
  return axios.get(`/supplier/${supplierId}`)
}

export const addSuppliersRequest = (companyName, rif, location, fullCode, IsInNationalTerritory) => {
  const response = axios.post(`/createSupplier`, {
    companyName,
    rif,
    location,
    fullCode,
    IsInNationalTerritory,
  })

  // Invalida el caché de proveedores, para forzar que se recargue al hacer getAllSuppliers
  clearCache('suppliers')

  return response
}

export const editSupplier = (
  supplierId,
  companyName,
  location,
  IsInNationalTerritory,
  finalCode
) => {
  const response = axios.put(`/editSupplier`, {
    supplierId,
    companyName,
    location,
    IsInNationalTerritory,
    finalCode
  })

  // Invalida el caché de proveedores, para forzar que se recargue al hacer getAllSuppliers
  clearCache('suppliers')

  return response
}
