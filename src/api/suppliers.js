import axios from './axios'

export const getAllSuppliers = () => {
  return axios.get(`/suppliers`)
}

