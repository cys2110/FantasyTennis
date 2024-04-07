import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/match-scores',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getMatchesByEdition(edition) {
        return apiClient.get('/editions/' + edition)
    },
    getMatchesByPlayer(id) {
        return apiClient.get('/player/id/' + id)
    },
    createMatch(match) {
        return apiClient.post('', match)
    },
    editMatch(id, match) {
        return apiClient.patch('/' + id, match)
    },
}