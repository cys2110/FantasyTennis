<script setup>
import EditionService from '@/services/EditionService';
import { onMounted, ref } from 'vue';

const props = defineProps({
    player: {
        required: true
    }
})

const wins = ref(null)
const finals = ref(null)
const selection = ref('Titles')

onMounted(() => {
    EditionService.getEditionByPlayer(props.player._id)
    .then((response) => {
        if (response.data.wins.length > 0) {
            wins.value = response.data.wins
            console.log(wins.value)
        }
        if (response.data.finals.length > 0) {
            finals.value = response.data.finals
            console.log(finals.value)
        }
    })
    .catch(error => console.log(error))
})
</script>

<template>
    <div>abc</div>
    <div v-if="selection === 'Titles'">
        <div class="heading">Titles</div>
        
    </div>
</template>