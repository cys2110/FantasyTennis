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
                <div class="bold">{{ user.points }}</div>
                <div>LIFETIME POINTS</div>
            </div>
            <div class="banner-component">
                <div class="bold">{{ calculateYTD() }}</div>
                <div>YTD POINTS</div>
            </div>
            <div class="banner-component">
                <div class="bold">{{ currentPoints() }}</div>
                <div>CURRENT POINTS</div>
            </div>
        </div>
        <div class="bold">Predictions</div>
        <div class="card-container">
            <ProfileCard v-for="prediction in predictions" :prediction="prediction" />
        </div>
    </div>
</template>

<style scoped>
.banner {
    display: flex;
    flex-direction: row;
    background-color: var(--vt-c-box-border);
    padding: 2rem;
    justify-content: space-evenly;
    border-radius: 5rem;
    margin-top: 2rem;
    margin-bottom: 2rem
}

.banner-component {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.bold {
    font-weight: bold;
    font-size: xx-large;
}
</style>