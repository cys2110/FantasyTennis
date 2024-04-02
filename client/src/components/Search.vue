<script setup>
import SearchService from '@/services/SearchService';
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCircleXmark } from '@fortawesome/pro-duotone-svg-icons';
import { RouterLink } from 'vue-router';

const emits = defineEmits(['closeSearch'])

const searchTerm = ref(null)
const searched = ref(false)
const tournamentResults = ref(null)
const playerResults = ref(null)

const submitSearch = () => {
    event.preventDefault()
    SearchService.searchCall(searchTerm.value)
        .then((response) => {
            searched.value = true
            tournamentResults.value = response.data.tournaments
            playerResults.value = response.data.players
        })
        .catch((error) => {
            console.log(error)
        })
}

const closeSearch = () => {
    emits('closeSearch', true)
}
</script>

<template>
    <div><FontAwesomeIcon :icon="faCircleXmark" @click="closeSearch()" /></div>
    <form @submit="submitSearch()" >
        <input type="text" v-model="searchTerm" placeholder="Search player or tournament" />
        <div class="search-results-container" v-if="searched">
            <div class="results">
                <h1>Tournaments</h1>
                <div v-if="tournamentResults.length === 0">No results matching search</div><div v-else v-for="result in tournamentResults"><RouterLink :to="{ name: 'Tournament', params: { id: result._id } }" @click="closeSearch()" >{{ result.name }}</RouterLink></div>
            </div>
            <div class="results">
                <h1>Players</h1>
                <div v-if="playerResults.length === 0">No results matching search</div><div v-else v-for="result in playerResults"><RouterLink :to="{ name: 'PlayerLayout', params: { id: result._id} }" @click="closeSearch()" >{{ result.full_name }}</RouterLink></div>
            </div>
        </div>
    </form>
</template>