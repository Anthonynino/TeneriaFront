import axios from './axios'

export const getAllDepartments = () => {
  return axios.get('/departments')
}
