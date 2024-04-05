<script setup>
import UserService from '@/services/UserService';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const existingUser = ref(false)
const changePw = ref(null)
const matchedPw = ref(null)
const completeFields = ref(null)
const success = ref(false)

const router = useRouter()

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
                        router.push({name: 'Profile', params: {username: signupForm.value.username}})
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
    <div class="view-container">
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
    padding-left: 4rem;
    padding-right: 4rem;
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