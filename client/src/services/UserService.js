import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/users',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getUserByUsername(username) {
        return apiClient.get('/username/' + username)
    },
    createUser(user) {
        return apiClient.post('', user)
    }
}