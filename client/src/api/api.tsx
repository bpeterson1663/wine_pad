import axios from 'axios'

const api = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:4000/api',
})

export const createWine = (payload: object) => api.post('/wine', payload)
export const getAllWines = (id: string) => api.get(`/wines/${id}`)
export const getWine = (id: string) => api.get(`/wine/${id}`)
export const updateWine = (id: string, payload: object) => api.put(`/wine/${id}`, payload)
export const deleteWine = (id: string) => api.delete(`/wine/${id}`)

export const createUser = (payload: object) => api.post('/register', payload)
export const authenticateUser = (payload: object) => api.post('/authenticate', payload)
export const getUser = () => api.get('/user')
export const logoutUser = () => api.get('/logout')

export const createVendor = (paylouad: object) => api.post('/vendor', paylouad)
export const getAllVendors = (id: string) => api.get(`vendors/${id}`)
export const getVendor = (id: string) => api.get(`/vendor/${id}`)
export const updateVendor = (id: string, payload: object) => api.put(`/vendor/${id}`, payload)
export const deleteVendor = (id: string) => api.delete(`/vendor/${id}`)

const apis = {
  createWine,
  getAllWines,
  getWine,
  updateWine,
  deleteWine,
  createUser,
  authenticateUser,
  getUser,
  logoutUser,
  createVendor,
  getAllVendors,
  getVendor,
  updateVendor,
  deleteVendor,
}

export default apis
