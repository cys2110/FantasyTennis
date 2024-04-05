<script setup>
import UserService from '@/services/UserService';
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

const noUser = ref(false)
const incorrectPw = ref(false)
const store = useUserStore()
const router = useRouter()

const initialForm = ref({
    username: '',
    password: ''
})

const loginForm = ref(initialForm)

const submitForm = () => {
    event.preventDefault()
    incorrectPw.value = false
    UserService.getUserByUsername(loginForm.value.username)
        .then ((response) => {
            if (response.data.length === 0) {
                noUser.value = true
                incorrectPw.value = false
            } else {
                noUser.value = false
                if (response.data[0].password === loginForm.value.password ) {
                    localStorage.setItem('user', response.data[0].username)
                    store.setLoggedIn(true)
                    loginForm.value = initialForm
                    router.push({name: 'Profile', params: {username: response.data[0].username}})
                } else {
                    incorrectPw.value = true
                }
            }
        })
        .catch((error) => {
            console.log(error)
        })
}
</script>

<template>
    <div class="view-container">
        <form @submit.prevent="submitForm()" >
            <input type="text" v-model="loginForm.username" placeholder="Username" />
            <input type="password" v-model="loginForm.password" placeholder="Password" />
            <button type="submit">Log In</button>
        </form>
        <div v-if="noUser">User does not exist.</div>
        <div v-if="incorrectPw">Incorrect password</div>
        <RouterLink :to="{ name: 'signup' }" class="hover-link" >Don't have an account? Sign up here.</RouterLink>
    </div>
</template>

<style scoped>
.view-container {
    border: 1px solid var(--color-border);
    margin: 0 auto;
    margin-top: 25%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: fit-content;
    padding-left: 3rem;
    padding-right: 3rem;
    padding-top: 5rem;
    padding-bottom: 5rem;
    border-radius: 5rem;
}

form {
    display: flex;
    flex-direction: column;
}

input {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    background-color: transparent;
    outline: transparent;
    border: none;
    border-bottom: 1px solid var(--color-border-hover);
    padding: 0.2rem;
    color: var(--color-text)
}

button {
    margin: 0 auto;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    width: 50%;
    background-color: transparent;
    border: 2px solid var(--vt-c-box-border);
    padding: 0.5rem;
    color: var(--color-text);
    border-radius: 5rem;
    cursor: pointer;
}
</style>