import axios from 'axios'

const apiClient = axios.create({
    baseURL: process.env.API_URI,
    timeout: 30000,
})

export default apiClient
