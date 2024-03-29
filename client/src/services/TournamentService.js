import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/tournaments',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getTournamentById(id) {
        return apiClient.get('/id' + id)
    }
}