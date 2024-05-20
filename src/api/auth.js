import axios from './axios'

export const loginRequest = (user, password) =>
  axios.post(`/login`, { username: user, password: password })

export const logoutRequest = () => axios.post(`/logout`)

export const verifyTokenRequest = () => axios.get('/verify')
