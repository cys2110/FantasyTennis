<script setup>
import UserService from '@/services/UserService';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useUserStore } from '@/stores/user';

const noUser = ref(false)
const incorrectPw = ref(false)
const store = useUserStore()

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
    <div class="login-wrapper">
        <form @submit.prevent="submitForm()" >
            <input type="text" v-model="loginForm.username" placeholder="Username" />
            <input type="password" v-model="loginForm.password" placeholder="Password" />
            <button type="submit">Log In</button>
        </form>
        <div v-if="noUser">User does not exist.</div>
        <div v-if="incorrectPw">Incorrect password</div>
        <div v-if="store.loggedIn">Congratulations! You've logged in.</div>
        <RouterLink :to="{ name: 'signup' }" >Don't have an account? Sign up here.</RouterLink>
    </div>
</template>