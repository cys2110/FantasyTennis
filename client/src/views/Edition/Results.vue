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
    <div class="final">
        <div>Final</div>
        <ResultCard :match="final" />
    </div>
    <div class="sf">
        <div>Semifinals</div>
        <ResultCard v-for="match in sfMatches" :key="match._id" :match="match" />
    </div>
    <div class="qf">
        <div>Quarterfinals</div>
        <ResultCard v-for="match in qfMatches" :key="match._id" :match="match" />
    </div>
    <div class="r16">
        <div>Round of 16</div>
        <ResultCard v-for="match in r16Matches" :key="match._id" :match="match" />
    </div>
    <div class="r32">
        <div>Round of 32</div>
        <ResultCard v-for="match in r32Matches" :key="match._id" :match="match" />
    </div>
    <div class="r64" v-if="edition.type_of_draw === 64 || edition.type_of_draw === 128">
        <div>Round of 64</div>
        <ResultCard v-for="match in r64Matches" :key="match._id" :match="match" />
    </div>
    <div class="r128" v-if="edition.type_of_draw === 128">
        <div>Round of 128</div>
        <ResultCard v-for="match in r128Matches" :key="match._id" :match="match" />
    </div>
</template>