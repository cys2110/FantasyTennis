<script setup>
import TournamentService from '@/services/TournamentService';
import { computed, onMounted, ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/pro-duotone-svg-icons';
import { RouterLink } from 'vue-router';
import EditionService from '@/services/EditionService';
import EditionCard from '@/components/EditionCard.vue';

const props = defineProps({
    id: {
        required: true
    }
})

const tournament = ref(null)
const editions = ref(null)

const years = computed(() => {
    if (!tournament.value.end_year) {
        return `${tournament.value.start_year} - present`
    } else if (tournament.value.start_year === tournament.value.end_year) {
        return tournament.value.start_year
    } else {
        return tournament.value.start_year - tournament.value.end_year
    }
})

onMounted(() => {
    TournamentService.getTournamentById(props.id)
        .then((response) => {
            tournament.value = response.data
        })
        .catch((error) => {
            console.log(error)
        })
    EditionService.getEditionByTournament(props.id)
        .then((response) => {
            editions.value = response.data
            console.log(editions.value)
        })
        .catch((error) => {
            console.log(error)
        })
})
</script>

<template>
    <div class="tournament-wrapper" v-if="tournament">
        <h1>{{ tournament.name }}</h1> <a v-if="tournament.website" :href="tournament.website" target="_blank"><FontAwesomeIcon :icon="faArrowUpRightFromSquare" /></a>
        <h5>{{ years }}</h5>
        <div class="edition-card" v-if="editions">
            <EditionCard v-for="edition in editions" :edition="edition" />
        </div>
    </div>
</template>