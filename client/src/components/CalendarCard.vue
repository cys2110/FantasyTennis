<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { formattedDates, flagSrc, categorySrc } from './utils.js'

const props = defineProps({
    tournament: {
        type: Object,
        required: true
    }
})

const router = useRouter()

const navigate = (slug) => {
    router.push({name: slug, params: { id: props.tournament.tourney._id, year: props.tournament.year}})
}
</script>

<template>
    <div class="card">
        <div class="card-component" v-if="tournament.category" >
            <img :src="categorySrc(tournament.category)" :alt="tournament.category" class="filter" />
        </div>
        <div class="card-component">
            <div class="card-heading">
                <span v-if="tournament.sponsor_name">{{ tournament.sponsor_name }} | </span>
                <span><RouterLink :to="{name: 'Tournament', params: { id: tournament.tourney._id}}" class="hover-link" >{{ tournament.tourney.name }}</RouterLink></span>
            </div>
            <div class="card-subheading">
                {{ tournament.location.city }} <img class="mini-flag" :src="flagSrc(tournament.location.country)" :alt="tournament.location.country" /> | {{ formattedDates(tournament.start_date, tournament.end_date) }}
            </div>
        </div>
        <div class="right-side card-component">
            <div class="surface" v-if="tournament.surface" >
                <div class="card-component-row">{{ tournament.surface.environment }} {{ tournament.surface.type }}</div>
                <div class="card-component-row" v-if="tournament.surface.hard_type">({{ tournament.surface.hard_type }})</div>
            </div>
            <div class="buttons">
                <div class="card-button" @click="navigate('EditionOverview')" >Overview</div>
                <div class="card-button" @click="navigate('Results')" >Results</div>
                <div class="card-button" @click="navigate('Draw')" >Draw</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card-component-row {
    text-transform: capitalize;
}

.right-side {
    margin-left: auto;
    padding-right: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.surface {
    text-align: center;
}

.buttons {
    margin-left: 20px;
    display: flex;
    flex-direction: row;
}
</style>