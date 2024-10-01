import axios from './axios'
import { setCache, getCache, clearCache } from '../public/globalCache.js'

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
  const response = axios.put(`/editProduct`, {
    productId,
    name,
    code,
    ubication,
    size,
    categoryId,
    supplierId,
  })
  // Invalida el caché de proveedores, para forzar que se recargue al hacer getAllSuppliers
  clearCache(`products_${categoryId}`)

  return response
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
  const response = axios.post(`/createProduct`, {
    name,
    code,
    ubication,
    quantity,
    size,
    categoryId,
    supplierId,
    userId,
  })

  // Invalida el caché de proveedores, para forzar que se recargue al hacer getAllSuppliers
  clearCache(`products_${categoryId}`)

  return response
}

export const deleteProduct = (id, categoryId) => {
  const response = axios.delete(`/deleteProduct/${id}`)

  // Invalida el caché de proveedores, para forzar que se recargue al hacer getAllSuppliers
  clearCache(`products_${categoryId}`)

  return response
}

export const updateStock = (updateData, categoryId) => {
  const response = axios.post(`/generateEntryOrExit`, {
    productId: updateData.productId,
    quantity: updateData.count,
    userId: updateData.userId,
    departmentId: updateData.departmentId,
    movementType: updateData.movementType,
  })

  // Invalida el caché de proveedores, para forzar que se recargue al hacer getAllSuppliers
  clearCache(`products_${categoryId}`)

  return response
}
