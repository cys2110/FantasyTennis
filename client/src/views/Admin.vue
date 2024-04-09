<script setup>
import InputNoLabel from '@/components/BaseForm/InputNoLabel.vue';
import EditionAdmin from '@/components/EditionAdmin.vue';
import PlayerAdmin from '@/components/PlayerAdmin.vue';
import SearchPlayer from '@/components/SearchPlayer.vue';
import TourneyAdmin from '@/components/TourneyAdmin.vue';
import EditionService from '@/services/EditionService';
import MatchScore from '@/services/MatchScore';
import PlayerService from '@/services/PlayerService';
import TournamentService from '@/services/TournamentService';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
    username: {
        required: true
    }
})

const router = useRouter()

const selectedEdition = ref(null)
const edition = ref(null)
const createEdition = ref(false)

const selectedMatchEdition = ref(null)
const matches = ref([])

const selectedTourney = ref(null)
const tourney = ref(null)
const createTourney = ref(false)

const selectedPlayer = ref(null)
const player = ref(null)
const createPlayer = ref(false)

const final =ref()
const sfMatches = ref([])
const qfMatches = ref([])
const r16Matches = ref([])
const r32Matches = ref([])
const r64Matches = ref([])
const r128Matches = ref([])

onMounted(() => {
    const user = localStorage.getItem('user')
    if (user !== 'cys2110') {
        router.push({name: 'home'})
    }
})

const submitMatchEdition = () => {
    MatchScore.getMatchesByEdition(selectedMatchEdition.value)
        .then((response) => {
            matches.value = response.data
            console.log(matches.value)
            for (let i = 0; i < matches.value.length; i++) {
                switch (matches.value[i].round) {
                    case 'F':
                        final.value = matches.value[i]
                        break
                    case 'SF':
                        sfMatches.value.push(matches.value[i])
                        break
                    case 'QF':
                        qfMatches.value.push(matches.value[i])
                        break
                    case 'R16':
                        r16Matches.value.push(matches.value[i])
                        break
                    case 'R32':
                        r32Matches.value.push(matches.value[i])
                        break
                    case 'R64':
                        r64Matches.value.push(matches.value[i])
                        break
                    case 'R128':
                        r128Matches.value.push(matches.value[i])
                }
            }
        })
        .catch((error) => {
            console.log(error)
        })
}

const saveMatch = (matchId, match) => {
    const calculateScore = (input) => {
        if (typeof input === 'string' && input !== '') {
            return input.split(',').map(Number)
        } else {
            return input
        }
    }
    match.score.set1 = calculateScore(match.score.set1)
    match.score.set2 = calculateScore(match.score.set2)
    match.score.set3 = calculateScore(match.score.set3)
    match.score.set4 = calculateScore(match.score.set4)
    match.score.set5 = calculateScore(match.score.set5)
    match.score.tiebreak1 = calculateScore(match.score.tiebreak1)
    match.score.tiebreak2 = calculateScore(match.score.tiebreak2)
    match.score.tiebreak3 = calculateScore(match.score.tiebreak3)
    match.score.tiebreak4 = calculateScore(match.score.tiebreak4)
    match.score.tiebreak5 = calculateScore(match.score.tiebreak5)

    MatchScore.editMatch(matchId, match)
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
}

const toggleCreateTourney = () => {
    createPlayer.value = false
    createEdition.value = false
    createTourney.value = true
}

const toggleCreatePlayer = () => {
    createPlayer.value = true
    createEdition.value = false
    createTourney.value = false
}

const toggleCreateEdition = () => {
    createPlayer.value = false
    createEdition.value = true
    createTourney.value = false
}

const submitTourney = () => {
    TournamentService.getTournamentById(selectedTourney.value)
        .then((response) => {
            tourney.value = response.data
        })
        .catch((error) => {
            console.log(error)
        })
}

const submitPlayer = () => {
    PlayerService.getPlayerById(selectedPlayer.value)
        .then((response) => {
            player.value = response.data
        })
        .catch((error) => {
            console.log(error)
        })
}

const submitEdition = () => {
    EditionService.getEditionById(selectedEdition.value)
        .then((response) => {
            edition.value = response.data
        })
        .catch((error) => {
            console.log(error)
        })
}
</script>

<template>
    <div class="searches">
        <form @submit.prevent="submitEdition">
            <InputNoLabel v-model="selectedEdition" label="Edition ID" type="number" />
        </form>
        <form @submit.prevent="submitTourney">
            <InputNoLabel v-model="selectedTourney" label="Tournament ID" type="number" />
        </form>
        <form @submit.prevent="submitPlayer">
            <InputNoLabel v-model="selectedPlayer" label="Player ID" type="text" />
        </form>
        <form @submit.prevent="submitMatchEdition">
            <InputNoLabel v-model="selectedMatchEdition" label="Matches by edition" type="number" />
        </form>
        <button type="button" @click="toggleCreateTourney">Add Tournament</button>
        <button type="button" @click="toggleCreatePlayer">Add Player</button>
        <button type="button" @click="toggleCreateEdition">Add Edition</button>
    </div>

    <div v-if="tourney">
        <h1>{{ tourney.name }}</h1>
        <TourneyAdmin :tourney="tourney" :edit="true" />
    </div>
    <div v-if="createTourney">
        <TourneyAdmin :create="true" />
    </div>

    <div v-if="player">
        <h1>{{ player.full_name }}</h1>
        <PlayerAdmin :player-prop="player" :edit="true" />
    </div>
    <div v-if="createPlayer">
        <PlayerAdmin :create="true" />
    </div>
    
    <div v-if="edition">
        <h1>{{ edition.tourney.name }} | {{ edition.year }}</h1>
        <EditionAdmin :edition-prop="edition" :edit="true" />
    </div>
    <div v-if="createEdition">
        <EditionAdmin :create="true" />
    </div>

    <div v-if="matches.length > 0">
        <div>{{ final.edition.tourney.name }}</div>
        <div>{{ final.edition.year }}</div>
    </div>
    <div class="form-table" v-if="matches.length > 0">
        <table>
            <thead>
                <tr>
                    <th>R</th>
                    <th>No</th>
                    <th>1id</th>
                    <th>1</th>
                    <th>1r</th>
                    <th>1se</th>
                    <th>1st</th>
                    <th>2id</th>
                    <th>2</th>
                    <th>2r</th>
                    <th>2se</th>
                    <th>2st</th>
                    <th>W</th>
                    <th>Wid</th>
                    <th>Mins</th>
                    <th>S1</th>
                    <th>T1</th>
                    <th>S2</th>
                    <th>T2</th>
                    <th>S3</th>
                    <th>T3</th>
                    <th v-if="final.edition.category === 'Grand Slam'">S4</th>
                    <th v-if="final.edition.category === 'Grand Slam'">T4</th>
                    <th v-if="final.edition.category === 'Grand Slam'">S5</th>
                    <th v-if="final.edition.category === 'Grand Slam'">T5</th>
                    <th>Ump</th>
                    <th>Date</th>
                    <th>Incompletes</th>
                    <th>Save</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="match in r128Matches">
                    <td>{{ match.round }}</td>
                    <td>{{ match.match_no }}</td>
                    <td v-if="match.player_1 && typeof match.player_1 === 'object'"><input class="number" :placeholder="match.player_1._id"  ></td>
                    <td v-else><input class="number" type="text" v-model="match.player_1" /></td>
                    <td><input type="text" class="name" v-model="match.player_1_full_name" /></td>
                    <td><input type="number" class="number" v-model="match.player_1_rank" /></td>
                    <td><input type="number" class="number" v-model="match.player_1_seed" /></td>
                    <td>
                        <select class="number" v-model="match.player_1_status">
                            <option value="Alt">Alt</option>
                            <option value="LL">LL</option>
                            <option value="PR">PR</option>
                            <option value="Q">Q</option>
                            <option value="SE">SE</option>
                            <option value="WC">WC</option>
                        </select>
                    </td>
                    <td v-if="match.player_2 && typeof match.player_2 === 'object'">
                        <SearchPlayer class="number" :label="match.player_2._id" v-model="match.player_2" />
                    </td>
                    <td v-else>
                        <SearchPlayer class="number" label="P2id" v-model="match.player_2" />
                    </td>
                    <td><input class="name" type="text" v-model="match.player_2_full_name" /></td>
                    <td><input type="number" class="number" v-model="match.player_2_rank" /></td>
                    <td><input type="number" class="number" v-model="match.player_2_seed" /></td>
                    <td>
                        <select class="number" v-model="match.player_2_status">
                            <option value="Alt">Alt</option>
                            <option value="LL">LL</option>
                            <option value="PR">PR</option>
                            <option value="Q">Q</option>
                            <option value="SE">SE</option>
                            <option value="WC">WC</option>
                        </select>
                    </td>
                    <td><input  class="number" type="number" v-model="match.winner" /></td>
                    <td><input type="text" class="number" v-model="match.winner_id" /></td>
                    <td><input class="number" type="number" v-model="match.duration_mins" /></td>
                    <td><input class="number" type="text" v-model="match.score.set1" /></td>
                    <td><input class="number" type="text" v-model="match.score.tiebreak1" /></td>
                    <td><input class="number" type="text" v-model="match.score.set2" /></td>
                    <td><input class="number" type="text" v-model="match.score.tiebreak2" /></td>
                    <td><input class="number" type="text" v-model="match.score.set3" /></td>
                    <td><input class="number" type="text" v-model="match.score.tiebreak3" /></td>
                    <td v-if="final.edition.category === 'Grand Slam'"><input class="number" type="text" v-model="match.score.set4" /></td>
                    <td v-if="final.edition.category === 'Grand Slam'"><input class="number" type="text" v-model="match.score.tiebreak4" /></td>
                    <td v-if="final.edition.category === 'Grand Slam'"><input class="number" type="text" v-model="match.score.set5" /></td>
                    <td v-if="final.edition.category === 'Grand Slam'"><input class="number" type="text" v-model="match.score.tiebreak5" /></td>
                    <td><input class="name" type="text" v-model="match.umpire" /></td>
                    <td><input type="date" class="date" v-model="match.date" /></td>
                    <td>
                        <input id="bye" type="checkbox" v-model="match.bye" />
                        <label for="bye">Bye</label>
                        <input id="ret" type="checkbox" v-model="match.retirement" />
                        <label for="ret">Ret</label>
                        <input id="def" type="checkbox" v-model="match.default" />
                        <label for="def">Def</label>
                        <input id="wo" type="checkbox" v-model="match.walkover" />
                        <label for="wo">Wo</label>
                    </td>
                    <td><button type="button" @click="saveMatch(match._id, match)">Save</button></td>
                </tr>
                <tr v-for="match in r64Matches">
                    <td>{{ match.round }}</td>
                    <td>{{ match.match_no }}</td>
                    <td v-if="match.player_1 && typeof match.player_1 === 'object'"><input class="number" :placeholder="match.player_1._id"  ></td>
                    <td v-else><input class="number" type="text" v-model="match.player_1" /></td>
                    <td><input type="text" class="name" v-model="match.player_1_full_name" /></td>
                    <td><input type="number" class="number" v-model="match.player_1_rank" /></td>
                    <td><input type="number" class="number" v-model="match.player_1_seed" /></td>
                    <td>
                        <select class="number" v-model="match.player_1_status">
                            <option value="Alt">Alt</option>
                            <option value="LL">LL</option>
                            <option value="PR">PR</option>
                            <option value="Q">Q</option>
                            <option value="SE">SE</option>
                            <option value="WC">WC</option>
                        </select>
                    </td>
                    <td v-if="match.player_2 && typeof match.player_2 === 'object'"><input class="number" :placeholder="match.player_2._id"  ></td>
                    <td v-else><input class="number" type="text" v-model="match.player_2" /></td>
                    <td><input class="name" type="text" v-model="match.player_2_full_name" /></td>
                    <td><input type="number" class="number" v-model="match.player_2_rank" /></td>
                    <td><input type="number" class="number" v-model="match.player_2_seed" /></td>
                    <td>
                        <select class="number" v-model="match.player_2_status">
                            <option value="Alt">Alt</option>
                            <option value="LL">LL</option>
                            <option value="PR">PR</option>
                            <option value="Q">Q</option>
                            <option value="SE">SE</option>
                            <option value="WC">WC</option>
                        </select>
                    </td>
                    <td><input  class="number" type="number" v-model="match.winner" /></td>
                    <td><input type="text" class="number" v-model="match.winner_id" /></td>
                    <td><input class="number" type="number" v-model="match.duration_mins" /></td>
                    <td><input class="number" type="text" v-model="match.score.set1" /></td>
                    <td><input class="number" type="text" v-model="match.score.tiebreak1" /></td>
                    <td><input class="number" type="text" v-model="match.score.set2" /></td>
                    <td><input class="number" type="text" v-model="match.score.tiebreak2" /></td>
                    <td><input class="number" type="text" v-model="match.score.set3" /></td>
                    <td><input class="number" type="text" v-model="match.score.tiebreak3" /></td>
                    <td v-if="final.edition.category === 'Grand Slam'"><input class="number" type="text" v-model="match.score.set4" /></td>
                    <td v-if="final.edition.category === 'Grand Slam'"><input class="number" type="text" v-model="match.score.tiebreak4" /></td>
                    <td v-if="final.edition.category === 'Grand Slam'"><input class="number" type="text" v-model="match.score.set5" /></td>
                    <td v-if="final.edition.category === 'Grand Slam'"><input class="number" type="text" v-model="match.score.tiebreak5" /></td>
                    <td><input class="name" type="text" v-model="match.umpire" /></td>
                    <td><input type="date" class="date" v-model="match.date" /></td>
                    <td>
                        <input id="bye" type="checkbox" v-model="match.bye" />
                        <label for="bye">Bye</label>
                        <input id="ret" type="checkbox" v-model="match.retirement" />
                        <label for="ret">Ret</label>
                        <input id="def" type="checkbox" v-model="match.default" />
                        <label for="def">Def</label>
                        <input id="wo" type="checkbox" v-model="match.walkover" />
                        <label for="wo">Wo</label>
                    </td>
                    <td><button type="button" @click="saveMatch(match._id, match)">Save</button></td>
                </tr>
                <tr v-for="match in r32Matches">
                    <td>{{ match.round }}</td>
                    <td>{{ match.match_no }}</td>
                    <td v-if="match.player_1 && typeof match.player_1 === 'object'"><input class="number" :placeholder="match.player_1._id"  ></td>
                    <td v-else><input class="number" type="text" v-model="match.player_1" /></td>
                    <td><input type="text" class="name" v-model="match.player_1_full_name" /></td>
                    <td><input type="number" class="number" v-model="match.player_1_rank" /></td>
                    <td><input type="number" class="number" v-model="match.player_1_seed" /></td>
                    <td>
                        <select class="number" v-model="match.player_1_status">
                            <option value="Alt">Alt</option>
                            <option value="LL">LL</option>
                            <option value="PR">PR</option>
                            <option value="Q">Q</option>
                            <option value="SE">SE</option>
                            <option value="WC">WC</option>
                        </select>
                    </td>
                    <td v-if="match.player_2 && typeof match.player_2 === 'object'"><input class="number" :placeholder="match.player_2._id"  ></td>
                    <td v-else><input class="number" type="text" v-model="match.player_2" /></td>
                    <td><input class="name" type="text" v-model="match.player_2_full_name" /></td>
                    <td><input type="number" class="number" v-model="match.player_2_rank" /></td>
                    <td><input type="number" class="number" v-model="match.player_2_seed" /></td>
                    <td>
                        <select class="number" v-model="match.player_2_status">
                            <option value="Alt">Alt</option>
                            <option value="LL">LL</option>
                            <option value="PR">PR</option>
                            <option value="Q">Q</option>
                            <option value="SE">SE</option>
                            <option value="WC">WC</option>
                        </select>
                    </td>
                    <td><input  class="number" type="number" v-model="match.winner" /></td>
                    <td><input type="text" class="number" v-model="match.winner_id" /></td>
                    <td><input class="number" type="number" v-model="match.duration_mins" /></td>
                    <td><input class="number" type="text" v-model="match.score.set1" /></td>
                    <td><input class="number" type="text" v-model="match.score.tiebreak1" /></td>
                    <td><input class="number" type="text" v-model="match.score.set2" /></td>
                    <td><input class="number" type="text" v-model="match.score.tiebreak2" /></td>
                    <td><input class="number" type="text" v-model="match.score.set3" /></td>
                    <td><input class="number" type="text" v-model="match.score.tiebreak3" /></td>
                    <td v-if="final.edition.category === 'Grand Slam'"><input class="number" type="text" v-model="match.score.set4" /></td>
                    <td v-if="final.edition.category === 'Grand Slam'"><input class="number" type="text" v-model="match.score.tiebreak4" /></td>
                    <td v-if="final.edition.category === 'Grand Slam'"><input class="number" type="text" v-model="match.score.set5" /></td>
                    <td v-if="final.edition.category === 'Grand Slam'"><input class="number" type="text" v-model="match.score.tiebreak5" /></td>
                    <td><input class="name" type="text" v-model="match.umpire" /></td>
                    <td><input type="date" class="date" v-model="match.date" /></td>
                    <td>
                        <input id="bye" type="checkbox" v-model="match.bye" />
                        <label for="bye">Bye</label>
                        <input id="ret" type="checkbox" v-model="match.retirement" />
                        <label for="ret">Ret</label>
                        <input id="def" type="checkbox" v-model="match.default" />
                        <label for="def">Def</label>
                        <input id="wo" type="checkbox" v-model="match.walkover" />
                        <label for="wo">Wo</label>
                    </td>
                    <td><button type="button" @click="saveMatch(match._id, match)">Save</button></td>
                </tr>
                <tr v-for="match in r16Matches">
                    <td>{{ match.round }}</td>
                    <td>{{ match.match_no }}</td>
                    <td v-if="match.player_1  && typeof match.player_1 === 'object'"><input class="number" :placeholder="match.player_1._id"  ></td>
                    <td v-else><input class="number" type="text" v-model="match.player_1" /></td>
                    <td><input type="text" class="name" v-model="match.player_1_full_name" /></td>
                    <td><input type="number" class="number" v-model="match.player_1_rank" /></td>
                    <td><input type="number" class="number" v-model="match.player_1_seed" /></td>
                    <td>
                        <select class="number" v-model="match.player_1_status">
                            <option value="Alt">Alt</option>
                            <option value="LL">LL</option>
                            <option value="PR">PR</option>
                            <option value="Q">Q</option>
                            <option value="SE">SE</option>
                            <option value="WC">WC</option>
                        </select>
                    </td>
                    <td v-if="match.player_2 && typeof match.player_2 === 'object'"><input class="number" :placeholder="match.player_2._id"  ></td>
                    <td v-else><input class="number" type="text" v-model="match.player_2" /></td>
                    <td><input class="name" type="text" v-model="match.player_2_full_name" /></td>
                    <td><input type="number" class="number" v-model="match.player_2_rank" /></td>
                    <td><input type="number" class="number" v-model="match.player_2_seed" /></td>
                    <td>
                        <select class="number" v-model="match.player_2_status">
                            <option value="Alt">Alt</option>
                            <option value="LL">LL</option>
                            <option value="PR">PR</option>
                            <option value="Q">Q</option>
                            <option value="SE">SE</option>
                            <option value="WC">WC</option>
                        </select>
                    </td>
                    <td><input  class="number" type="number" v-model="match.winner" /></td>
                    <td><input type="text" class="number" v-model="match.winner_id" /></td>
                    <td><input class="number" type="number" v-model="match.duration_mins" /></td>
                    <td><input class="number" type="text" v-model="match.score.set1" /></td>
                    <td><input class="number" type="text" v-model="match.score.tiebreak1" /></td>
                    <td><input class="number" type="text" v-model="match.score.set2" /></td>
                    <td><input class="number" type="text" v-model="match.score.tiebreak2" /></td>
                    <td><input class="number" type="text" v-model="match.score.set3" /></td>
                    <td><input class="number" type="text" v-model="match.score.tiebreak3" /></td>
                    <td v-if="final.edition.category === 'Grand Slam'"><input class="number" type="text" v-model="match.score.set4" /></td>
                    <td v-if="final.edition.category === 'Grand Slam'"><input class="number" type="text" v-model="match.score.tiebreak4" /></td>
                    <td v-if="final.edition.category === 'Grand Slam'"><input class="number" type="text" v-model="match.score.set5" /></td>
                    <td v-if="final.edition.category === 'Grand Slam'"><input class="number" type="text" v-model="match.score.tiebreak5" /></td>
                    <td><input class="name" type="text" v-model="match.umpire" /></td>
                    <td><input type="date" class="date" v-model="match.date" /></td>
                    <td>
                        <input id="bye" type="checkbox" v-model="match.bye" />
                        <label for="bye">Bye</label>
                        <input id="ret" type="checkbox" v-model="match.retirement" />
                        <label for="ret">Ret</label>
                        <input id="def" type="checkbox" v-model="match.default" />
                        <label for="def">Def</label>
                        <input id="wo" type="checkbox" v-model="match.walkover" />
                        <label for="wo">Wo</label>
                    </td>
                    <td><button type="button" @click="saveMatch(match._id, match)">Save</button></td>
                </tr>
                <tr v-for="match in qfMatches">
                    <td>{{ match.round }}</td>
                    <td>{{ match.match_no }}</td>
                    <td v-if="match.player_1 && typeof match.player_1 === 'object'"><input class="number" :placeholder="match.player_1._id"  ></td>
                    <td v-else><input class="number" type="text" v-model="match.player_1" /></td>
                    <td><input type="text" class="name" v-model="match.player_1_full_name" /></td>
                    <td><input type="number" class="number" v-model="match.player_1_rank" /></td>
                    <td><input type="number" class="number" v-model="match.player_1_seed" /></td>
                    <td>
                        <select class="number" v-model="match.player_1_status">
                            <option value="Alt">Alt</option>
                            <option value="LL">LL</option>
                            <option value="PR">PR</option>
                            <option value="Q">Q</option>
                            <option value="SE">SE</option>
                            <option value="WC">WC</option>
                        </select>
                    </td>
                    <td v-if="match.player_2 && typeof match.player_2 === 'object'"><input class="number" :placeholder="match.player_2._id"  ></td>
                    <td v-else><input class="number" type="text" v-model="match.player_2" /></td>
                    <td><input class="name" type="text" v-model="match.player_2_full_name" /></td>
                    <td><input type="number" class="number" v-model="match.player_2_rank" /></td>
                    <td><input type="number" class="number" v-model="match.player_2_seed" /></td>
                    <td>
                        <select class="number" v-model="match.player_2_status">
                            <option value="Alt">Alt</option>
                            <option value="LL">LL</option>
                            <option value="PR">PR</option>
                            <option value="Q">Q</option>
                            <option value="SE">SE</option>
                            <option value="WC">WC</option>
                        </select>
                    </td>
                    <td><input  class="number" type="number" v-model="match.winner" /></td>
                    <td><input type="text" class="number" v-model="match.winner_id" /></td>
                    <td><input class="number" type="number" v-model="match.duration_mins" /></td>
                    <td><input class="number" type="text" v-model="match.score.set1" /></td>
                    <td><input class="number" type="text" v-model="match.score.tiebreak1" /></td>
                    <td><input class="number" type="text" v-model="match.score.set2" /></td>
                    <td><input class="number" type="text" v-model="match.score.tiebreak2" /></td>
                    <td><input class="number" type="text" v-model="match.score.set3" /></td>
                    <td><input class="number" type="text" v-model="match.score.tiebreak3" /></td>
                    <td v-if="final.edition.category === 'Grand Slam'"><input class="number" type="text" v-model="match.score.set4" /></td>
                    <td v-if="final.edition.category === 'Grand Slam'"><input class="number" type="text" v-model="match.score.tiebreak4" /></td>
                    <td v-if="final.edition.category === 'Grand Slam'"><input class="number" type="text" v-model="match.score.set5" /></td>
                    <td v-if="final.edition.category === 'Grand Slam'"><input class="number" type="text" v-model="match.score.tiebreak5" /></td>
                    <td><input class="name" type="text" v-model="match.umpire" /></td>
                    <td><input type="date" class="date" v-model="match.date" /></td>
                    <td>
                        <input id="bye" type="checkbox" v-model="match.bye" />
                        <label for="bye">Bye</label>
                        <input id="ret" type="checkbox" v-model="match.retirement" />
                        <label for="ret">Ret</label>
                        <input id="def" type="checkbox" v-model="match.default" />
                        <label for="def">Def</label>
                        <input id="wo" type="checkbox" v-model="match.walkover" />
                        <label for="wo">Wo</label>
                    </td>
                    <td><button type="button" @click="saveMatch(match._id, match)">Save</button></td>
                </tr>
                <tr v-for="match in sfMatches">
                    <td>{{ match.round }}</td>
                    <td>{{ match.match_no }}</td>
                    <td v-if="match.player_1 && typeof match.player_1 === 'object'"><input class="number" :placeholder="match.player_1._id"  ></td>
                    <td v-else><input class="number" type="text" v-model="match.player_1" /></td>
                    <td><input type="text" class="name" v-model="match.player_1_full_name" /></td>
                    <td><input type="number" class="number" v-model="match.player_1_rank" /></td>
                    <td><input type="number" class="number" v-model="match.player_1_seed" /></td>
                    <td>
                        <select class="number" v-model="match.player_1_status">
                            <option value="Alt">Alt</option>
                            <option value="LL">LL</option>
                            <option value="PR">PR</option>
                            <option value="Q">Q</option>
                            <option value="SE">SE</option>
                            <option value="WC">WC</option>
                        </select>
                    </td>
                    <td v-if="match.player_2 && typeof match.player_2 === 'object'"><input class="number" :placeholder="match.player_2._id"  ></td>
                    <td v-else><input class="number" type="text" v-model="match.player_2" /></td>
                    <td><input class="name" type="text" v-model="match.player_2_full_name" /></td>
                    <td><input type="number" class="number" v-model="match.player_2_rank" /></td>
                    <td><input type="number" class="number" v-model="match.player_2_seed" /></td>
                    <td>
                        <select class="number" v-model="match.player_2_status">
                            <option value="Alt">Alt</option>
                            <option value="LL">LL</option>
                            <option value="PR">PR</option>
                            <option value="Q">Q</option>
                            <option value="SE">SE</option>
                            <option value="WC">WC</option>
                        </select>
                    </td>
                    <td><input  class="number" type="number" v-model="match.winner" /></td>
                    <td><input type="text" class="number" v-model="match.winner_id" /></td>
                    <td><input class="number" type="number" v-model="match.duration_mins" /></td>
                    <td><input class="number" type="text" v-model="match.score.set1" /></td>
                    <td><input class="number" type="text" v-model="match.score.tiebreak1" /></td>
                    <td><input class="number" type="text" v-model="match.score.set2" /></td>
                    <td><input class="number" type="text" v-model="match.score.tiebreak2" /></td>
                    <td><input class="number" type="text" v-model="match.score.set3" /></td>
                    <td><input class="number" type="text" v-model="match.score.tiebreak3" /></td>
                    <td v-if="final.edition.category === 'Grand Slam'"><input class="number" type="text" v-model="match.score.set4" /></td>
                    <td v-if="final.edition.category === 'Grand Slam'"><input class="number" type="text" v-model="match.score.tiebreak4" /></td>
                    <td v-if="final.edition.category === 'Grand Slam'"><input class="number" type="text" v-model="match.score.set5" /></td>
                    <td v-if="final.edition.category === 'Grand Slam'"><input class="number" type="text" v-model="match.score.tiebreak5" /></td>
                    <td><input class="name" type="text" v-model="match.umpire" /></td>
                    <td><input type="date" class="date" v-model="match.date" /></td>
                    <td>
                        <input id="bye" type="checkbox" v-model="match.bye" />
                        <label for="bye">Bye</label>
                        <input id="ret" type="checkbox" v-model="match.retirement" />
                        <label for="ret">Ret</label>
                        <input id="def" type="checkbox" v-model="match.default" />
                        <label for="def">Def</label>
                        <input id="wo" type="checkbox" v-model="match.walkover" />
                        <label for="wo">Wo</label>
                    </td>
                    <td><button type="button" @click="saveMatch(match._id, match)">Save</button></td>
                </tr>
                <tr v-if="final">
                    <td>{{ final.round }}</td>
                    <td>{{ final.match_no }}</td>
                    <td v-if="final.player_1 && typeof final.player_1 === 'object'"><input class="number" :placeholder="final.player_1._id"  ></td>
                    <td v-else><input class="number" type="text" v-model="final.player_1" /></td>
                    <td><input type="text" class="name" v-model="final.player_1_full_name" /></td>
                    <td><input type="number" class="number" v-model="final.player_1_rank" /></td>
                    <td><input type="number" class="number" v-model="final.player_1_seed" /></td>
                    <td>
                        <select class="number" v-model="final.player_1_status">
                            <option value="Alt">Alt</option>
                            <option value="LL">LL</option>
                            <option value="PR">PR</option>
                            <option value="Q">Q</option>
                            <option value="SE">SE</option>
                            <option value="WC">WC</option>
                        </select>
                    </td>
                    <td v-if="final.player_2 && typeof final.player_2 === 'object'"><input class="number" :placeholder="final.player_2._id"  ></td>
                    <td v-else><input class="number" type="text" v-model="final.player_2" /></td>
                    <td><input class="name" type="text" v-model="final.player_2_full_name" /></td>
                    <td><input type="number" class="number" v-model="final.player_2_rank" /></td>
                    <td><input type="number" class="number" v-model="final.player_2_seed" /></td>
                    <td>
                        <select class="number" v-model="final.player_2_status">
                            <option value="Alt">Alt</option>
                            <option value="LL">LL</option>
                            <option value="PR">PR</option>
                            <option value="Q">Q</option>
                            <option value="SE">SE</option>
                            <option value="WC">WC</option>
                        </select>
                    </td>
                    <td><input  class="number" type="number" v-model="final.winner" /></td>
                    <td><input type="text" class="number" v-model="final.winner_id" /></td>
                    <td><input class="number" type="number" v-model="final.duration_mins" /></td>
                    <td><input class="number" type="text" v-model="final.score.set1" /></td>
                    <td><input class="number" type="text" v-model="final.score.tiebreak1" /></td>
                    <td><input class="number" type="text" v-model="final.score.set2" /></td>
                    <td><input class="number" type="text" v-model="final.score.tiebreak2" /></td>
                    <td><input class="number" type="text" v-model="final.score.set3" /></td>
                    <td><input class="number" type="text" v-model="final.score.tiebreak3" /></td>
                    <td v-if="final.edition.category === 'Grand Slam'"><input class="number" type="text" v-model="final.score.set4" /></td>
                    <td v-if="final.edition.category === 'Grand Slam'"><input class="number" type="text" v-model="final.score.tiebreak4" /></td>
                    <td v-if="final.edition.category === 'Grand Slam'"><input class="number" type="text" v-model="final.score.set5" /></td>
                    <td v-if="final.edition.category === 'Grand Slam'"><input class="number" type="text" v-model="final.score.tiebreak5" /></td>
                    <td><input class="name" type="text" v-model="final.umpire" /></td>
                    <td><input type="date" class="date" v-model="final.date" /></td>
                    <td>
                        <input id="bye" type="checkbox" v-model="final.bye" />
                        <label for="bye">Bye</label>
                        <input id="ret" type="checkbox" v-model="final.retirement" />
                        <label for="ret">Ret</label>
                        <input id="def" type="checkbox" v-model="final.default" />
                        <label for="def">Def</label>
                        <input id="wo" type="checkbox" v-model="final.walkover" />
                        <label for="wo">Wo</label>
                    </td>
                    <td><button type="button" @click="saveMatch(final._id, final)">Save</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.searches {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.form-table {
    overflow-x: auto;
    width: 100vw
}

.number {
    width: 2.75rem;
    text-align: center;
}

.date {
    width: 7rem
}

.name {
    width: 7rem
}
</style>