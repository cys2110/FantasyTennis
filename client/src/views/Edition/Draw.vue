<script setup>
import DrawCard from '@/components/DrawCard.vue';
import { computed, ref } from 'vue';

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

const selectedRound = ref(2)

const selectRound = (round) => {
  selectedRound.value = round
}

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
    <div v-if="selectedRound">
        <div class="navigator">
            <button v-if="edition.type_of_draw === 128" @click="selectRound(128)" :class="{'active-button': selectedRound === 128}">R128</button>
            <button v-if="edition.type_of_draw === 64 || edition.type_of_draw === 128" @click="selectRound(64)" :class="{'active-button': selectedRound === 64}">R64</button>
            <button @click="selectRound(32)" :class="{'active-button': selectedRound === 32}">R32</button>
            <button @click="selectRound(16)" :class="{'active-button': selectedRound === 16}">R16</button>
            <button @click="selectRound(8)" :class="{'active-button': selectedRound === 8}">QF</button>
            <button @click="selectRound(4)" :class="{'active-button': selectedRound === 4}">SF</button>
            <button @click="selectRound(2)" :class="{'active-button': selectedRound === 2}">F</button>
        </div>
        <div class="draw-wrapper">
            <div class="round-wrapper" v-if="edition.type_of_draw === 128" v-show="selectedRound >= 128">
                <DrawCard v-for="match in r128Matches" :key="match._id" :match="match" />
            </div>
            <div class="round-wrapper" v-if="edition.type_of_draw === 64 || edition.type_of_draw === 128" v-show="selectedRound >= 64">
                <DrawCard v-for="match in r64Matches" :key="match._id" :match="match"/>
            </div>
            <div class="round-wrapper" v-show="selectedRound >= 32">
                <DrawCard v-for="match in r32Matches" :key="match._id" :match="match" />
            </div>
            <div class="round-wrapper" v-show="selectedRound >= 16">
                <DrawCard v-for="match in r16Matches" :key="match._id" :match="match" />
            </div>
            <div class="round-wrapper" v-show="selectedRound >= 8">
                <DrawCard v-for="match in qfMatches" :key="match._id" :match="match" />
            </div>
            <div class="round-wrapper" v-show="selectedRound >= 4">
                <DrawCard v-for="match in sfMatches" :key="match._id" :match="match" />
            </div>
            <div class="round-wrapper" v-show="selectedRound >= 2">
                <DrawCard :match="final" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.navigator {
    margin: 2rem auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
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