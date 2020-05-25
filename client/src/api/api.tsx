import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
})

export const createWine = (payload: object) => api.post('/wine', payload)
export const getAllWines = (id: string) => api.get(`/wines/${id}`)

const apis = {
  createWine,
  getAllWines,
}

export default apis
