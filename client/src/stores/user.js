import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
    const loggedIn = ref(!!localStorage.user)
    function setLoggedIn(value) {
        loggedIn.value = value
    }
    return { loggedIn, setLoggedIn}
})