<script setup>
import EditionService from '@/services/EditionService';
import { ref } from 'vue'
import InputNoLabel from './BaseForm/InputNoLabel.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSquarePlus } from '@fortawesome/pro-duotone-svg-icons'
import { countriesArray } from '@/data/ioc_countries';
import MatchScore from '@/services/MatchScore';

const props=defineProps({
    editionProp: {
        required: false
    },
    edit: {
        type: Boolean,
        required: false
    },
    create: {
        type: Boolean,
        required: false
    }
})

const edition = ref(props.editionProp || {
    _id: '',
    tourney: '',
    year: '',
    start_date: '',
    end_date: '',
    category: '',
    supervisors: [],
    type_of_draw: 32,
    location: {
        city: '',
        country: ''
    },
    surface: {
        environment: '',
        type: ''
    },
    awards: {
        winner: {
        },
        finalist: {
        },
        semifinalist: {
        },
        quarterfinalist: {
        },
        round4: {
        },
        round3: {
        },
        round2: {
        },
        round1: {
        }
    },
    seeds: Array(noOfSeeds.value).fill(null).map(() => ({})),
    entry_info: {
        lda: {
        },
        lls: [],
        alts: [],
        wds: Array(noOfWds.value).fill(null).map(() => ({})),
        rets: Array(noOfRets.value).fill(null).map(() => ({})),
        wos: Array(noOfWos.value).fill(null).map(() => ({}))
    }
})

const r128Matches = Array(64).fill(null).map((_, index) => ({
    edition: edition.value._id,
    round: 'R128',
    match_no: index + 1
}))

const r64Matches = Array(32).fill(null).map((_, index) => ({
    edition: edition.value._id,
    round: 'R64',
    match_no: index = 1
}))

const r32Matches = Array(16).fill(null).map((_, index) => ({
    edition: edition.value._id,
    round: 'R32',
    match_no: index = 1
}))

const r16Matches = Array(8).fill(null).map((_, index) => ({
    edition: edition.value._id,
    round: 'R16',
    match_no: index = 1
}))

const qfMatches = Array(4).fill(null).map((_, index) => ({
    edition: edition.value._id,
    round: 'QF',
    match_no: index = 1
}))

const sfMatches = Array(32).fill(null).map((_, index) => ({
    edition: edition.value._id,
    round: 'SF',
    match_no: index = 1
}))

const final = {
    edition: edition.value._id,
    round: 'F'
}

const noOfSeeds = ref(props.editionProp.seeds.length > 0 ? props.editionProp.seeds.length : edition.value.type_of_draw / 4)
const noOfSupervisors = ref(props.editionProp.supervisors.length > 0 ? props.editionProp.supervisors.length : 1)
const noOfLLs = ref(props.editionProp.lls.length > 0 ? props.editionProp.lls.length : 1)
const noOfAlts = ref(props.editionProp.alts.length > 0 ? props.editionProp.alts.length : 1)
const noOfWds = ref(props.editionProp.wds.length > 0 ? props.editionProp.wds.length : 1)
const noOfRets = ref(props.editionProp.rets.length > 0 ? props.editionProp.rets.length : 1)
const noOfWos = ref(props.editionProp.wos.length > 0 ? props.editionProp.wos.length : 1)

const handleSubmit = () => {
    if (props.edit === true) {
        editEdition()
    } else if (props.create === true) {
        createEdition()
    }
}

const createEdition = () => {
    EditionService.createEdition(edition.value)
        .then((response) => {
            console.log(response)
            let matches
            if (edition.value.type_of_draw === 128) {
                matches = [r128Matches, r64Matches, r32Matches, r16Matches, qfMatches, sfMatches, final]
            } else if (edition.value.type_of_draw === 64) {
                matches = [r64Matches, r32Matches, r16Matches, qfMatches, sfMatches, final]
            } else {
                matches = [r32Matches, r16Matches, qfMatches, sfMatches, final]
            }
            for (let i=0; i < matches.length; i++) {
                MatchScore.createMatch(matches[i])
                .then((response) => {
                    console.log(response)
                })
                .catch((error) => {
                    console.log(error)
                })
            }
        })
        .catch((error) => {
            console.log(error)
        })
}

const editEdition = () => {
    EditionService.editEdition(edition.value._id, edition.value)
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
}
</script>

<template>
    <form @submit.prevent="handleSubmit">
        <InputNoLabel v-if="create" type="number" label="ID" v-model="edition._id" />
        <InputNoLabel type="text" label="Tournament" v-model="edition.tourney" />
        <InputNoLabel type="number" label="Year" v-model="edition.year" />
        <InputNoLabel type="text" label="Sponsored name" v-model="edition.sponsor_name" />
        <fieldset>
            <legend>Dates</legend>
            <InputNoLabel type="date" label="Start date" v-model="edition.start_date" /> - <InputNoLabel type="date" label="End date" v-model="edition.end_date" />
        </fieldset>
        <select v-model="edition.category">
            <option disabled defaultValue value="">Category</option>
            <option value="ATP 250">ATP 250</option>
            <option value="ATP 500">ATP 500</option>
            <option value="ATP Masters 1000">ATP Masters 1000</option>
            <option value="Grand Slam">Grand Slam</option>
        </select>
        <select v-model="edition.currency">
            <option disabled defaultValue value="">Currency</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="AUD">AUD</option>
            <option value="GBP">GBP</option>
        </select>
        <InputNoLabel v-for="(_, index) in noOfSupervisors" type="text" label="Supervisor" v-model="edition.supervisors[index]" />
        <FontAwesomeIcon :icon="faSquarePlus" @click="noOfSupervisors++" />
        <InputNoLabel type="number" label="Number of entries in draw" v-model="edition.type_of_draw" />
        <InputNoLabel type="text" label="Venue" v-model="edition.location.venue" />
        <InputNoLabel type="text" label="City" v-model="edition.location.city" />
        <select v-model="edition.location.country">
            <option disabled defaultValue value="">Representation</option>
            <option v-for="(value, key) in countriesArray" :key="key" :value="key">{{ value }}</option>
            <option value="YUG">Yugoslavia</option>
            <option value="SCG">Serbia & Montenegro</option>
            <option value="URS">USSR</option>
            <option value="TCH">Czechoslovakia</option>
        </select>
        <fieldset>
            <legend>Surface</legend>
            <select v-model="edition.surface.environment">
                <option disabled defaultValue value="">Environment</option>
                <option value="indoor">Indoor</option>
                <option value="outdoor">Outdoor</option>
            </select>
            <select v-model="edition.surface.type">
                <option disabled defaultValue value="">Type</option>
                <option value="hard">Hard</option>
                <option value="clay">Clay</option>
                <option value="grass">Grass</option>
                <option value="carpet">Carpet</option>
            </select>
            <select v-model="edition.surface.hard_type">
                <option disabled defaultValue value="">Type of hard court</option>
                <option value="acrylic on wood">Acrylic on wood</option>
                <option value="greenset">Greenset</option>
                <option value="laykold">Laykold</option>
                <option value="plexicushion">Plexicushion</option>
                <option value="plexipave">Plexipave</option>
                <option value="rebound ace">Rebound ace</option>
            </select>
        </fieldset>
        <InputNoLabel type="text" label="Winner" v-model="edition.winner" />
        <InputNoLabel type="text" label="Finalist" v-model="edition.finalist" />
        <InputNoLabel type="text" label="Final score" v-model="edition.final_score" />

        <table>
            <thead>
                <tr>
                    <th>Round</th>
                    <th>Prize money</th>
                    <th>Points</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Winner</td>
                    <td><InputNoLabel type="number" label="PM" v-model="edition.awards.winner.prize_money" /></td>
                    <td><InputNoLabel type="number" label="Pts" v-model="edition.awards.winner.points" /></td>
                </tr>
                <tr>
                    <td>Finalist</td>
                    <td><InputNoLabel type="number" label="PM" v-model="edition.awards.finalist.prize_money" /></td>
                    <td><InputNoLabel type="number" label="Pts" v-model="edition.awards.finalist.points" /></td>
                </tr>
                <tr>
                    <td>Semifinalist</td>
                    <td><InputNoLabel type="number" label="PM" v-model="edition.awards.semifinalist.prize_money" /></td>
                    <td><InputNoLabel type="number" label="Pts" v-model="edition.awards.semifinalist.points" /></td>
                </tr>
                <tr>
                    <td>Quarterfinalist</td>
                    <td><InputNoLabel type="number" label="PM" v-model="edition.awards.quarterfinalist.prize_money" /></td>
                    <td><InputNoLabel type="number" label="Pts" v-model="edition.awards.quarterfinalist.points" /></td>
                </tr>
                <tr>
                    <td>4th round</td>
                    <td><InputNoLabel type="number" label="PM" v-model="edition.awards.round4.prize_money" /></td>
                    <td><InputNoLabel type="number" label="Pts" v-model="edition.awards.round4.points" /></td>
                </tr>
                <tr>
                    <td>3rd round</td>
                    <td><InputNoLabel type="number" label="PM" v-model="edition.awards.round3.prize_money" /></td>
                    <td><InputNoLabel type="number" label="Pts" v-model="edition.awards.round3.points" /></td>
                </tr>
                <tr>
                    <td>2nd round</td>
                    <td><InputNoLabel type="number" label="PM" v-model="edition.awards.round2.prize_money" /></td>
                    <td><InputNoLabel type="number" label="Pts" v-model="edition.awards.round2.points" /></td>
                </tr>
                <tr>
                    <td>1st round</td>
                    <td><InputNoLabel type="number" label="PM" v-model="edition.awards.round1.prize_money" /></td>
                    <td><InputNoLabel type="number" label="Pts" v-model="edition.awards.round1.points" /></td>
                </tr>
            </tbody>
        </table>

        <table>
            <thead>
                <tr>
                    <th>Seed</th>
                    <th>Player</th>
                    <th>Rank</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(_, index in noOfSeeds)">
                    <td>{{ index + 1 }}</td>
                    <td><InputNoLabel type="text" label="Player" v-model="edition.seeds[index].player" /></td>
                    <td><InputNoLabel type="number" label="Rank" v-model="edition.seeds[index].rank" /></td>
                </tr>
            </tbody>
        </table>

        <table>
            <thead>
                <tr>
                    <th>Entry info</th>
                    <th>Player</th>
                    <th>Reason</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Last direct acceptance</td>
                    <td><InputNoLabel type="text" label="Player" v-model="edition.entry_info.lda.player" /></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr v-for="(_, index) in noOfLLs">
                    <td>Lucky loser</td>
                    <td><InputNoLabel type="text" label="Player" v-model="edition.entry_info.lls[index]" /></td>
                    <td></td>
                    <td><FontAwesomeIcon :icon="faSquarePlus" @click="noOfLLs++" /></td>
                </tr>
                <tr v-for="(_, index) in noOfAlts">
                    <td>Alternates</td>
                    <td><InputNoLabel type="text" label="Player" v-model="edition.entry_info.alts[index]" /></td>
                    <td></td>
                    <td><FontAwesomeIcon :icon="faSquarePlus" @click="noOfAlts++" /></td>
                </tr>
                <tr v-for="(_, index) in noOfWds">
                    <td>Withdrawals</td>
                    <td><InputNoLabel type="text" label="Player" v-model="edition.entry_info.wds[index].player" /></td>
                    <td><InputNoLabel type="text" label="Reason" v-model="edition.entry_info.wds[index].reason" /></td>
                    <td><FontAwesomeIcon :icon="faSquarePlus" @click="noOfWds++" /></td>
                </tr>
                <tr v-for="(_, index) in noOfRets">
                    <td>Retirements</td>
                    <td><InputNoLabel type="text" label="Player" v-model="edition.entry_info.rets[index].player" /></td>
                    <td><InputNoLabel type="text" label="Reason" v-model="edition.entry_info.rets[index].reason" /></td>
                    <td><FontAwesomeIcon :icon="faSquarePlus" @click="noOfRets++" /></td>
                </tr>
                <tr v-for="(_, index) in noOfWos">
                    <td>Walkovers</td>
                    <td><InputNoLabel type="text" label="Player" v-model="edition.entry_info.wos[index].player" /></td>
                    <td><InputNoLabel type="text" label="Reason" v-model="edition.entry_info.wos[index].reason" /></td>
                    <td><FontAwesomeIcon :icon="faSquarePlus" @click="noOfWos++" /></td>
                </tr>
            </tbody>
        </table>
    </form>
</template>