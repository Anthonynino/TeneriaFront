import axios from './axios'

export const getAllSuppliers = () => {
  return axios.get('/suppliers')
}

export const addSupplier = (
  companyName,
  RIF,
  location,
  IsInNationalTerritory
) => {
  return axios.post(`/createSupplier`, {
    companyName,
    RIF,
    location,
    IsInNationalTerritory,
  })
}
