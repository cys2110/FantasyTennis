<script setup>
import { categorySrc, flagSrc, formattedDates } from '@/components/utils';
import EditionService from '@/services/EditionService';
import MatchScore from '@/services/MatchScore';
import PredictionService from '@/services/PredictionService';
import { onMounted, ref } from 'vue';


const props = defineProps({
    username: {
        required: true
    },
    edition: {
        required: true
    }
})

const editionRef = ref(null)
const matches = ref(null)
const r128Matches = ref(null)
const r64Matches = ref(null)
const r32Matches = ref(null)

const selectedRound = ref(2)

const selectRound = (round) => {
  selectedRound.value = round
}

onMounted(() => {
    EditionService.getEditionById(props.edition)
        .then((response) => {
            editionRef.value = response.data
        })
        .catch((error) => {
            console.log(error)
        })
        MatchScore.getMatchesByEdition(props.edition)
        .then((response) => {
            matches.value = response.data
            for (let i=0; i < matches.value.length; i++) {
                if (matches[i].round === 'R128') {}
            }
        })
        .catch((error) => {
            console.log(error)
        })
})
</script>

<template>
    <div class="view-container" v-if="editionRef && matches">
        <div class="heading-wrapper">
            <div class="category"><img v-if="editionRef.category" class="filter" :src="categorySrc(editionRef.category)" /> </div>
            <div class="heading">
                <h1><RouterLink class="hover-link" :to="{name: 'Tournament', params: {id: editionRef.tourney._id}}" >{{ editionRef.tourney.name }}</RouterLink></h1>
                <div class="sub-heading" v-if="editionRef.sponsor_name">{{ editionRef.sponsor_name }}</div>
                <div class="sub-heading">{{ formattedDates(editionRef.start_date, editionRef.end_date) }}</div>
            </div>
            <div class="flag-container"><img class="flag" :src="flagSrc(editionRef.location.country)" /></div>
        </div>
        <div class="navigator">
            <button v-if="editionRef.type_of_draw===128" @click="selectRound(128)" :class="{'active-button': selectedRound === 128}">R128</button>
            <button v-if="editionRef.type_of_draw === 64 || editionRef.type_of_draw === 128" @click="selectRound(64)" :class="{'active-button': selectedRound === 64}">R64</button>
            <button @click="selectRound(32)" :class="{'active-button': selectedRound === 32}">R32</button>
            <button @click="selectRound(16)" :class="{'active-button': selectedRound === 16}">R16</button>
            <button @click="selectRound(8)" :class="{'active-button': selectedRound === 8}">QF</button>
            <button @click="selectRound(4)" :class="{'active-button': selectedRound === 4}">SF</button>
            <button @click="selectRound(2)" :class="{'active-button': selectedRound === 2}">F</button>
        </div>
    </div>
</template>

<style scoped>
.category {
    margin-right: 20px;
}

button {
    border-radius: 50%;
    height: 3rem;
    width: 3rem;
    margin-left: 0.25rem;
    margin-right: 0.25rem;
    cursor: pointer;
    border: 2px solid var(--color-border);
    background-color: var(--color-background-mute);
    color: var(--color-text)
}

.active-button {
    border: 2px solid var(--vt-c-box-border);
    color: var(--color-heading)
}
</style>