<script setup>
import PredictionCard from '@/components/PredictionCard.vue';
import { categorySrc, flagSrc, formattedDates } from '@/components/utils';
import PredictionService from '@/services/PredictionService';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
    id: {
        required: true
    },
    user: {
        required: true
    }
})

const router = useRouter()

const prediction = ref(null)
const final =ref()
const sfMatches = ref([])
const qfMatches = ref([])
const r16Matches = ref([])
const r32Matches = ref([])
const r64Matches = ref([])
const r128Matches = ref([])

onMounted(() => {
    PredictionService.getPredictionsById(props.id)
        .then((response) => {
            prediction.value = response.data
            for (let i=0; i < prediction.value.predictions.length; i++) {
                switch (prediction.value.predictions[i].match.round) {
                    case 'F':
                        final.value = prediction.value.predictions[i]
                        break
                        case 'SF':
                            sfMatches.value.push(prediction.value.predictions[i])
                            break
                        case 'QF':
                            qfMatches.value.push(prediction.value.predictions[i])
                            break
                        case 'R16':
                            r16Matches.value.push(prediction.value.predictions[i])
                            break
                        case 'R32':
                            r32Matches.value.push(prediction.value.predictions[i])
                            break
                        case 'R64':
                            r64Matches.value.push(prediction.value.predictions[i])
                            break
                        case 'R128':
                            r128Matches.value.push(prediction.value.predictions[i])
                }
            }
        })
        .catch((error) => {
            console.log(error)
        })
    
})

const navigate = (slug) => {
    router.push({name: slug, params: {id: prediction.value.edition.tourney._id, year: prediction.value.edition.year}})
}

const selectedRound = ref(2)

const selectRound = (round) => {
  selectedRound.value = round
}
</script>

<template>
    <div class="view-container" v-if="prediction">
        <div class="heading-wrapper">
            <div class="category"><img class="filter" :src="categorySrc(prediction.edition.category)" /> </div>
            <div class="heading">
                <h1><RouterLink class="hover-link" :to="{name: 'Tournament', params: {id: prediction.edition.tourney._id}}">{{ prediction.edition.tourney.name }}</RouterLink></h1>
                <div class="sub-heading" v-if="prediction.edition.sponsor_name">{{ prediction.edition.sponsor_name }}</div>
                <div class="sub-heading">{{ formattedDates(prediction.edition.start_date, prediction.edition.end_date) }}</div>
            </div>
            <div class="flag-container"><img class="flag" :src="flagSrc(prediction.edition.location.country)" /></div>
        </div>
        <div>Points: {{ prediction.points }}</div>
        <div class="buttons">
            <div class="card-button" @click="navigate('EditionOverview')" >Overview</div>
            <div class="card-button" @click="navigate('Draw')" >Draw</div>
            <div class="card-button" @click="navigate('Results')" >Results</div>
        </div>
        <div class="navigator">
            <button v-if="prediction.edition.type_of_draw===128" @click="selectRound(128)" :class="{'active-button': selectedRound === 128}">R128</button>
            <button v-if="prediction.edition.type_of_draw === 64 || prediction.edition.type_of_draw === 128" @click="selectRound(64)" :class="{'active-button': selectedRound === 64}">R64</button>
            <button @click="selectRound(32)" :class="{'active-button': selectedRound === 32}">R32</button>
            <button @click="selectRound(16)" :class="{'active-button': selectedRound === 16}">R16</button>
            <button @click="selectRound(8)" :class="{'active-button': selectedRound === 8}">QF</button>
            <button @click="selectRound(4)" :class="{'active-button': selectedRound === 4}">SF</button>
            <button @click="selectRound(2)" :class="{'active-button': selectedRound === 2}">F</button>
        </div>
        <div class="draw-wrapper">
            <div class="round-wrapper" v-if="prediction.edition.type_of_draw === 128" v-show="selectedRound >= 128">
                <PredictionCard v-for="match in r128Matches" :key="match._id" :match="match" />
            </div>
            <div class="round-wrapper" v-if="prediction.edition.type_of_draw === 64 || prediction.edition.type_of_draw === 128" v-show="selectedRound >= 64">
                <PredictionCard v-for="match in r64Matches" :key="match._id" :match="match"/>
            </div>
            <div class="round-wrapper" v-show="selectedRound >= 32">
                <PredictionCard v-for="match in r32Matches" :key="match._id" :match="match" />
            </div>
            <div class="round-wrapper" v-show="selectedRound >= 16">
                <PredictionCard v-for="match in r16Matches" :key="match._id" :match="match" />
            </div>
            <div class="round-wrapper" v-show="selectedRound >= 8">
                <PredictionCard v-for="match in qfMatches" :key="match._id" :match="match" />
            </div>
            <div class="round-wrapper" v-show="selectedRound >= 4">
                <PredictionCard v-for="match in sfMatches" :key="match._id" :match="match" />
            </div>
            <div class="round-wrapper" v-show="selectedRound >= 2">
                <PredictionCard :match="final" />
            </div>
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