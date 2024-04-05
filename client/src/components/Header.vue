<script setup>
import { RouterLink } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHouse, faCircleUser, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faCalendar } from '@fortawesome/pro-regular-svg-icons'
import { faPersonToPortal, faPeopleArrows } from '@fortawesome/pro-duotone-svg-icons'
import { ref } from 'vue'
import Search from './Search.vue'
import { useUserStore } from '@/stores/user'

const searchClick = ref(false)
const store = useUserStore()

const logOut = () => {
    localStorage.removeItem('user')
    store.setLoggedIn(false)
}

const toggleSearch = () => {
    searchClick.value = !searchClick.value
}

const user = localStorage.getItem('user')

</script>

<template>
    <div>
        <h1 id="website-title">FantasyTennis</h1>
    </div>
    <div class="nav">
        <RouterLink :to="{name: 'home'}" ><FontAwesomeIcon class="navIcon" :icon="faHouse" /></RouterLink>
        <RouterLink :to="{ name: 'results archive'}" ><FontAwesomeIcon class="navIcon" :icon="faCalendar" /></RouterLink>
        <!--when h2h is added-->
        <!-- <RouterLink to="/h2h" ><FontAwesomeIcon class="navIcon" :icon="faPeopleArrows" /></RouterLink> -->
        <RouterLink v-if="!store.loggedIn" :to="{ name: 'login'}" ><FontAwesomeIcon class="navIcon" :icon="faCircleUser" /></RouterLink>
        <RouterLink v-if="store.loggedIn" :to="{ name: 'Profile', params: {username: user}}" ><FontAwesomeIcon class="navIcon" :icon="faCircleUser" /></RouterLink>
        <FontAwesomeIcon v-if="store.loggedIn" :icon="faPersonToPortal" class="navIcon" @click="logOut()" />
        <FontAwesomeIcon class="navIcon" :icon="faMagnifyingGlass" @click="toggleSearch()" />
    </div>
    <div class="search-container" v-if="searchClick">
        <Search @close-search="toggleSearch()" />
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fugaz+One&display=swap');

h1 {
    font-family: 'Fugaz One'
}

.nav {
    width: 15rem;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
}

.navIcon {
    cursor: pointer;
    color: var(--color-text);
    font-size: large;
}

.search-container {
    position: fixed;
    height: 100vh;
    width: 100vw;
    z-index: 400;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: rgba(23, 26, 219, 0.5);
    backdrop-filter: blur(.125rem);
    top: 0;
    left: 0
}
</style>