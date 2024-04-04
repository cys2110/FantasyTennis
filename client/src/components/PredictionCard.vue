<script setup>
import { useRouter } from 'vue-router';
import { flagSrc, headshot } from './utils';
import { computed, ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCheck } from '@fortawesome/pro-duotone-svg-icons';

const props = defineProps({
    match: {
        type: Object,
        required: true
    }
})

const correctWinner = ref(null)
const correctSet1 = ref(null)
const correctSet2 = ref(null)
const correctSet3 = ref(null)
const correctSet4 = ref(null)
const correctSet5 = ref(null)

const router = useRouter()

const navigate = (player) => {
    router.push({name: 'PlayerLayout', params: {id: player}})
}

const player1Name = computed(() => {
    return `${props.match.match.player_1.first_name.charAt(0)}. ${props.match.match.player_1.last_name}`
})

const player2Name = computed(() => {
    return `${props.match.match.player_2.first_name.charAt(0)}. ${props.match.match.player_2.last_name}`
})

const player1Index = computed(() => {
    if (props.match.winner === props.match.match.player_1._id) {
        return 0
    } else {
        return 1
    }
})

const player2Index = computed(() => {
    if (props.match.winner === props.match.match.player_2._id) {
        return 0
    } else {
        return 1
    }
})

const arraysAreEqual = (array1, array2) => {
    return array1.length === array2.length && array1.every((value, index) => value === array2[index])
}

if (props.match.winner === props.match.match.winner_id) {
    correctWinner.value = true
} else if (!props.match.match.winner_id) {
    correctWinner.value = null
} else {
    correctWinner.value = false
}

if (props.match.match.walkover) {
    correctSet1.value = false;
    correctSet2.value = false;
    correctSet3.value = false;
    correctSet4.value = false;
    correctSet5.value = false;
} else {
    const setChecks = [
        { set: props.match.match.score.set1, tiebreak: props.match.match.score.tiebreak1, correctSet: correctSet1 },
        { set: props.match.match.score.set2, tiebreak: props.match.match.score.tiebreak2, correctSet: correctSet2 },
        { set: props.match.match.score.set3, tiebreak: props.match.match.score.tiebreak3, correctSet: correctSet3 },
        { set: props.match.match.score.set4, tiebreak: props.match.match.score.tiebreak4, correctSet: correctSet4 },
        { set: props.match.match.score.set5, tiebreak: props.match.match.score.tiebreak5, correctSet: correctSet5 }
    ];

    setChecks.forEach((setCheck, index) => {
        if (setCheck.set.length > 0) {
            setCheck.correctSet.value = arraysAreEqual(setCheck.set, props.match[`set${index + 1}`]);
            if (setCheck.tiebreak.length > 0) {
                setCheck.correctSet.value = arraysAreEqual(setCheck.tiebreak, props.match[`tiebreak${index + 1}`]) && setCheck.correctSet.value;
            }
        }
    });
}

const player1Status = computed(() => {
    if (props.match.match.player_1_seed && props.match.match.player_1_status)
    {
        return `(${props.match.match.player_1_seed} ${props.match.match.player_1_status})`
    } else if (props.match.match.player_1_seed) {
        return `(${props.match.match.player_1_seed})`
    } else {
        return `(${props.match.match.player_1_status})`
    }
})

const player2Status = computed(() => {
    if (props.match.match.player_2_seed && props.match.match.player_2_status)
    {
        return `(${props.match.match.player_2_seed} ${props.match.match.player_2_status})`
    } else if (props.match.match.player_2_seed) {
        return `(${props.match.match.player_2_seed})`
    } else {
        return `(${props.match.match.player_2_status})`
    }
})
</script>

<template>
    <div class="draw-card-wrapper">
        <div class="card-component">
            <div class="component-column">
                <div class="component-row">
                    <img v-if="match.match.player_1 && match.match.player_1.headshot" :src="headshot(match.match.player_1._id)" class="headshot" @click="navigate(match.match.player_1._id)" />
                </div>
                <div class="component-row">
                    <img v-if="match.match.player_2 && match.match.player_2.headshot" :src="headshot(match.match.player_2._id)" @click="navigate(match.match.player_2._id)" class="headshot" />
                </div>
            </div>
            <div class="component-column">
                <div class="component-row"><img v-if="match.match.player_1" :src="flagSrc(match.match.player_1.country)" class="mini-flag" /></div>
                <div class="component-row"><img v-if="match.match.player_2" :src="flagSrc(match.match.player_2.country)" class="mini-flag" /></div>
            </div>
            <div class="component-column">
                <div class="component-row" v-if="match.match.player_1"><RouterLink :to="{name: 'PlayerLayout', params: {id: match.match.player_1._id}}" class="hover-link">{{ player1Name }}</RouterLink> <span v-if="match.match.player_1_seed || match.match.player_1_status" class="small"><small>{{ player1Status }}</small></span></div><div class="component-row" v-else>Bye</div>
                <div class="component-row" v-if="match.match.player_2"><RouterLink :to="{name: 'PlayerLayout', params: {id: match.match.player_2._id}}" class="hover-link">{{ player2Name }}</RouterLink> <span v-if="match.match.player_2_seed || match.match.player_2_status" class="small"><small>{{ player2Status }}</small></span></div><div class="component-row" v-else>Bye</div>
            </div>
            <div class="component-column">
                <div class="component-row"><FontAwesomeIcon v-if="match.winner === match.match.player_1._id" :icon="faCheck" :class="{'correct': correctWinner, 'incorrect': correctWinner === false}" /></div>
                <div class="component-row"><FontAwesomeIcon v-if="match.winner === match.match.player_2._id" :icon="faCheck" /></div>
            </div>
            <div class="score">
                <div class="component-column">
                    <div class="component-row" :class="{'correct': correctSet1 === true, 'incorrect': correctSet1 === false}" >{{ match.set1[player1Index] }}<sup v-if="match.tiebreak1 && match.set1[player1Index] === 6">{{ match.tiebreak1[player1Index] }}</sup></div>
                    <div class="component-row" :class="{'correct': correctSet1 === true, 'incorrect': correctSet1 === false}">{{ match.set1[player2Index] }}<sup v-if="match.tiebreak1 && match.set1[player2Index] === 6">{{ match.tiebreak1[player2Index] }}</sup></div>
                </div>
                <div class="component-column">
                    <div class="component-row" :class="{'correct': correctSet2 === true, 'incorrect': correctSet2 === false}">{{ match.set2[player1Index] }}<sup v-if="match.tiebreak2 && match.set2[player1Index] === 6">{{ match.tiebreak2[player2Index] }}</sup></div>
                    <div class="component-row" :class="{'correct': correctSet2 === true, 'incorrect': correctSet2 === false}">{{ match.set2[player2Index] }}<sup v-if="match.tiebreak2 && match.set2[player2Index] === 6">{{ match.tiebreak2[player2Index] }}</sup></div>
                </div>
                <div class="component-column" v-if="match.set3.length > 0">
                    <div class="component-row" :class="{'correct': correctSet3, 'incorrect': correctSet3 === false}">{{ match.set3[player1Index] }}<sup v-if="match.tiebreak3 && match.set3[player1Index] === 6">{{ match.tiebreak3[player1Index] }}</sup></div>
                    <div class="component-row" :class="{'correct': correctSet3, 'incorrect': correctSet3 === false}">{{ match.set3[player2Index] }}<sup v-if="match.tiebreak3 && match.score.set3[player2Index] === 6">{{ match.tiebreak3[player2Index] }}</sup></div>
                </div>
                <div class="component-column" v-if="match.set4.length > 0">
                    <div class="component-row" :class="{'correct': correctSet4, 'incorrect': correctSet4 === false}">{{ match.set4[player1Index] }}<sup v-if="match.tiebreak4 && match.set4[player1Index] === 6">{{ match.tiebreak4[player1Index] }}</sup></div>
                    <div class="component-row" :class="{'correct': correctSet4, 'incorrect': correctSet4 === false}">{{ match.set4[player2Index] }}<sup v-if="match.tiebreak4 && match.set4[player2Index] === 6">{{ match.tiebreak4[player2Index] }}</sup></div>
                </div>
                <div class="component-column" v-if="match.set5.length > 0">
                    <div class="component-row" :class="{'correct': correctSet5, 'incorrect': correctSet5 === false}">{{ match.set5[player1Index] }}<sup v-if="match.tiebreak5 && match.set5[player1Index] === 6">{{ match.tiebreak5[player1Index] }}</sup></div>
                    <div class="component-row" :class="{'correct': correctSet5, 'incorrect': correctSet5 === false}">{{ match.set5[player2Index] }}<sup v-if="match.tiebreak5 && match.set5[player2Index] === 6">{{ match.tiebreak5[player2Index] }}</sup></div>
                </div>
            </div>
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

.correct {
    color: green
}

.incorrect {
    color: red
}
</style>