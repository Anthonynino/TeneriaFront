import axios from './axios'

export const getProductsRequest = (categoryId) => {
  return axios.get(`/products/${categoryId}`)
}

export const getProductRequest = (id) => {
  return axios.get(`/products/${id}`)
}

export const createProductRequest = (
  name,
  code,
  ubication,
  quantity,
  size,
  categoryId
) => {
  return axios.post(`/products`, {
    name,
    code,
    ubication,
    quantity,
    size,
    categoryId,
  })
}
