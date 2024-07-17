import axios from './axios'

export const getAllQuantities = () => {
  return axios.get('/dashboard')
}
