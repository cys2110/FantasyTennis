<script setup>
import { computed, defineProps } from 'vue';
import { RouterLink } from 'vue-router';
import { formattedDates } from './utils.js'

const props = defineProps({
    tournament: {
        type: Object,
        required: true
    }
})

const flagSrc = computed(() => {
    return new URL(`../assets/flags/${props.tournament.location.country}.svg`, import.meta.url).href
})

const categorySrc = computed(() => {
    return new URL(`../assets/${props.tournament.category}.svg`, import.meta.url).href
})
</script>

<template>
    <div class="tournament-calendar-card">
        <div class="tournament-details">
            <div class="category" v-if="tournament.category">
                <img :src="categorySrc" />
            </div>
            <div class="card-heading"><span v-if="tournament.sponsor_name">{{ tournament.sponsor_name }} | </span><span>{{ tournament.tourney.name }}</span></div>
            <div class="card-subheading">{{ tournament.location.city }} <img :src="flagSrc" /> | {{ formattedDates(tournament.start_date, tournament.end_date) }}</div>
        </div>
        <div class="card-details">
            <div class="surface" v-if="tournament.surface">{{ tournament.surface.environment }} {{ tournament.surface.type }}<span v-if="tournament.surface.hard_type"> ({{ tournament.surface.hard_type }})</span></div>
            <div class="overview"><RouterLink :to="`/tournaments/${tournament.tourney._id}/${tournament.year}`" >Overview</RouterLink></div>
            <div class="results"><RouterLink :to="`/tournaments/${tournament.tourney._id}/${tournament.year}/results`" >Results</RouterLink></div>
            <div class="draw"><RouterLink :to="`/tournaments/${tournament.tourney._id}/${tournament.year}/draw`" >Draw</RouterLink></div>
        </div>
    </div>
</template>