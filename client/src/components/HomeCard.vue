<script setup>
import { formattedDates, flagSrc, categorySrc } from './utils';

const props = defineProps({
    tournament: {
        type: Object,
        required: true
    }
})


</script>

<template>
    <RouterLink class="card-link" :to="{ name: 'Tournament', params: { id: tournament.tourney._id }}" >
        <div class="card">
            <div class="card-component" v-if="tournament.category">
                <img :src="categorySrc(tournament.category)" class="filter" />
            </div>
            <div class="card-component">
                <div class="card-heading"><span v-if="tournament.sponsor_name">{{ tournament.sponsor_name }} | </span><span>{{ tournament.tourney.name }}</span></div>
                <div class="card-subheading">{{ tournament.location.city }} | {{ formattedDates(tournament.start_date, tournament.end_date) }}</div>
            </div>
            <div class="flag card-component">
                <img class="card-flag" :src="flagSrc(tournament.location.country)" :alt="tournament.location.country" />
            </div>
        </div>
    </RouterLink>
</template>

<style scoped>

.flag {
    margin-left: auto;
    padding-right: 1rem;
}

.card:hover {
    transform: translateX(-5px) translateY(-5px);
    box-shadow: 1.5px 1.5px 0px 0px var(--color-border);
}
</style>