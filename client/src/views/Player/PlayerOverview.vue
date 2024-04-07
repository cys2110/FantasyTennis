<script setup>
import { computed } from 'vue';

const props = defineProps({
    player: {
        type: Object,
        required: true
    }
})

const yearsActive = computed(() => {
    if (props.player.status.retired) {
        return `${props.player.status.turned_pro} - ${props.player.status.retired}`
    } else {
        return `${props.player.status.turned_pro} - present`
    }
})

const dob = computed(() => {
    const options = {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }
    return new Date(props.player.dob).toLocaleDateString('en-gb', options)
})

const rh = computed(() => {
    if (props.player.right_handed) {
        return 'Right-handed'
    } else {
        return 'Left-handed'
    }
})

const bh = computed(() => {
    if (props.player.backhand === 1) {
        return 'One-handed'
    } else {
        return 'Two-handed'
    }
})

const joinArray = (array) => {
    return array.join(', ')
}

const height = computed(() => {
    return `${props.player.height.cm} cm (${props.player.height.ft})`
})
</script>

<template>
    <div class="player-overview-wrapper">
        <div class="details-container">
            <div class="details-column">
                <div class="detail" v-if="player.status.turned_pro">
                    <span>Years active</span>
                    <span>{{ yearsActive }}</span>
                </div>
                <div class="detail" v-if="player.dob">
                    <span>Date of birth</span>
                    <span>{{ dob }}</span>
                </div>
                <div class="detail" v-if="player.height">
                    <span>Height</span>
                    <span>{{ height }}</span>
                </div>
                <div class="detail" v-if="player.preferred_surface.length > 0">
                    <span v-if="player.preferred_surface.length === 1">Preferred surface</span><span v-else>Preferred surfaces</span>
                    <span>{{ joinArray(player.preferred_surface) }}</span>
                </div>
            </div>
            <div class="details-column">
                <div class="detail" v-if="player.right_handed || player.right_handed === false">
                    <span>Plays</span>
                    <span>{{ rh }}</span>
                </div>
                <div class="detail" v-if="player.backhand">
                    <span>Backhand</span>
                    <span>{{ bh }}</span>
                </div>
                <div class="detail" v-if="player.coaches.length > 0">
                    <span v-if="player.coaches.length === 1">Coach</span><span v-else>Coaches</span>
                    <span>{{ joinArray(player.coaches) }}</span>
                </div>
                <div class="detail" v-if="player.age_started">
                    <span>Age started</span>
                    <span>{{ player.age_started }}</span>
                </div>
            </div>
        </div>
        <div class="major-table">
            <table>
                <thead>
                    <tr>
                        <th>Major</th>
                        <th>Best result</th>
                        <th>Year(s) achieved</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="player.majors.ao.years.length > 0">
                        <td>Australian Open</td>
                        <td>{{ player.majors.ao.round }}</td>
                        <td>{{ joinArray(player.majors.ao.years) }}</td>
                    </tr>
                    <tr v-if="player.majors.rg.years.length > 0">
                        <td>Roland Garros</td>
                        <td>{{ player.majors.rg.round }}</td>
                        <td>{{ joinArray(player.majors.rg.years) }}</td>
                    </tr>
                    <tr v-if="player.majors.wimbledon.years.length > 0">
                        <td>Wimbledon</td>
                        <td>{{ player.majors.wimbledon.round }}</td>
                        <td>{{ joinArray(player.majors.wimbledon.years) }}</td>
                    </tr>
                    <tr v-if="player.majors.uso.years.length > 0">
                        <td>US Open</td>
                        <td>{{ player.majors.uso.round }}</td>
                        <td>{{ joinArray(player.majors.uso.years) }}</td>
                    </tr>
                    <tr v-if="player.majors.finals.years.length > 0">
                        <td>Year-end Finals</td>
                        <td>{{ player.majors.finals.round }}</td>
                        <td>{{ joinArray(player.majors.finals.years) }}</td>
                    </tr>
                    <tr v-if="player.majors.olympics.years.length > 0">
                        <td>Olympics</td>
                        <td>{{ player.majors.olympics.round }}</td>
                        <td>{{ joinArray(player.majors.olympics.years) }}</td>
                    </tr>
                    <tr v-if="player.majors.davis.years.length > 0">
                        <td>Davis Cup</td>
                        <td>{{ player.majors.davis.round }}</td>
                        <td>{{ joinArray(player.majors.davis.years) }}</td>
                    </tr>
                    <tr v-if="player.majors.hopman.years.length > 0">
                        <td>Hopman Cup</td>
                        <td>{{ player.majors.hopman.round }}</td>
                        <td>{{ joinArray(player.majors.hopman.years) }}</td>
                    </tr>
                    <tr v-if="player.majors.gs_cup.years.length > 0">
                        <td>Grand Slam Cup</td>
                        <td>{{ player.majors.gs_cup.round }}</td>
                        <td>{{ joinArray(player.majors.gs_cup.years) }}</td>
                    </tr>
                    <tr v-if="player.majors.wct.years.length > 0">
                        <td>WCT Finals</td>
                        <td>{{ player.majors.wct.round }}</td>
                        <td>{{ joinArray(player.majors.wct.years) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>

.player-overview-wrapper {
    display: flex;
    flex-direction: column;
}

.details-container {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin-top: 20px;
}

.details-column {
    display: flex;
    flex-direction: column;
    width: 50%;
}

.detail {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top: 6px;
    padding-bottom: 6px;
    padding-left: 15px;
    padding-right: 15px;
    margin: 10px;
    background-color: var(--color-background-mute);
    border-radius: 15px;
}

.major-table {
    align-self: center;
    margin-top: 3rem;
}

table {
    border-collapse: collapse;
    border-radius: 20px;
}

thead {
    background-color: var(--color-background-mute);
    border-radius: 20px;
    border-top: 1px solid var(--color-border);
    border-bottom: 1px solid var(--color-border);
}

th {
    border: none;
    padding-right: 1rem;
    padding-left: 1rem;
}

td {
    padding: 5px;
    padding-left: 1rem;
    padding-right: 1rem;
}
</style>