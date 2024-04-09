<script setup>
import PlayerService from '@/services/PlayerService';
import { ref } from 'vue'

const props = defineProps({
    label: {
        type: [String, Object],
        default: ''
    },
    modelValue: {
        type: [String, Object],
        default: ''
    }
})

const players = ref([])

const searchPlayer = (value) => {
    PlayerService.getPlayerByName(value)
    .then(response => {
        players.value = response.data
        console.log(players.value)
    })
    .catch(error => console.log(error))
}
</script>

<template>
    <input v-bind="$attrs" :placeholder="label" @input="searchPlayer($event.target.value)" />
    <div>
        <div v-for="player in players" @click="$emit('update:modelValue', player._id)" >{{ player.full_name }}</div>
    </div>
</template>