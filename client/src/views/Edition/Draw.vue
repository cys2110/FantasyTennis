<script setup>
import DrawCard from '@/components/DrawCard.vue';
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
    <div class="draw-wrapper">
        <div class="r128-wrapper" v-if="edition.type_of_draw === 128">
            <DrawCard v-for="match in r128Matches" :key="match._id" :match="match" />
        </div>
        <div class="r64-wrapper" v-if="edition.type_of_draw === 64">
            <DrawCard v-for="match in r64Matches" :key="match._id" :match="match" />
        </div>
        <div class="r32-wrapper">
            <DrawCard v-for="match in r32Matches" :key="match._id" :match="match" />
        </div>
        <div class="r16-wrapper">
            <DrawCard v-for="match in r16Matches" :key="match._id" :match="match" />
        </div>
        <div class="qf-wrapper">
            <DrawCard v-for="match in qfMatches" :key="match._id" :match="match" />
        </div>
        <div class="sf-wrapper">
            <DrawCard v-for="match in sfMatches" :key="match._id" :match="match" />
        </div>
        <div class="f-wrapper">
            <DrawCard :match="final" />
        </div>
    </div>
</template>