<script setup>
import { useRouter } from 'vue-router';
import { flagSrc, headshot } from './utils';
import { computed, ref, watch } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCheck } from '@fortawesome/pro-duotone-svg-icons';

const props = defineProps({
    match: {
        type: Object,
        required: true
    },
    editMode: {
        required: true
    },
    category: {
        required: true
    },
    players: {
        type: Object,
        required: false
    }
})

const emits = defineEmits(['update:editedPrediction', 'update:predictedWinner'])

const editedPrediction = ref(props.match)
const predictedWinner = ref({
    _id: '',
    full_name: ''
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

const player1Index = computed(() => {
    if (props.match.player_1) {
        if (props.match.winner === props.match.player_1._id) {
            return 0
        } else {
            return 1
        }
    } else {
        return 0
    }
})

const player2Index = computed(() => {
    if (props.match.player_2) {
        if (props.match.winner === props.match.player_2._id) {
            return 0
        } else {
            return 1
        }
    } else {
        return 0
    }
})

const arraysAreEqual = (array1, array2) => {
    return array1.length === array2.length && array1.every((value, index) => value === array2[index])
}

if (!props.match.match.winner_id) {
    correctWinner.value = null
} else if (props.match.winner === props.match.match.winner_id) {
    correctWinner.value = true
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

const setPredictedWinner = (player, full_name) => {
    editedPrediction.value.winner = player
    predictedWinner.value = {
        _id: player,
        full_name: full_name
    }
    emits('update:predictedWinner', predictedWinner.value)
    emitPrediction()
}

const emitPrediction = () => {
    emits('update:editedPrediction', editedPrediction.value)
}

const set1Score = ref()
const set2Score = ref()
const set3Score = ref()
const set4Score = ref()
const set5Score = ref()
const tiebreak1Score = ref()
const tiebreak2Score = ref()
const tiebreak3Score = ref()
const tiebreak4Score = ref()
const tiebreak5Score = ref()

const calculateScore = (field, predictionField) => {
    if (field && field !== '') {
        const array = field.split(',').map(Number)
        editedPrediction.value[predictionField] = array
    }
}

</script>

<template>
    <div class="draw-card-wrapper">
        <div class="card-component">
            <div class="component-column">
                <div class="component-row">
                    <img v-if="match.player_1 && match.player_1.headshot" :src="headshot(match.player_1._id)" class="headshot" @click="navigate(match.player_1._id)" />
                </div>
                <div class="component-row">
                    <img v-if="match.player_2 && match.player_2.headshot" :src="headshot(match.player_2._id)" @click="navigate(match.player_2._id)" class="headshot" />
                </div>
            </div>
            <div class="component-column">
                <div class="component-row"><img v-if="match.player_1 && match.player_1.country" :src="flagSrc(match.player_1.country)" class="mini-flag" /></div>
                <div class="component-row"><img v-if="match.player_2 && match.player_2.country" :src="flagSrc(match.player_2.country)" class="mini-flag" /></div>
            </div>
            <div class="component-column">
                <div class="component-row" v-if="match.match.bye && !match.player_1">Bye</div>
                <div class="component-row" v-else-if="match.player_1 && match.player_1._id"><RouterLink :to="{name: 'PlayerLayout', params: {id: match.player_1._id}}" class="hover-link">{{ match.player_1.full_name }}</RouterLink></div>
                <div class="component-row" v-else-if="players.player_1._id !== ''">{{ players.player_1.full_name }}</div>
                <div class="component-row" v-else>Player 1</div>
                <div class="component-row" v-if="match.match.bye && !match.player_2">Bye</div>
                <div class="component-row" v-else-if="match.player_2 && match.player_2._id"><RouterLink :to="{name: 'PlayerLayout', params: {id: match.player_2._id}}" class="hover-link">{{ match.player_2.full_name }}</RouterLink></div>
                <div class="component-row" v-else-if="players.player_2._id !== ''">{{ players.player_2.full_name }}</div>
                <div class="component-row" v-else>Player 2</div>
            </div>
            <div class="component-column">
                <div v-if="editMode && match.player_1 && match.player_1._id" class="component-row" @click="setPredictedWinner(match.player_1._id, match.player_1.full_name)" ><FontAwesomeIcon :icon="faCheck" /></div>
                <div v-else-if="editMode && players.player_1._id" class="component-row" @click="setPredictedWinner(players.player_1._id, players.player_1.full_name)" ><FontAwesomeIcon :icon="faCheck" /></div>
                <div v-else class="component-row"><FontAwesomeIcon v-if="match.player_1 && match.winner === match.player_1._id" :icon="faCheck" :class="{'correct': correctWinner, 'incorrect': correctWinner === false}" /></div>
                <div v-if="editMode && match.player_2 && match.player_2._id" class="component-row" @click="setPredictedWinner(match.player_2._id, match.player_2.full_name)" ><FontAwesomeIcon :icon="faCheck" /></div>
                <div v-else-if="editMode && players.player_2._id" class="component-row" @click="setPredictedWinner(players.player_2._id, players.player_2.full_name)" ><FontAwesomeIcon :icon="faCheck" /></div>
                <div v-else class="component-row"><FontAwesomeIcon v-if="match.player_2 && match.winner === match.player_2._id" :icon="faCheck" :class="{'correct': correctWinner, 'incorrect': correctWinner === false}" /></div>
            </div>
            <div v-if="editMode" class="predictScore">
                <table>
                    <tr>
                        <td>Set 1</td>
                        <td><input type="text" placeholder="S1" v-model="set1Score" @input="calculateScore(set1Score, 'set1')" @blur="emitPrediction" /></td>
                        <td><input type="text" placeholder="T1" v-model="tiebreak1Score" @input="calculateScore(tiebreak1Score, 'tiebreak1')" @blur="emitPrediction" /></td>
                    </tr>
                    <tr>
                        <td>Set 2</td>
                        <td><input type="text" placeholder="S2" v-model="set2Score" @blur="calculateScore(set2Score, 'set2')" /></td>
                        <td><input type="text" placeholder="T2" v-model="tiebreak2Score" @input="calculateScore(tiebreak2Score, 'tiebreak2')" @blur="emitPrediction" /></td>
                    </tr>
                    <tr>
                        <td>Set 3</td>
                        <td><input type="text" placeholder="S3" v-model="set3Score" @input="calculateScore(set3Score, 'set3')" @blur="emitPrediction" /></td>
                        <td><input type="text" placeholder="T3" v-model="tiebreak3Score" @input="calculateScore(tiebreak3Score, 'tiebreak3')" @blur="emitPrediction" /></td>
                    </tr>
                    <tr v-if="category === 'Grand Slam'">
                        <td>Set 4</td>
                        <td><input type="text" placeholder="S4" v-model="set4Score" @input="calculateScore(set4Score, 'set4')" @blur="emitPrediction" /></td>
                        <td><input type="text" placeholder="T4" v-model="tiebreak4Score" @input="calculateScore(tiebreak4Score, 'tiebreak4')" @blur="emitPrediction" /></td>
                    </tr>
                    <tr v-if="category === 'Grand Slam'">
                        <td>Set 5</td>
                        <td><input type="text" placeholder="S5" v-model="set5Score" @input="calculateScore(set1Score, 'set5')" @blur="emitPrediction" /></td>
                        <td><input type="text" placeholder="T5" v-model="tiebreak5Score" @input="calculateScore(tiebreak5Score, 'tiebreak5')" @blur="emitPrediction" /></td>
                    </tr>
                </table>
            </div>
            <div v-else class="score">
                <div class="component-column">
                    <div class="component-row" :class="{'correct': correctSet1 === true, 'incorrect': correctSet1 === false}" >{{ match.set1[player1Index] }}<sup v-if="match.tiebreak1 && match.set1[player1Index] === 6">{{ match.tiebreak1[player1Index] }}</sup></div>
                    <div class="component-row" :class="{'correct': correctSet1 === true, 'incorrect': correctSet1 === false}">{{ match.set1[player2Index] }}<sup v-if="match.tiebreak1 && match.set1[player2Index] === 6">{{ match.tiebreak1[player2Index] }}</sup></div>
                </div>
                <div class="component-column">
                    <div class="component-row" :class="{'correct': correctSet2 === true, 'incorrect': correctSet2 === false}">{{ match.set2[player1Index] }}<sup v-if="match.tiebreak2 && match.set2[player1Index] === 6">{{ match.tiebreak2[player2Index] }}</sup></div>
                    <div class="component-row" :class="{'correct': correctSet2 === true, 'incorrect': correctSet2 === false}">{{ match.set2[player2Index] }}<sup v-if="match.tiebreak2 && match.set2[player2Index] === 6">{{ match.tiebreak2[player2Index] }}</sup></div>
                </div>
                <div class="component-column" v-if="match.set3 && match.set3.length > 0">
                    <div class="component-row" :class="{'correct': correctSet3, 'incorrect': correctSet3 === false}">{{ match.set3[player1Index] }}<sup v-if="match.tiebreak3 && match.set3[player1Index] === 6">{{ match.tiebreak3[player1Index] }}</sup></div>
                    <div class="component-row" :class="{'correct': correctSet3, 'incorrect': correctSet3 === false}">{{ match.set3[player2Index] }}<sup v-if="match.tiebreak3 && match.set3[player2Index] === 6">{{ match.tiebreak3[player2Index] }}</sup></div>
                </div>
                <div class="component-column" v-if="match.set4 && match.set4.length > 0">
                    <div class="component-row" :class="{'correct': correctSet4, 'incorrect': correctSet4 === false}">{{ match.set4[player1Index] }}<sup v-if="match.tiebreak4 && match.set4[player1Index] === 6">{{ match.tiebreak4[player1Index] }}</sup></div>
                    <div class="component-row" :class="{'correct': correctSet4, 'incorrect': correctSet4 === false}">{{ match.set4[player2Index] }}<sup v-if="match.tiebreak4 && match.set4[player2Index] === 6">{{ match.tiebreak4[player2Index] }}</sup></div>
                </div>
                <div class="component-column" v-if="match.set5 && match.set5.length > 0">
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

input {
    width: 1.75rem;
    text-align: center;
}
</style>