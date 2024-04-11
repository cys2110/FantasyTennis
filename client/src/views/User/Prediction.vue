<script setup>
import PredictionCard from '@/components/PredictionCard.vue';
import { categorySrc, flagSrc, formattedDates } from '@/components/utils';
import PredictionService from '@/services/PredictionService';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
    id: {
        required: true
    },
    user: {
        required: true
    }
})

const router = useRouter()

const prediction = ref(null)
const final =ref()
const sfMatches = ref([])
const qfMatches = ref([])
const r16Matches = ref([])
const r32Matches = ref([])
const r64Matches = ref([])
const r128Matches = ref([])
const selectedRound = ref(null)
const editMode = ref(false)
const showEdit = ref(false)
const finalPlayers =ref({
    player_1: {
        _id: '',
        full_name: ''
    },
    player_2: {
        _id: '',
        full_name: ''
    }
})
const sfPlayers = ref(Array(2).fill({
    player_1: {
        _id: '',
        full_name: ''
    },
    player_2: {
        _id: '',
        full_name: ''
    }
}))
const qfPlayers = ref(Array(4).fill({
    player_1: {
        _id: '',
        full_name: ''
    },
    player_2: {
        _id: '',
        full_name: ''
    }
}))
const r16Players = ref(Array(8).fill({
    player_1: {
        _id: '',
        full_name: ''
    },
    player_2: {
        _id: '',
        full_name: ''
    }
}))
const r32Players = ref(Array(16).fill({
    player_1: {
        _id: '',
        full_name: ''
    },
    player_2: {
        _id: '',
        full_name: ''
    }
}))
const r64Players = ref(Array(32).fill({
    player_1: {
        _id: '',
        full_name: ''
    },
    player_2: {
        _id: '',
        full_name: ''
    }
}))

onMounted(() => {
    PredictionService.getPredictionsById(props.id)
        .then((response) => {
            prediction.value = response.data
            const currentDate = new Date()
            prediction.value.edition.start_date >= currentDate ? showEdit.value = true : showEdit.value = false
            selectedRound.value = prediction.value.edition.type_of_draw
            for (let i=0; i < prediction.value.predictions.length; i++) {
                switch (prediction.value.predictions[i].match.round) {
                    case 'F':
                        final.value = prediction.value.predictions[i]
                        break
                    case 'SF':
                        sfMatches.value.push(prediction.value.predictions[i])
                        break
                    case 'QF':
                        qfMatches.value.push(prediction.value.predictions[i])
                        break
                    case 'R16':
                        r16Matches.value.push(prediction.value.predictions[i])
                        break
                    case 'R32':
                        r32Matches.value.push(prediction.value.predictions[i])
                        break
                    case 'R64':
                        r64Matches.value.push(prediction.value.predictions[i])
                        break
                    case 'R128':
                        r128Matches.value.push(prediction.value.predictions[i])
                }
            }
        })
        .catch((error) => {
            console.log(error)
        })
    
})

const navigate = (slug) => {
    router.push({name: slug, params: {id: prediction.value.edition.tourney._id, year: prediction.value.edition.year}})
}

const selectRound = (round) => {
  selectedRound.value = round
}

const handlePredictedWinner = (round, index, newValue) => {
    const getMatchArray = () => {
        switch (round) {
            case 64:
                return r64Matches
            case 32:
                return r32Matches
            case 16:
                return r16Matches
            case 'qf':
                return qfMatches
            case 'sf':
                return sfMatches
            case 'f':
                return final
        }
    }
    const getPlayerArray = () => {
        switch (round) {
            case 64:
                return r64Players
            case 32:
                return r32Players
            case 16:
                return r16Players
            case 'qf':
                return qfPlayers
            case 'sf':
                return sfPlayers
            case 'f':
                return finalPlayers
        }
    }
    const matchArray = getMatchArray(round)
    const playerArray = getPlayerArray(round)
    const matchIndex = Math.floor(index / 2)
    if (index % 2 === 0 ) {
        if (matchArray === final) {
            final.value.player_1 = newValue._id
            finalPlayers.value.player_1 = newValue
        } else {
            matchArray.value[matchIndex].player_1 = newValue._id
            playerArray.value[matchIndex] = {
                ...playerArray.value[matchIndex],
                player_1: {
                    ...playerArray.value[matchIndex].player_1,
                    _id: newValue._id,
                    full_name: newValue.full_name
                }
            }
        }
    } else {
        if (matchArray === final) {
            final.value.player_2 = newValue._id
            finalPlayers.value.player_2 = newValue
        } else {
            matchArray.value[matchIndex].player_2 = newValue._id
            playerArray.value[matchIndex] = {
                ...playerArray.value[matchIndex],
                player_2: {
                    ...playerArray.value[matchIndex].player_2,
                    _id: newValue._id,
                    full_name: newValue.full_name
                }
            }
        }
    }
}

const submitPrediction = () => {
    editMode.value = false
    let updatedArray = []
    if (r128Matches.value.length > 0) {
        updatedArray = updatedArray.concat(r128Matches.value)
    }
    if (r64Matches.value.length > 0) {
        updatedArray = updatedArray.concat(r64Matches.value)
    }
    updatedArray = updatedArray.concat(r32Matches.value).concat(r16Matches.value).concat(qfMatches.value).concat(sfMatches.value)
    updatedArray.push(final.value)
    const updatedPrediction = {
        user: props.user._id,
        edition: prediction.value.edition._id,
        predictions: updatedArray
    }
    PredictionService.editPrediction(props.id, updatedPrediction)
        .then(() => {
            console.log('success')
        })
        .catch((error) => {
            console.log(error)
        })
}

const deletePrediction = () => {
    PredictionService.deletePrediction(props.id)
        .then((response) => {
            console.log(response)
            router.push({name: 'home'})
        })
        .catch((error) => {
            console.log(error)
        })
}
</script>

<template>
    <div class="view-container" v-if="prediction">
        <div class="heading-wrapper">
            <div class="category"><img class="filter" :src="categorySrc(prediction.edition.category)" /> </div>
            <div class="heading">
                <h1><RouterLink class="hover-link" :to="{name: 'Tournament', params: {id: prediction.edition.tourney._id}}">{{ prediction.edition.tourney.name }}</RouterLink></h1>
                <div class="sub-heading" v-if="prediction.edition.sponsor_name">{{ prediction.edition.sponsor_name }}</div>
                <div class="sub-heading">{{ formattedDates(prediction.edition.start_date, prediction.edition.end_date) }}</div>
            </div>
            <div class="flag-container"><img class="flag" :src="flagSrc(prediction.edition.location.country)" /></div>
        </div>
        <div>Points: {{ prediction.points }}</div>
        <div class="buttons">
            <div class="card-button" @click="navigate('EditionOverview')" >Overview</div>
            <div class="card-button" @click="navigate('Draw')" >Draw</div>
            <div class="card-button" @click="navigate('Results')" >Results</div>
        </div>
        <div class="navigator">
            <button v-if="prediction.edition.type_of_draw===128" @click="selectRound(128)" :class="{'active-button': selectedRound === 128}">R128</button>
            <button v-if="prediction.edition.type_of_draw === 64 || prediction.edition.type_of_draw === 128" @click="selectRound(64)" :class="{'active-button': selectedRound === 64}">R64</button>
            <button @click="selectRound(32)" :class="{'active-button': selectedRound === 32}">R32</button>
            <button @click="selectRound(16)" :class="{'active-button': selectedRound === 16}">R16</button>
            <button @click="selectRound(8)" :class="{'active-button': selectedRound === 8}">QF</button>
            <button @click="selectRound(4)" :class="{'active-button': selectedRound === 4}">SF</button>
            <button @click="selectRound(2)" :class="{'active-button': selectedRound === 2}">F</button>
        </div>
        <div>
            <button v-if="!editMode && showEdit" @click="editMode = true" >Edit</button>
            <button v-if="editMode && showEdit" @click="submitPrediction" >Save</button>
            <button v-if="editMode && showEdit" @click="editMode = false" >Cancel</button>
            <button v-if="showEdit" @click="deletePrediction" >Delete</button>
        </div>
        <div class="draw-wrapper">
            <div class="round-wrapper" v-if="prediction.edition.type_of_draw === 128" v-show="selectedRound >= 128">
                <PredictionCard v-for="(match, index) in r128Matches" :key="match._id" :match="match" :editMode="editMode" :category="prediction.edition.category" v-model:editedPrediction="r128Matches[index]" @update:predictedWinner="handlePredictedWinner(64, index, $event)" />
            </div>
            <!-- <div class="round-wrapper" v-if="prediction.edition.type_of_draw === 64 || prediction.edition.type_of_draw === 128" v-show="selectedRound >= 64">
                <PredictionCard v-for="(match, index) in r64Matches" :key="match._id" :match="match" :editMode="editMode" :category="prediction.edition.category" :players="r64Players[index]" v-model:editedPrediction="r64Matches[index]" @update:predictedWinner="handlePredictedWinner(32, index, $event)"/>
            </div> -->
            <div class="round-wrapper" v-show="selectedRound >= 32">
                <PredictionCard v-for="(match, index) in r32Matches" :key="match._id" :match="match" :editMode="editMode" :category="prediction.edition.category" v-model:editedPrediction="r32Matches[index]"  @update:predictedWinner="handlePredictedWinner(16, index, $event)" :players="r32Players[index]" />
            </div>
            <div class="round-wrapper" v-show="selectedRound >= 16">
                <PredictionCard v-for="(match, index) in r16Matches" :key="match._id" :match="match" :editMode="editMode" :category="prediction.edition.category" :players="r16Players[index]" v-model:editedPrediction="r16Matches[index]" @update:predictedWinner="handlePredictedWinner('qf', index, $event)" />
            </div>
            <div class="round-wrapper" v-show="selectedRound >= 8">
                <PredictionCard v-for="(match, index) in qfMatches" :key="match._id" :match="match" :editMode="editMode" :category="prediction.edition.category" :players="qfPlayers[index]" v-model:editedPrediction="qfMatches[index]" @update:predictedWinner="handlePredictedWinner('sf', index, $event)" />
            </div>
            <div class="round-wrapper" v-show="selectedRound >= 4">
                <PredictionCard v-for="(match, index) in sfMatches" :key="match._id" :match="match" :editMode="editMode" :category="prediction.edition.category" :players="sfPlayers[index]" v-model:editedPrediction="sfMatches[index]" @update:predictedWinner="handlePredictedWinner('f', index, $event)" />
            </div>
            <div class="round-wrapper" v-show="selectedRound >= 2">
                <PredictionCard :match="final" :editMode="editMode" :category="prediction.edition.category" :players="finalPlayers" v-model:editedPrediction="final" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.category {
    margin-right: 20px;
}

.buttons {
    display: flex;
    flex-direction: row;
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