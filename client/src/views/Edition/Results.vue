<script setup>
import ResultCard from '@/components/ResultCard.vue';
import { ref } from 'vue';

const props = defineProps({
    matches: {
        type: Array,
        required: true
    },
    edition: {
        type: Object,
        required: true
    }
})

const final =ref()
const sfMatches = ref([])
const qfMatches = ref([])
const r16Matches = ref([])
const r32Matches = ref([])
const r64Matches = ref([])
const r128Matches = ref([])

for (let i = 0; i < props.matches.length; i++) {
    switch (props.matches[i].round) {
        case 'F':
            final.value = props.matches[i]
            break
        case 'SF':
            sfMatches.value.push(props.matches[i])
            break
        case 'QF':
            qfMatches.value.push(props.matches[i])
            break
        case 'R16':
            r16Matches.value.push(props.matches[i])
            break
        case 'R32':
            r32Matches.value.push(props.matches[i])
            break
        case 'R64':
            r64Matches.value.push(props.matches[i])
            break
        case 'R128':
            r128Matches.value.push(props.matches[i])
    }
}
</script>

<template>
    <div class="view-container">
        <div class="round-container">
            <h1>Final</h1>
            <div class="card-container">
                <ResultCard :match="final" />
            </div>
        </div>
        <div class="round-container">
            <h1>Semifinals</h1>
            <div class="card-container">
                <ResultCard v-for="match in sfMatches" :key="match._id" :match="match" />
            </div>
        </div>
        <div class="round-container">
            <h1>Quarterfinals</h1>
            <div class="card-container">
                <ResultCard v-for="match in qfMatches" :key="match._id" :match="match" />
            </div>
        </div>
        <div class="round-container">
            <h1>Round of 16</h1>
            <div class="card-container">
                <ResultCard v-for="match in r16Matches" :key="match._id" :match="match" />
            </div>
        </div>
        <div class="round-container">
            <h1>Round of 32</h1>
            <div class="card-container">
                <ResultCard v-for="match in r32Matches" :key="match._id" :match="match" />
            </div>
        </div>
        <div class="round-container" v-if="edition.type_of_draw === 64 || edition.type_of_draw === 128">
            <h1>Round of 64</h1>
            <div class="card-container">
                <ResultCard v-for="match in r64Matches" :key="match._id" :match="match" />
            </div>
        </div>
        <div class="round-container" v-if="edition.type_of_draw === 128">
            <h1>Round of 128</h1>
            <div class="card-container">
                <ResultCard v-for="match in r128Matches" :key="match._id" :match="match" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.view-container {
    display: flex;
    flex-direction: column;
    margin: 30px;
}

.card-container {
    display: flex;
    flex-flow: row wrap;
}
</style>