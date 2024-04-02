import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/search',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    searchCall(search) {
        return apiClient.get('/' + search)
    }
}