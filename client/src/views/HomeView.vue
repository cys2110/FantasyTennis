<script setup>
import EditionService from '@/services/EditionService';
import { onMounted, ref } from 'vue';
import HomeCard from '../components/HomeCard.vue'

const props = defineProps({
  user: {
    type: Object
  }
})

const upcoming = ref()

onMounted(() => {
  EditionService.getUpcomingEditions()
    .then ((response) => {
      upcoming.value = response.data
    })
    .catch((error) => {
      console.log(error)
    })
})
</script>

<template>
  <h1>Upcoming Tournaments</h1>
  <div class="results-wrapper" v-if="upcoming">
    <HomeCard v-for="tournament in upcoming" :key="tournament._id" :tournament="tournament" />
  </div>
</template>
