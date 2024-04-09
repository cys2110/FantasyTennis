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
    },
    getUpcomingEditions() {
        return apiClient.get('/upcoming')
    },
    getEditionByPlayer(player) {
        return apiClient.get('/players/' + player)
    },
    createEdition(edition) {
        return apiClient.post('', edition)
    },
    editEdition(id, edition) {
        return apiClient.patch('/' + id, edition)
    }
}