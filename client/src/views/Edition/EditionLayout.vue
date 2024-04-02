<script setup>
import EditionService from '@/services/EditionService';
import { onMounted, ref, computed } from 'vue';
import { RouterView, RouterLink } from 'vue-router';
import { formattedDates } from '@/components/utils';
import MatchScore from '@/services/MatchScore';

const props = defineProps({
    id: {
        required: true
    },
    year: {
        required: true
    }
})

const editionId = props.id.toString() + props.year.toString()
const edition = ref(null)
const matches = ref(null)

const categorySrc = computed(() => {
    return new URL(`../../assets/${edition.value.category}.svg`, import.meta.url).href
})

onMounted(() => {
    EditionService.getEditionById(editionId)
        .then((response) => {
            edition.value = response.data
        })
        .catch((error) => {
            console.log(error)
        })
    MatchScore.getMatchesByEdition(editionId)
        .then((response) => {
            matches.value = response.data
        })
        .catch((error) => {
            console.log(error)
        })
})
</script>

<template>
    <div class="tabs">
        <div class="tab"><RouterLink :to="{ name: 'EditionOverview'}" >Overview</RouterLink></div>
        <div class="tab"><RouterLink :to="{ name: 'Draw'}" >Draw</RouterLink></div>
        <div class="tab"><RouterLink :to="{ name: 'Results' }" >Results</RouterLink></div>
    </div>
    <div class="edition-wrapper" v-if="edition">
        <h1><span v-if="edition.sponsor_name" >{{ edition.sponsor_name }} | </span><span>{{ edition.tourney.name }}</span></h1>
        <div class="dates">{{ formattedDates(edition.start_date, edition.end_date) }}</div>
        <div class="category"><img :src="categorySrc" /></div>

        <RouterView v-if="edition && matches ":edition="edition" :matches="matches" />
    </div>
</template>