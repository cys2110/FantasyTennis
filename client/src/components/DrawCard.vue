<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCheck } from '@fortawesome/pro-duotone-svg-icons'
import { computed } from 'vue';
import { headshot, flagSrc } from './utils';
import { useRouter } from 'vue-router';

const props = defineProps({
    match: {
        type: Object,
        required: true
    }
})

const router = useRouter()

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

const player1Name = computed(() => {
    return `${props.match.player_1.first_name.charAt(0)}. ${props.match.player_1.last_name}`
})

const player2Name = computed(() => {
    return `${props.match.player_2.first_name.charAt(0)}. ${props.match.player_2.last_name}`
})

const player1Status = computed(() => {
    if (props.match.player_1_seed && props.match.player_1_status)
    {
        return `(${props.match.player_1_seed} ${props.match.player_1_status})`
    } else if (props.match.player_1_seed) {
        return `(${props.match.player_1_seed})`
    } else {
        return `(${props.match.player_1_status})`
    }
})

const player2Status = computed(() => {
    if (props.match.player_2_seed && props.match.player_2_status)
    {
        return `(${props.match.player_2_seed} ${props.match.player_2_status})`
    } else if (props.match.player_2_seed) {
        return `(${props.match.player_2_seed})`
    } else {
        return `(${props.match.player_2_status})`
    }
})

const navigate = (player) => {
    router.push({name: 'PlayerLayout', params: {id: player}})
}
</script>

<template>
    <div class="draw-card-wrapper">
        <div class="card-component">
            <div class="component-column">
                <div class="component-row"><img v-if="match.player_1 && match.player_1.headshot" :src="headshot(match.player_1._id)" class="headshot" @click="navigate(match.player_1._id)" /></div>
                <div class="component-row"><img v-if="match.player_2 && match.player_2.headshot" :src="headshot(match.player_2._id)" @click="navigate(match.player_2._id)" class="headshot" /></div>
            </div>
            <div class="component-column">
                <div class="component-row"><img v-if="match.player_1" :src="flagSrc(match.player_1.country)" class="mini-flag" /></div>
                <div class="component-row"><img v-if="match.player_2" :src="flagSrc(match.player_2.country)" class="mini-flag" /></div>
            </div>
            <div class="component-column">
                <div class="component-row" v-if="match.player_1"><RouterLink :to="{name: 'PlayerLayout', params: {id: match.player_1._id}}" class="hover-link">{{ player1Name }}</RouterLink> <span v-if="match.player_1_seed || match.player_1_status" class="small"><small>{{ player1Status }}</small></span></div><div class="component-row" v-else>Bye</div>
                <div class="component-row" v-if="match.player_2"><RouterLink :to="{name: 'PlayerLayout', params: {id: match.player_2._id}}" class="hover-link">{{ player2Name }}</RouterLink> <span v-if="match.player_2_seed || match.player_2_status" class="small"><small>{{ player2Status }}</small></span></div><div class="component-row" v-else>Bye</div>
            </div>
            <div class="component-column">
                <div class="component-row"><FontAwesomeIcon v-if="match.winner === 1" :icon="faCheck" /></div>
                <div class="component-row"><FontAwesomeIcon v-if="match.winner === 2" :icon="faCheck" /></div>
            </div>
            <div class="score">
                <div class="component-column" v-if="match.score.set1.length > 0">
                    <div class="component-row">{{ match.score.set1[player1Index] }}<sup v-if="match.score.tiebreak1 && match.score.set1[player1Index] === 6">{{ match.score.tiebreak1[player1Index] }}</sup></div>
                    <div class="component-row">{{ match.score.set1[player2Index] }}<sup v-if="match.score.tiebreak1 && match.score.set1[player2Index] === 6">{{ match.score.tiebreak1[player2Index] }}</sup></div>
                </div>
                <div class="component-column" v-if="match.score.set2.length > 0">
                    <div class="component-row">{{ match.score.set2[player1Index] }}<sup v-if="match.score.tiebreak2 && match.score.set2[player1Index] === 6">{{ match.score.tiebreak2[player2Index] }}</sup></div>
                    <div class="component-row">{{ match.score.set2[player2Index] }}<sup v-if="match.score.tiebreak2 && match.score.set2[player2Index] === 6">{{ match.score.tiebreak2[player2Index] }}</sup></div>
                </div>
                <div class="component-column" v-if="match.score.set3.length > 0">
                    <div class="component-row">{{ match.score.set3[player1Index] }}<sup v-if="match.score.tiebreak3 && match.score.set3[player1Index] === 6">{{ match.score.tiebreak3[player1Index] }}</sup></div>
                    <div class="component-row">{{ match.score.set3[player2Index] }}<sup v-if="match.score.tiebreak3 && match.score.set3[player2Index] === 6">{{ match.score.tiebreak3[player2Index] }}</sup></div>
                </div>
                <div class="component-column" v-if="match.score.set4.length > 0">
                    <div class="component-row">{{ match.score.set4[player1Index] }}<sup v-if="match.score.tiebreak4 && match.score.set4[player1Index] === 6">{{ match.score.tiebreak4[player1Index] }}</sup></div>
                    <div class="component-row">{{ match.score.set4[player2Index] }}<sup v-if="match.score.tiebreak4 && match.score.set4[player2Index] === 6">{{ match.score.tiebreak4[player2Index] }}</sup></div>
                </div>
                <div class="component-column" v-if="match.score.set5.length > 0">
                    <div class="component-row">{{ match.score.set5[player1Index] }}<sup v-if="match.score.tiebreak5 && match.score.set5[player1Index] === 6">{{ match.score.tiebreak5[player1Index] }}</sup></div>
                    <div class="component-row">{{ match.score.set5[player2Index] }}<sup v-if="match.score.tiebreak5 && match.score.set5[player2Index] === 6">{{ match.score.tiebreak5[player2Index] }}</sup></div>
                </div>
            </div>
        </div>
        <div class="card-component">
            <div class="right-side" v-if="match.retirement">Retired</div>
            <div class="right-side" v-else-if="match.walkover">Walkover</div>
            <div class="right-side" v-else-if="match.default">Default</div>
        </div>
    </div>
</template>

<style scoped>
.headshot {
  height: 2.5rem
}

.score {
    display: flex;
    flex-direction: row;
    height: 100%;
    margin-left: auto;
}

.right-side {
    margin-left: auto;
}
</style>