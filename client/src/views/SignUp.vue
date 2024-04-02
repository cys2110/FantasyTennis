<script setup>
import UserService from '@/services/UserService';
import { ref } from 'vue';

const existingUser = ref(false)
const changePw = ref(null)
const matchedPw = ref(null)
const completeFields = ref(null)
const success = ref(false)

const initialForm = ref({
    username: '',
    password: '',
    email: ''
})

const signupForm = ref(initialForm.value)
const confirmPw = ref(null)

const checkCompleteForm = () => {
    if (signupForm.value.username && signupForm.value.email && signupForm.value.password) {
        completeFields.value = true
    } else {
        completeFields.value = false
    }
}

const testPw = () => {
    const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(signupForm.value.password)
    changePw.value = hasSpecialCharacter
}

const matchPw = () => {
    if (signupForm.value.password === confirmPw.value) {
        matchedPw.value = true
    } else {
        matchedPw.value = false
    }
}

const submitForm = () => {
    event.preventDefault()
    checkCompleteForm()
    if (changePw.value && matchedPw.value && completeFields.value) {
        UserService.getUserByUsername(signupForm.value.username)
        .then((response) => {
            if (response.data.length > 0) {
                existingUser.value = true
            } else {
                UserService.createUser(signupForm.value)
                    .then(() => {
                        success.value = true
                        localStorage.setItem('user', signupForm.value.username)
                        signupForm.value = initialForm
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }
}
</script>

<template>
    <form @submit="submitForm" >
        <input type="text" v-model="signupForm.username" placeholder="Username" />
        <input type="email" v-model="signupForm.email" placeholder="Email" />
        <input type="password" v-model="signupForm.password" placeholder="Password" @blur="testPw()" />
        <input type="password" v-model="confirmPw" placeholder="Confirm password" @blur="matchPw()" />
        <button type="submit">Sign up</button>
    </form>
    <div v-if="existingUser">User already exists.</div>
    <div v-if="success">Congratulations! You've registered!</div>
    <div v-if="changePw === false">Password must have at least one number and one special character.</div>
    <div v-if="matchedPw === false">Passwords don't match</div>
    <div v-if="completeFields === false">Please fill in all fields.</div>
</template>