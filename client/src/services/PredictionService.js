import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/predictions',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getPredictionsByUser(user) {
        return apiClient.get('/user/' + user)
    },
    getPredictionsById(id) {
        return apiClient.get('/id/' + id)
    },
    getPredictionsByUserandId(user, edition) {
        return apiClient.get('/search?user=' + user + '&edition=' + edition)
    }
}