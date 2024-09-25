import axios from './axios'

export const getProductsRequest = (categoryId) => {
  return axios.get(`/products/${categoryId}`)
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
  return axios.post(`/generateEntryOrExit`, {
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
  return axios.put(`/editProduct`, {
    productId: updateData.productId,
    quantity: updateData.count,
    userId: updateData.userId,
    departmentId: updateData.departmentId,
    movementType: updateData.movementType,
  })
}
