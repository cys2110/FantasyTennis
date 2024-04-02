<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCheck } from '@fortawesome/pro-duotone-svg-icons'
import { computed } from 'vue';
import { headshot } from './utils';

const props = defineProps({
    match: {
        type: Object,
        required: true
    }
})

const player1Index = computed(() => {
    if (props.match.winner === 1) {
        return 0
    } else {
        return 1
    }
})

const player2Index = computed(() => {
    if (props.match.winner === 2) {
        return 0
    } else {
        return 1
    }
})

const flagSrc = (country) => {
    return new URL(`../assets/flags/${country}.svg`, import.meta.url).href
}

console.log(player1Index)
console.log(player2Index)
</script>

<template>
    <div class="draw-card-wrapper">
        <div class="incompletes">
            <div class="incomplete" v-if="match.retirement">Retired</div>
            <div class="incomplete" v-else-if="match.walkover">Walkover</div>
            <div class="incomplete" v-else-if="match.default">Default</div>
        </div>
        <div class="players">
            <div class="headshot">
                <div class="player-1"><img v-if="match.player_1 && match.player_1.headshot" :src="headshot(match.player_1._id)" /></div>
                <div class="player-2"><img v-if="match.player_2 && match.player_2.headshot" :src="headshot(match.player_2._id)" /></div>
            </div>
            <div class="country">
                <div class="player-1"><img v-if="match.player_1" :src="flagSrc(match.player_1.country)" /></div>
                <div class="player-2"><img v-if="match.player_2" :src="flagSrc(match.player_2.country)" /></div>
            </div>
            <div class="name">
                <div class="player-1" v-if="match.player_1">{{ match.player_1.full_name }}</div><div class="player-1" v-else>Bye</div>
                <div class="player-2" v-if="match.player_2">{{ match.player_2.full_name }}</div><div class="player-2" v-else>Bye</div>
            </div>
        </div>
        <div class="winner-tick">
            <div class="player-1"><FontAwesomeIcon v-if="match.winner === 1" :icon="faCheck" /></div>
            <div class="player-2"><FontAwesomeIcon v-if="match.winner === 2" :icon="faCheck" /></div>
        </div>
        <div class="score">
            <div class="set-1">
                <div class="player-1" v-if="match.score.set1">{{ match.score.set1[player1Index] }}<sup v-if="match.score.tiebreak1 && match.score.set1[player1Index] === 6">{{ match.score.tiebreak1[player1Index] }}</sup></div>
                <div class="player-2" v-if="match.score.set1">{{ match.score.set1[player2Index] }}<sup v-if="match.score.tiebreak1 && match.score.set1[player2Index] === 6">{{ match.score.tiebreak1[player2Index] }}</sup></div>
            </div>
            <div class="set-2">
                <div class="player-1" v-if="match.score.set2">{{ match.score.set2[player1Index] }}<sup v-if="match.score.tiebreak2 && match.score.set2[player1Index] === 6">{{ match.score.tiebreak2[player2Index] }}</sup></div>
                <div class="player-2" v-if="match.score.set2">{{ match.score.set2[player2Index] }}<sup v-if="match.score.tiebreak2 && match.score.set2[player2Index] === 6">{{ match.score.tiebreak2[player2Index] }}</sup></div>
            </div>
            <div class="set-3">
                <div class="player-1" v-if="match.score.set3">{{ match.score.set3[player1Index] }}<sup v-if="match.score.tiebreak3 && match.score.set3[player1Index] === 6">{{ match.score.tiebreak3[player1Index] }}</sup></div>
                <div class="player-2" v-if="match.score.set3">{{ match.score.set3[player2Index] }}<sup v-if="match.score.tiebreak3 && match.score.set3[player2Index] === 6">{{ match.score.tiebreak3[player2Index] }}</sup></div>
            </div>
            <div class="set-4">
                <div class="player-1" v-if="match.score.set4">{{ match.score.set4[player1Index] }}<sup v-if="match.score.tiebreak4 && match.score.set4[player1Index] === 6">{{ match.score.tiebreak4[player1Index] }}</sup></div>
                <div class="player-2" v-if="match.score.set4">{{ match.score.set4[player2Index] }}<sup v-if="match.score.tiebreak4 && match.score.set4[player2Index] === 6">{{ match.score.tiebreak4[player2Index] }}</sup></div>
            </div>
            <div class="set-5">
                <div class="player-1" v-if="match.score.set5">{{ match.score.set5[player1Index] }}<sup v-if="match.score.tiebreak5 && match.score.set5[player1Index] === 6">{{ match.score.tiebreak5[player1Index] }}</sup></div>
                <div class="player-2" v-if="match.score.set5">{{ match.score.set5[player2Index] }}<sup v-if="match.score.tiebreak5 && match.score.set5[player2Index] === 6">{{ match.score.tiebreak5[player2Index] }}</sup></div>
            </div>
        </div>
    </div>
</template>