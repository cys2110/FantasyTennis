<script setup>
import UserService from '@/services/UserService';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const props = defineProps({
    user: {
        type: Object,
        required: true
    }
})

const editMode = ref(false)

const editForm = ref({
    password: props.user.password,
    email: props.user.email
})

const confirmPw = ref(null)
const changePw = ref(null)
const matchedPw = ref(null)

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
    if (editForm.value.password === props.user.password) {
        UserService.editUser(props.user._id, editForm.value)
            .then(() => {
                editMode.value = false
                window.location.reload()
            })
            .catch((error) => {
                console.log(error)
            })
    } else if (changePw.value && matchedPw.value) {
        UserService.editUser(props.user._id, editForm.value)
            .then(() => {
                editMode.value = false
                window.location.reload()
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

const deleteAccount = () => {
    UserService.deleteUser(props.user._id)
        .then((response) => {
            console.log('user deleted')
            router.push({name: 'login'})
        })
        .catch((error) => {
            console.log(error)
        })
}
</script>

<template>
    <div class="view-account">
        <button v-if="!editMode" @click="editMode = true" >Edit account</button><button v-if="editMode" @click="submitForm" >Save changes</button><button v-if="editMode" @click="editMode = false" >Cancel</button>
        <dl>
            <div>
                <dt>Username</dt>
                <dd>{{ user.username }}</dd>
            </div>
            <div>
                <dt>Email</dt>
                <dd v-if="!editMode">{{ user.email }}</dd>
                <dd v-if="editMode" ><input type="email" v-model="editForm.email" /></dd>
            </div>
            <div>
                <dt>Password</dt>
                <dd v-if="!editMode"><input type="password" readonly :value="user.password" /></dd>
                <dd v-if="editMode"><input type="password" v-model="editForm.password" @blur="testPw" /></dd>
                <dt v-if="editMode" @blur="matchPw()">Confirm password</dt>
                <dd v-if="editMode"><input type=password v-model="confirmPw" /></dd>
                <div v-if="changePw === false">Password must have at least one number and one special character.</div>
    <div v-if="matchedPw === false">Passwords don't match</div>
            </div>
        </dl>
    </div>
    <button type="button" @click="deleteAccount()" >Delete account</button>
</template>