<script setup>
import UserService from '@/services/UserService';
import { computed, onMounted, ref, watch } from 'vue';
import { RouterView, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

const props = defineProps({
    username: {
        required: true
    }
})

const store = useUserStore()
const router = useRouter()
const user = ref(null)

onMounted(() => {
    UserService.getUserByUsername(props.username)
        .then((response) => {
            user.value = response.data[0]
        })
        .catch((error) => {
            console.log(error)
        })
})

watch(() => store.loggedIn, (newValue) => {
    if (newValue === false) {
        router.push({name: 'login'})
    }
}, {immediate: true})

</script>

<template>
    <div class="user-layout-container" v-if="user">
        <h1>Welcome back, {{ username }}!</h1>
        <RouterView :user="user" />
    </div>
</template>