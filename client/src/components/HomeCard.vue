<script setup>
import { computed } from 'vue';
import { formattedDates } from './utils';

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
    <div class="upcoming-card">
        <div class="upcoming-details">
            <div class="category" v-if="tournament.category">
                <img :src="categorySrc" />
            </div>
            <div class="card-heading"><span v-if="tournament.sponsor_name">{{ tournament.sponsor_name }} | </span><span>{{ tournament.tourney.name }}</span></div>
            <div class="card-subheading">{{ tournament.location.city }} <img :src="flagSrc" /> | {{ formattedDates(tournament.start_date, tournament.end_date) }}</div>
        </div>
    </div>
</template>

<style></style>