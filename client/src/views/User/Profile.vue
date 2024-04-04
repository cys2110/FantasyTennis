<script setup>
import PredictionService from '@/services/PredictionService';
import { onMounted, ref } from 'vue';
import ProfileCard from '@/components/ProfileCard.vue';

const props = defineProps({
    user: {
        type: Object,
        required: true
    }
})

const predictions = ref(null)
const currentDate = new Date()

const calculateYTD = () => {
    const currentYear = currentDate.getFullYear()
    const filteredPredictions = predictions.value.filter(prediction => {return prediction.edition.year === currentYear})
    let runningTally = 0
    filteredPredictions.forEach((prediction) => runningTally += prediction.points)
    console.log(filteredPredictions)
    if (runningTally) {
        return runningTally
    } else {
        return 0
    }
}

const currentPoints = () => {
    const filteredPredictions = predictions.value.filter(prediction => {
        return new Date(prediction.edition.end_date) >= currentDate
    })
    let runningTally = 0
    filteredPredictions.forEach((prediction) => runningTally += prediction.points)
    if (runningTally) {
        return runningTally
    } else {
        return 0
    }
}

onMounted(() => {
    PredictionService.getPredictionsByUser(props.user._id)
        .then((response) => {
            predictions.value = response.data
        })
        .catch((error) => {
            console.log(error)
        })
})
</script>

<template>
    <div class="view-container" v-if="predictions">
        <div class="banner">
            <div class="banner-component">
                <div>{{ user.points }}</div>
                <div>LIFETIME POINTS</div>
            </div>
            <div class="banner-component">
                <div>{{ calculateYTD() }}</div>
                <div>YTD POINTS</div>
            </div>
            <div class="banner-component">
                <div>{{ currentPoints() }}</div>
                <div>CURRENT POINTS</div>
            </div>
        </div>
        <div class="card-container">
            <ProfileCard v-for="prediction in predictions" :prediction="prediction" />
        </div>
    </div>
</template>