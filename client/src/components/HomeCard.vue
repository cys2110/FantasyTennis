<script setup>
import { onMounted, ref } from 'vue';
import { formattedDates, flagSrc, categorySrc } from './utils';
import MatchScore from '@/services/MatchScore';
import { useUserStore } from '@/stores/user';
import PredictionService from '@/services/PredictionService';
import { useRouter } from 'vue-router';

const props = defineProps({
    tournament: {
        type: Object,
        required: true
    }
})

const router = useRouter()
const store = useUserStore()
const createPrediction = ref(false)
const editPrediction = ref(false)
const viewPrediction = ref(false)
const prediction = ref()
const startDate = new Date(props.tournament.start_date)
const currentDate = new Date()

onMounted(() => {
    MatchScore.getMatchesByEdition(props.tournament._id)
        .then((response) => {
            if (response.data.length > 0 && store.loggedIn) {
                PredictionService.getPredictionsByUserandId(localStorage.user, props.tournament._id)
                .then((response) => {
                    if (response.data.length > 0) {
                        if (startDate > currentDate) {
                            editPrediction.value = true
                        } else {
                            viewPrediction.value = true
                        }
                        prediction.value = response.data[0]._id
                    } else if (startDate > currentDate) {
                        createPrediction.value = true
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
            } else {
                return
            }
        })
        .catch((error) => {
            console.log(error)
        })
})

const createPredictionFunction = () => {
    PredictionService.createPrediction(localStorage.user, props.tournament._id)
        .then((response) => {
            console.log(response)
            PredictionService.getPredictionsByUserandId(localStorage.user, props.tournament._id)
                .then((response) => {
                    editPrediction.value = false
                    router.push({name: 'Prediction', params: {username: localStorage.user, id: response.data[0]._id}})
                })
        })
        .catch((error) => {
            console.log(error)
        })
}

const editPredictionFunction = () => {
    router.push({name: 'Prediction', params: {username: localStorage.user, id: prediction.value}})
}

const navigate = (slug) => {
    router.push({name: slug, params: {id: props.tournament.tourney._id, year: props.tournament.year}})
}

</script>

<template>
        <div class="card">
            <div class="category card-column" v-if="tournament.category">
                <img :src="categorySrc(tournament.category)" class="filter" />
            </div>
            <div class="headings card-column">
                <div class="card-heading"v-if="tournament.sponsor_name">{{ tournament.sponsor_name }}</div>
                <div class="card-heading">
                    <RouterLink class="hover-link" :to="{ name: 'Tournament', params: { id: tournament.tourney._id }}" >{{ tournament.tourney.name }}</RouterLink>
                </div>
                <div class="card-subheading">{{ tournament.location.city }} | {{ formattedDates(tournament.start_date, tournament.end_date) }}</div>
            </div>
            <div class="right-side">
                <div class="buttons">
                    <div class="card-button" @click="createPredictionFunction" v-if="createPrediction">Make a prediction</div>
                    <div class="card-button" v-if="editPrediction" @click="editPredictionFunction" >Edit prediction</div>
                    <div class="card-button" v-if="viewPrediction" @click="editPredictionFunction" >View prediction</div>
                    <div class="card-button" v-if="startDate < currentDate" @click="navigate('EditionOverview')">Overview</div>
                    <div class="card-button" v-if="startDate < currentDate" @click="navigate('Results')">Results</div>
                    <div class="card-button" v-if="startDate < currentDate" @click="navigate(Draw)">Draw</div>
                </div>
                <div class="flag card-column">
                    <img class="card-flag" :src="flagSrc(tournament.location.country)" :alt="tournament.location.country" />
                </div>
            </div>
            
        </div>
</template>

<style scoped>

.right-side {
    margin-left: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.buttons {
    display: flex;
    flex-direction: row;
    margin-right: 1rem;
}

.headings, .category {
    margin-left: 1rem
}
</style>