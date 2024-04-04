<script setup>
import { useRouter } from 'vue-router';
import { categorySrc, flagSrc, formattedDates } from './utils';
const props = defineProps({
    prediction: {
        type: Object,
        required: true
    }
})

const router = useRouter()

const navigateEdition = (slug) => {
    router.push({name: slug, params: {id: props.prediction.edition.tourney._id, year: props.prediction.edition.year}})
}

const navigatePrediction = () => {
    router.push({name: 'Prediction', params: {id: props.prediction._id}})
}
</script>

<template>
    <div class="card">
        <div class="card-component"><img :src="categorySrc(prediction.edition.category)" :alt="prediction.edition.category" class="filter" /></div>
        <div class="card-component">
            <div class="card-heading">
                <span v-if="prediction.edition.sponsor_name">{{ prediction.edition.sponsor_name }} | </span>
                <span><RouterLink :to="{name: 'Tournament', params: {id: prediction.edition.tourney._id}}">{{ prediction.edition.tourney.name }}</RouterLink></span>
            </div>
            <div class="card-subheading">{{ prediction.edition.location.city }} <img class="mini-flag" :src="flagSrc(prediction.edition.location.country)" :alt="prediction.edition.location.country" /> | {{ formattedDates(prediction.edition.start_date, prediction.edition.end_date) }}</div>
        </div>
        <div class="buttons">
            <div class="card-button" @click="navigateEdition('Results')" >Results</div>
            <div class="card-button" @click="navigateEdition('Draw')" >Draw</div>
            <div class="card-button" @click="navigatePrediction" >Prediction</div>
        </div>
    </div>
</template>