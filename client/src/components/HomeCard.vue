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

onMounted(() => {
    MatchScore.getMatchesByEdition(props.tournament._id)
        .then((response) => {
            if (response.data.length > 0 && store.loggedIn) {
                PredictionService.getPredictionsByUserandId(localStorage.user, props.tournament._id)
                .then((response) => {
                    if (response.data.length > 0) {
                        editPrediction.value = true
                    } else {
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
        .then(() => {
            router.push({name: 'Make Prediction', params: {username: localStorage.user, edition: props.tournament._id}})
        })
        .catch((error) => {
            console.log(error)
        })
}

</script>

<template>
    <div class="card-button" @click="createPredictionFunction" v-if="createPrediction">Make a prediction</div>
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