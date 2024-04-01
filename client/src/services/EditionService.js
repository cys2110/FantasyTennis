import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/editions',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getEditionById(id) {
        return apiClient.get('/id/' + id)
    },
    getEditionByTournament(tournament) {
        return apiClient.get('/tournaments/' + tournament)
    },
    getEditionsByYear(year) {
        return apiClient.get('/year/' + year)
    }
}