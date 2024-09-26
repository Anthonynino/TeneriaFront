import axios from './axios'
import { setCache, getCache } from '../public/globalCache.js'

// Función para obtener productos por categoría
export const getProductsRequest = async (categoryId) => {
  const cacheKey = `products_${categoryId}` // Crea una clave única para la caché basada en el ID de categoría

  // Verifica si los datos ya están en caché
  const cachedData = getCache(cacheKey)
  if (cachedData) {
    return cachedData // Devuelve los datos de la caché si están disponibles
  }

  // Si no están en caché, realiza la solicitud
  const response = await axios.get(`/products/${categoryId}`)
  setCache(cacheKey, response) // Almacena los datos en la caché

  return response // Devuelve los datos obtenidos
}

export const getOneProduct = (productId) => {
  return axios.get(`/product/${productId}`)
}

export const editProductRequest = (
  productId,
  name,
  code,
  ubication,
  size,
  categoryId,
  supplierId
) => {
  return axios.put(`/editProduct`, {
    productId,
    name,
    code,
    ubication,
    size,
    categoryId,
    supplierId,
  })
}

export const createProductRequest = (
  name,
  code,
  ubication,
  quantity,
  size,
  categoryId,
  supplierId,
  userId
) => {
  return axios.post(`/createProduct`, {
    name,
    code,
    ubication,
    quantity,
    size,
    categoryId,
    supplierId,
    userId,
  })
}

export const deleteProduct = (id) => {
  return axios.delete(`/deleteProduct/${id}`)
}

export const updateStock = (updateData) => {
  return axios.post(`/generateEntryOrExit`, {
    productId: updateData.productId,
    quantity: updateData.count,
    userId: updateData.userId,
    departmentId: updateData.departmentId,
    movementType: updateData.movementType,
  })
}
