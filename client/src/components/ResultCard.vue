<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCheck } from '@fortawesome/pro-duotone-svg-icons';
import { computed, ref } from 'vue';
import { headshot } from './utils';

const props = defineProps({
    match: {
        type: Object,
        required: true
    }
})

const winner = ref(null)
const loser = ref(null)

const tiebreak = (matchScore, tiebreakScore) => {
    if (matchScore === 6) {
        return tiebreakScore
    } else {
        return null
    }
}

const flagSrc = (country) => {
    return new URL(`../assets/flags/${country}.svg`, import.meta.url).href
}

if (props.match.winner === 1) {
    winner.value = props.match.player_1
    loser.value = props.match.player_2
} else {
    winner.value = props.match.player_2
    loser.value = props.match.player_1
}

const hour = Math.floor(props.match.duration_mins / 60)
const minutes = props.match.duration_mins % 60
const formattedMinutes = minutes < 10 ? '0' + minutes : minutes

const duration = computed(() => `${hour}:${formattedMinutes}`)
</script>

<template>
    <div class="result-wrapper">
        <div class="duration" v-if="match.duration_mins">{{ duration }}</div>
        <div class="players">
            <div class="player">
                <div class="headshot"><img :src="headshot(winner._id)" /></div>
                <div class="country"><img :src="flagSrc(winner.country)" /></div>
                <div class="player-name">{{ winner.full_name }}</div>
            </div>
            <div class="player">
                <div class="headshot"><img v-if="!match.bye" :src="headshot(loser._id)" /></div>
                <div class="country"><img v-if="!match.bye" :src="flagSrc(loser.country)" /></div>
                <div class="player-name" v-if="!match.bye">{{ loser.full_name }}</div><div class="player-name" v-else>Bye</div>
            </div>
        </div>
        <div class="winner">
            <div><FontAwesomeIcon :icon="faCheck" /></div>
            <div></div>
        </div>
        <div class="set1" v-if="match.score.set1.length > 0">
            <div><span>{{ match.score.set1[0] }}</span><span v-if="match.score.tiebreak1.length > 0"><sup>{{ tiebreak(match.score.set1[0], match.score.tiebreak1[0]) }}</sup></span></div>
            <div><span>{{ match.score.set1[1] }}</span><span v-if="match.score.tiebreak1.length > 0"><sup>{{tiebreak(match.score.set1[1], match.score.tiebreak1[1]) }}</sup></span></div>
        </div>
        <div class="set2" v-if="match.score.set2.length > 0">
            <div><span>{{ match.score.set2[0] }}</span><span v-if="match.score.tiebreak2.length > 0"><sup>{{ tiebreak(match.score.set2[0], match.score.tiebreak2[0]) }}</sup></span></div>
            <div><span>{{ match.score.set2[1] }}</span><span v-if="match.score.tiebreak2.length > 0"><sup>{{ tiebreak(match.score.set2[1], match.score.tiebreak2[1]) }}</sup></span></div>
        </div>
        <div class="set3" v-if="match.score.set3.length > 0">
            <div><span>{{ match.score.set3[0] }}</span><span v-if="match.score.tiebreak3.length > 0"><sup>{{ tiebreak(match.score.set3[0], match.score.tiebreak3[0]) }}</sup></span></div>
            <div><span>{{ match.score.set3[1] }}</span><span v-if="match.score.tiebreak3.length > 0"><sup>{{ tiebreak(match.score.set3[1], match.score.tiebreak3[1]) }}</sup></span></div>
        </div>
        <div class="set4" v-if="match.score.set4.length > 0">
            <div><span>{{ match.score.set4[0] }}</span><span v-if="match.score.tiebreak4.length > 0"><sup>{{ tiebreak(match.score.set4[0], match.score.tiebreak4[0]) }}</sup></span></div>
            <div><span>{{ match.score.set4[1] }}</span><span v-if="match.score.tiebreak4.length > 0"><sup>{{ tiebreak(match.score.set4[1], match.score.tiebreak4[1]) }}</sup></span></div>
        </div>
        <div class="set5" v-if="match.score.set5.length > 0">
            <div><span>{{ match.score.set5[0] }}</span><span v-if="match.score.tiebreak5.length > 0"><sup>{{ tiebreak(match.score.set5[0], match.score.tiebreak5[0]) }}</sup></span></div>
            <div><span>{{ match.score.set5[1] }}</span><span v-if="match.score.tiebreak5.length > 0"><sup>{{ tiebreak(match.score.set5[1], match.score.tiebreak5[1]) }}</sup></span></div>
        </div>
        <div class="ret" v-if="match.ret">Retired</div>
        <div class="wo" v-else-if="match.wo">Walkover</div>
        <div class="def" v-else-if="match.def">Default</div>
        <div class="umpire" v-if="match.umpire">Umpire: {{ match.umpire }}</div>
    </div>
</template>