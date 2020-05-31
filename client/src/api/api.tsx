import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
})

export const createWine = (payload: object) => api.post('/wine', payload)
export const getAllWines = (id: string) => api.get(`/wines/${id}`)
export const getWine = (id: string) => api.get(`/wine/${id}`)
export const updateWine = (id: string, payload: object) => api.put(`/wine/${id}`, payload)
export const deleteWine = (id: string) => api.delete(`/wine/${id}`)
const apis = {
  createWine,
  getAllWines,
  getWine,
  updateWine,
  deleteWine,
}

export default apis
