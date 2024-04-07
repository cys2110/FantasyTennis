<script setup>
import { ref } from 'vue'
import InputNoLabel from './BaseForm/InputNoLabel.vue';
import PlayerService from '@/services/PlayerService';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSquarePlus } from '@fortawesome/pro-duotone-svg-icons'
import { countriesArray } from '@/data/ioc_countries';
import BaseInput from './BaseForm/BaseInput.vue';

const props = defineProps({
    playerProp: {
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

const player = ref(props.playerProp || {
    _id: '',
    first_name: '',
    last_name: '',
    status: {
        active: ''
    },
    country: '',
    height: {},
    coaches: [],
    preferred_surface: [],
    rank: {},
    majors: {
        ao: {
            years: []
        },
        rg: {
            years: []
        },
        wimbledon: {
            years: []
        },
        uso: {
            years: []
        },
        finals: {
            years: []
        },
        gs_cup: {
            years: []
        },
        olympics: {
            years: []
        },
        wct: {
            years: []
        },
        davis: {
            years: []
        },
        hopman: {
            years: []
        }
    }
})

const numberOfCoaches = ref(props.playerProp?.coaches.length || 1)
const noOfSurfaces = ref(props.playerProp?.preferred_surface.length || 1)

const calculateYears = (years, tournament) => {
    if (years) {
        const array = years.split(', ').map(Number)
        player.value.majors[tournament].years = array
    }
}

const handleSubmit = () => {
    if (props.edit === true) {
        editPlayer()
    } else if (props.create === true) {
        createPlayer()
    }
}

const createPlayer = () => {
    PlayerService.createPlayer(player.value)
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
}

const editPlayer = () => {
    PlayerService.editPlayer(player.value._id, player.value)
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
        <InputNoLabel v-if="create" v-model="player._id" label="ID" type="text" />
        <InputNoLabel v-model="player.first_name" label="First name" type="text" />
        <InputNoLabel v-model="player.last_name" label="Last name" type="text" />
        <select v-model="player.status.active">
            <option disabled defaultValue value="">Status</option>
            <option :value="true">Active</option>
            <option :value="false">Retired</option>
        </select>
        <InputNoLabel v-model="player.status.turned_pro" label="Year turned pro" type="number" />
        <InputNoLabel v-model="player.status.retired" label="Year retired" type="number" />
        <select v-model="player.country">
            <option disabled defaultValue value="">Representation</option>
            <option v-for="(value, key) in countriesArray" :key="key" :value="key">{{ value }}</option>
            <option value="YUG">Yugoslavia</option>
            <option value="SCG">Serbia & Montenegro</option>
            <option value="URS">USSR</option>
            <option value="TCH">Czechoslovakia</option>
        </select>
        <div>This field is only required if player changed country representations.</div>
        <InputNoLabel v-model="player.country_yr" label="Year started representing country" type="number" />
        <select v-model="player.prev_country">
            <option disabled defaultValue value="">Previous representation</option>
            <option v-for="(value, key) in countriesArray" :key="key" :value="key">{{ value }}</option>
            <option value="YUG">Yugoslavia</option>
            <option value="SCG">Serbia & Montenegro</option>
            <option value="URS">USSR</option>
            <option value="TCH">Czechoslovakia</option>
        </select>
        <div>This field is only required if player changed country representations multiple times.</div>
        <InputNoLabel v-model="player.prev_country_yr" label="Year started representing previous country" type="number" />
        <BaseInput v-model="player.dob" label="Date of birth" type="date" />
        <select v-model="player.right_handed">
            <option disabled defaultValue value="">Plays</option>
            <option :value="true">Right-handed</option>
            <option :value="false">Left-handed</option>
        </select>
        <InputNoLabel v-model="player.height.cm" label="Height (cm)" type="number" />
        <InputNoLabel v-model="player.height.ft" label="Height (ft)" type="text" />
        <InputNoLabel v-for="(_, index) in numberOfCoaches" v-model="player.coaches[index]" label="Coach" type="text" />
        <FontAwesomeIcon :icon="faSquarePlus" @click="numberOfCoaches++" />
        <select v-for="(_, index) in noOfSurfaces" v-model="player.preferred_surface[index]">
            <option disabled defaultValue value="">Preferred surface</option>
            <option value="clay">Clay</option>
            <option value="grass">Grass</option>
            <option value="hard">Hard</option>
        </select>
        <FontAwesomeIcon :icon="faSquarePlus" @click="noOfSurfaces++" />
        <InputNoLabel v-model="player.age_started" label="Age started" type="number" />
        <InputNoLabel v-model="player.rank.career_high" label="Career high" type="number" />
        <InputNoLabel v-model="player.rank.date" label="Achieved on" type="date" />
        <InputNoLabel v-model="player.pm_USD" label="Prize money (USD)" type="number" />
        <InputNoLabel v-model="player.titles" label="No. of titles" type="number" />
        <fieldset>
            <legend>Win-loss</legend>
            <input v-model="player.win" type="number" placeholder="W" />
            <input v-model="player.loss" type="number" placeholder="L" />
        </fieldset>
        <select v-model="player.gladiator">
            <option disabled defaultValue value="">Gladiator</option>
            <option :value="true">True</option>
            <option :value="false">False</option>
        </select>
        <select v-model="player.headshot">
            <option disabled defaultValue value="">Headshot</option>
            <option :value="true">True</option>
            <option :value="false">False</option>
        </select>

        <table>
            <thead>
                <tr>
                    <th>Tournament</th>
                    <th>Round</th>
                    <th>Years</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Australian Open</td>
                    <td>
                        <select v-model="player.majors.ao.round">
                            <option disabled defaultValue value="">Round</option>
                            <option value="1st round">1st round</option>
                            <option value="2nd round">2nd round</option>
                            <option value="3rd round">3rd round</option>
                            <option value="4th round">4th round</option>
                            <option value="Quarterfinals">Quarterfinals</option>
                            <option value="Semifinals">Semifinals</option>
                            <option value="Final">Final</option>
                            <option value="Win">Win</option>
                        </select>
                    </td>
                    <td><InputNoLabel v-model="player.majors.ao.years" label="Years achieved" type="text" @change="calculateYears($event.target.value, 'ao')" /></td>
                </tr>
                <tr>
                    <td>Roland Garros</td>
                    <td>
                        <select v-model="player.majors.rg.round">
                            <option disabled defaultValue value="">Round</option>
                            <option value="1st round">1st round</option>
                            <option value="2nd round">2nd round</option>
                            <option value="3rd round">3rd round</option>
                            <option value="4th round">4th round</option>
                            <option value="Quarterfinals">Quarterfinals</option>
                            <option value="Semifinals">Semifinals</option>
                            <option value="Final">Final</option>
                            <option value="Win">Win</option>
                        </select>
                    </td>
                    <td><InputNoLabel v-model="player.majors.rg.years" label="Years achieved" type="text" @change="calculateYears($event.target.value, 'rg')" /></td>
                </tr>
                <tr>
                    <td>Wimbledon</td>
                    <td>
                        <select v-model="player.majors.wimbledon.round">
                            <option disabled defaultValue value="">Round</option>
                            <option value="1st round">1st round</option>
                            <option value="2nd round">2nd round</option>
                            <option value="3rd round">3rd round</option>
                            <option value="4th round">4th round</option>
                            <option value="Quarterfinals">Quarterfinals</option>
                            <option value="Semifinals">Semifinals</option>
                            <option value="Final">Final</option>
                            <option value="Win">Win</option>
                        </select>
                    </td>
                    <td><InputNoLabel v-model="player.majors.wimbledon.years" label="Years achieved" type="text" @change="calculateYears($event.target.value, 'wimbledon')" /></td>
                </tr>
                <tr>
                    <td>US Open</td>
                    <td>
                        <select v-model="player.majors.uso.round">
                            <option disabled defaultValue value="">Round</option>
                            <option value="1st round">1st round</option>
                            <option value="2nd round">2nd round</option>
                            <option value="3rd round">3rd round</option>
                            <option value="4th round">4th round</option>
                            <option value="Quarterfinals">Quarterfinals</option>
                            <option value="Semifinals">Semifinals</option>
                            <option value="Final">Final</option>
                            <option value="Win">Win</option>
                        </select>
                    </td>
                    <td><InputNoLabel v-model="player.majors.uso.years" label="Years achieved" type="text" @change="calculateYears($event.target.value, 'uso')" /></td>
                </tr>
                <tr>
                    <td>Year end finals</td>
                    <td>
                        <select v-model="player.majors.finals.round">
                            <option disabled defaultValue value="">Round</option>
                            <option value="1st round">1st round</option>
                            <option value="2nd round">2nd round</option>
                            <option value="3rd round">3rd round</option>
                            <option value="4th round">4th round</option>
                            <option value="Quarterfinals">Quarterfinals</option>
                            <option value="Semifinals">Semifinals</option>
                            <option value="Final">Final</option>
                            <option value="Win">Win</option>
                        </select>
                    </td>
                    <td><InputNoLabel v-model="player.majors.finals.years" label="Years achieved" type="text" @change="calculateYears($event.target.value, 'finals')" /></td>
                </tr>
                <tr>
                    <td>Grand Slam Cup</td>
                    <td>
                        <select v-model="player.majors.gs_cup.round">
                            <option disabled defaultValue value="">Round</option>
                            <option value="1st round">1st round</option>
                            <option value="2nd round">2nd round</option>
                            <option value="3rd round">3rd round</option>
                            <option value="4th round">4th round</option>
                            <option value="Quarterfinals">Quarterfinals</option>
                            <option value="Semifinals">Semifinals</option>
                            <option value="Final">Final</option>
                            <option value="Win">Win</option>
                        </select>
                    </td>
                    <td><InputNoLabel v-model="player.majors.gs_cup.years" label="Years achieved" type="text" @change="calculateYears($event.target.value, 'gs_cup')" /></td>
                </tr>
                <tr>
                    <td>Olympics</td>
                    <td>
                        <select v-model="player.majors.olympics.round">
                            <option disabled defaultValue value="">Round</option>
                            <option value="1st round">1st round</option>
                            <option value="2nd round">2nd round</option>
                            <option value="3rd round">3rd round</option>
                            <option value="4th round">4th round</option>
                            <option value="Quarterfinals">Quarterfinals</option>
                            <option value="Semifinals">Semifinals</option>
                            <option value="Final">Final</option>
                            <option value="Win">Win</option>
                        </select>
                    </td>
                    <td><InputNoLabel v-model="player.majors.olympics.years" label="Years achieved" type="text" @change="calculateYears($event.target.value, 'olympics')" /></td>
                </tr>
                <tr>
                    <td>WCT Finals</td>
                    <td>
                        <select v-model="player.majors.wct.round">
                            <option disabled defaultValue value="">Round</option>
                            <option value="1st round">1st round</option>
                            <option value="2nd round">2nd round</option>
                            <option value="3rd round">3rd round</option>
                            <option value="4th round">4th round</option>
                            <option value="Quarterfinals">Quarterfinals</option>
                            <option value="Semifinals">Semifinals</option>
                            <option value="Final">Final</option>
                            <option value="Win">Win</option>
                        </select>
                    </td>
                    <td><InputNoLabel v-model="player.majors.wct.years" label="Years achieved" type="text" @change="calculateYears($event.target.value, 'wct')" /></td>
                </tr>
                <tr>
                    <td>Davis Cup</td>
                    <td>
                        <select v-model="player.majors.davis.round">
                            <option disabled defaultValue value="">Round</option>
                            <option value="1st round">1st round</option>
                            <option value="2nd round">2nd round</option>
                            <option value="3rd round">3rd round</option>
                            <option value="4th round">4th round</option>
                            <option value="Quarterfinals">Quarterfinals</option>
                            <option value="Semifinals">Semifinals</option>
                            <option value="Final">Final</option>
                            <option value="Win">Win</option>
                        </select>
                    </td>
                    <td><InputNoLabel v-model="player.majors.davis.years" label="Years achieved" type="text" @change="calculateYears($event.target.value, 'davis')" /></td>
                </tr>
                <tr>
                    <td>Hopman Cup</td>
                    <td>
                        <select v-model="player.majors.hopman.round">
                            <option disabled defaultValue value="">Round</option>
                            <option value="1st round">1st round</option>
                            <option value="2nd round">2nd round</option>
                            <option value="3rd round">3rd round</option>
                            <option value="4th round">4th round</option>
                            <option value="Quarterfinals">Quarterfinals</option>
                            <option value="Semifinals">Semifinals</option>
                            <option value="Final">Final</option>
                            <option value="Win">Win</option>
                        </select>
                    </td>
                    <td><InputNoLabel v-model="player.majors.hopman.years" label="Years achieved" type="text" @change="calculateYears($event.target.value, 'hopman')" /></td>
                </tr>
            </tbody>
        </table>
        <button type="submit">Submit</button>
    </form>
</template>

<style scoped>
form {
    display: flex;
    flex-direction: column;
    width: 50%;
}
</style>