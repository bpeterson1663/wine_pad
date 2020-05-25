import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
})

export const createWine = (payload: object) => api.post('/wine', payload)

const apis = {
  createWine,
}

export default apis
