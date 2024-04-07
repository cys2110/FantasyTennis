<script setup>
import TournamentService from '@/services/TournamentService';
import { ref } from 'vue'
import BaseInput from './BaseForm/BaseInput.vue';

const props = defineProps({
    tourney: {
        required: false
    },
    edit: {
        type: Boolean,
        required: false
    },
    create: {
        type: Boolean,
        required: false
    }
})

const tournament = ref(props.tourney || {
    _id: null,
    name: null,
    start_year: null
})

const handleSubmit = () => {
    if (props.edit === true) {
        editTourney()
    } else if (props.create === true) {
        createTourney()
    }
}

const editTourney = () => {
    TournamentService.editTournament(tournament.value._id, tournament.value)
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
}

const createTourney = () => {
    TournamentService.createTournament(tournament.value)
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
}
</script>

<template>
    <form @submit.prevent="handleSubmit">
        
        <BaseInput v-if="create" v-model="tournament._id" label="ID" type="number" />

        <select id="active" v-model="tournament.active">
            <option value="true">Active</option>
            <option value="false">Defunct</option>
        </select>

        <BaseInput v-model="tournament.start_year" label="Start year" type="number" />

        <BaseInput v-model="tournament.end_year" label="End year" type="number"/>

        <BaseInput v-model="tournament.website" label="Website" type="url" />

        <button type="submit">Save</button>
    </form>
</template>

<style scoped>
form {
    display: flex;
    flex-direction: column;
    width: 50%;
}
</style>