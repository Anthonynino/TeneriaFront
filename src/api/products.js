import axios from './axios'

export const getProductsRequest = (categoryId) => {
  return axios.get(`/products/${categoryId}`)
}

export const createProductRequest = (
  name,
  code,
  ubication,
  quantity,
  size,
  categoryId,
  supplierId
) => {
  return axios.post(`/createProduct`, {
    name,
    code,
    ubication,
    quantity,
    size,
    categoryId,
    supplierId,
  })
}

export const deleteProduct = (id) => {
  return axios.delete(`/products/${id}`)
}

export const updateStock = (updateData) => {
  return axios.post(`/updateProduct`, {
    productId: updateData.productId,
    quantity: updateData.count,
    userId: updateData.userId,
    departmentId: updateData.departmentId,
    movementType: updateData.movementType,
  })
}
