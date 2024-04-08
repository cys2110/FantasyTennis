<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCheck } from '@fortawesome/pro-duotone-svg-icons';
import { computed } from 'vue';
import { headshot, tiebreak, flagSrc, regularDate } from './utils';
import { useRouter } from 'vue-router';

const props = defineProps({
    match: {
        type: Object,
        required: true
    }
})

const router = useRouter()

const hour = Math.floor(props.match.duration_mins / 60)
const minutes = props.match.duration_mins % 60
const formattedMinutes = minutes < 10 ? '0' + minutes : minutes

const duration = computed(() => `${hour}:${formattedMinutes}`)
const winner = computed(() => {
    if (props.match.winner === 1) {
        return props.match.player_1
    } else {
        return props.match.player_2
    }
})
const loser = computed(() => {
    if (props.match.bye) {
        return 'Bye'
    } else if (props.match.winner === 1) {
        return props.match.player_2
    } else {
        return props.match.player_1
    }
})

const winnerStatus = computed(() => {
    if (props.match.winner === 1) {
        if (props.match.player_1_seed && props.match.player_1_status) {
            return `(${props.match.player_1_seed} ${props.match.player_1_status})`
        } else if (props.match.player_1_seed) {
            return `(${props.match.player_1_seed})`
        } else if (props.match.player_1_status) {
            return `(${props.match.player_1_status})`
        } else {
            return
        }
    } else {
        if (props.match.player_2_seed && props.match.player_2_status) {
            return `(${props.match.player_2_seed} ${props.match.player_2_status})`
        } else if (props.match.player_2_seed) {
            return `(${props.match.player_2_seed})`
        } else if (props.match.player_2_status) {
            return `(${props.match.player_2_status})`
        } else {
            return
        }
    }
})

const loserStatus = computed(() => {
    if (props.match.bye) {
        return
    } else {
        if (props.match.winner === 1) {
            console.log(props.match.player_2_seed)
            if (props.match.player_2_seed && props.match.player_2_status) {
                return `(${props.match.player_2_seed} ${props.match.player_2_status})`
            } else if (props.match.player_2_seed) {
                return `(${props.match.player_2_seed})`
            } else if (props.match.player_2_status) {
                return `(${props.match.player_2_status})`
            } else {
                return
            }
        } else {
            if (props.match.player_1._seed && props.match.player_1_status) {
                return `(${props.match.player_1_seed} ${props.match.player_1_status})`
            } else if (props.match.player_1_seed) {
                return `(${props.match.player_1_seed})`
            } else if (props.match.player_1_status) {
                return `(${props.match.player_1_status})`
            } else {
                return
            }
        }
    }
})

const navigate = (player) => {
    router.push({name: 'PlayerLayout', params: {id: player}})
}
</script>

<template>
    <div class="result-card" v-if="match.winner">
        <div class="card-component">
            <div v-if="match.date">Date: {{ regularDate(match.date) }}</div>
            <div class="right-side" v-if="match.duration_mins">Duration: {{ duration }}</div>
        </div>
        <div class="card-component" v-if="winner && loser">
            <div class="component-column">
                <div class="component-row"><img v-if="winner.headshot" :src="headshot(winner._id)" class="headshot" @click="navigate(winner._id)" /></div>
                <div class="component-row"><img v-if="loser.headshot" :src="headshot(loser._id)" class="headshot" @click="navigate(loser._id)" /></div>
            </div>
            <div class="component-column">
                <div class="component-row"><img :src="flagSrc(winner.country)" class="mini-flag" /></div>
                <div class="component-row"><img :src="flagSrc(loser.country)" class="mini-flag" /></div>
            </div>
            <div class="component-column">
                <div class="component-row"><RouterLink :to="{name: 'PlayerLayout', params: {id: winner._id}}" class="hover-link">{{ winner.full_name }}</RouterLink> <span v-if="match.player_1_seed || match.player_1.status || match.player_2_seed || match.player_2_status" class="small" ><small>{{ winnerStatus }}</small></span></div>
                <div v-if="match.bye" class="component-row">Bye</div>
                <div v-else class="component-row"><RouterLink :to="{name: 'PlayerLayout', params: {id: loser._id}}" class="hover-link">{{ loser.full_name }}</RouterLink> <span v-if="match.player_1_seed || match.player_1_status || match.player_2_seed || match.player_2_status" class="small" ><small>{{ loserStatus }}</small></span></div>
            </div>
            <div class="component-column">
                <div class="component-row"><FontAwesomeIcon :icon="faCheck" /></div>
                <div class="component-row"></div>
            </div>
            <div class="score">
                <div class="component-column" v-if="match.score.set1.length > 0">
                    <div class="component-row"><span>{{ match.score.set1[0] }}</span><span v-if="match.score.tiebreak1.length > 0"><sup>{{ tiebreak(match.score.set1[0], match.score.tiebreak1[0]) }}</sup></span></div>
                    <div class="component-row"><span>{{ match.score.set1[1] }}</span><span v-if="match.score.tiebreak1.length > 0"><sup>{{tiebreak(match.score.set1[1], match.score.tiebreak1[1]) }}</sup></span></div>
                </div>
                <div class="component-column" v-if="match.score.set2.length > 0">
                    <div class="component-row"><span>{{ match.score.set2[0] }}</span><span v-if="match.score.tiebreak2.length > 0"><sup>{{ tiebreak(match.score.set2[0], match.score.tiebreak2[0]) }}</sup></span></div>
                    <div class="component-row"><span>{{ match.score.set2[1] }}</span><span v-if="match.score.tiebreak2.length > 0"><sup>{{ tiebreak(match.score.set2[1], match.score.tiebreak2[1]) }}</sup></span></div>
                </div>
                <div class="component-column" v-if="match.score.set3.length > 0">
                    <div class="component-row"><span>{{ match.score.set3[0] }}</span><span v-if="match.score.tiebreak3.length > 0"><sup>{{ tiebreak(match.score.set3[0], match.score.tiebreak3[0]) }}</sup></span></div>
                    <div class="component-row"><span>{{ match.score.set3[1] }}</span><span v-if="match.score.tiebreak3.length > 0"><sup>{{ tiebreak(match.score.set3[1], match.score.tiebreak3[1]) }}</sup></span></div>
                </div>
                <div class="component-column" v-if="match.score.set4.length > 0">
                    <div class="component-row"><span>{{ match.score.set4[0] }}</span><span v-if="match.score.tiebreak4.length > 0"><sup>{{ tiebreak(match.score.set4[0], match.score.tiebreak4[0]) }}</sup></span></div>
                    <div class="component-row"><span>{{ match.score.set4[1] }}</span><span v-if="match.score.tiebreak4.length > 0"><sup>{{ tiebreak(match.score.set4[1], match.score.tiebreak4[1]) }}</sup></span></div>
                </div>
                <div class="component-column" v-if="match.score.set5.length > 0">
                    <div class="component-row"><span>{{ match.score.set5[0] }}</span><span v-if="match.score.tiebreak5.length > 0"><sup>{{ tiebreak(match.score.set5[0], match.score.tiebreak5[0]) }}</sup></span></div>
                    <div class="component-row"><span>{{ match.score.set5[1] }}</span><span v-if="match.score.tiebreak5.length > 0"><sup>{{ tiebreak(match.score.set5[1], match.score.tiebreak5[1]) }}</sup></span></div>
                </div>
            </div>
        </div>
        <div class="card-component">
            <div class="ret" v-if="match.retirement">Retired</div>
            <div class="wo" v-else-if="match.walkover">Walkover</div>
            <div class="def" v-else-if="match.default">Default</div>
            <div class="right-side" v-if="match.umpire">Umpire: {{ match.umpire }}</div>
        </div>
    </div>
</template>

<style scoped>
.result-card {
    display: flex;
    flex-direction: column;
    width: 45%;
    border: 2px solid var(--color-border);
    border-radius: 15px;
    margin: 15px;
    padding: 5px
}

.right-side {
    margin-left: auto;
}

.card-component {
    display: flex;
    flex-direction: row;
    height: 100%;
}

.score {
    display: flex;
    flex-direction: row;
    height: 100%;
    margin-left: auto;
}

.component-column {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 100%;
}

.component-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding-left: 5px;
    padding-right: 5px;
    margin-top: 5px;
}
</style>