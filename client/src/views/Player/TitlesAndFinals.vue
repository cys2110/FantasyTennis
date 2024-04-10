<script setup>
import EditionService from '@/services/EditionService';
import { onMounted, ref } from 'vue';
import { groupObjectsByKey } from '@/components/utils';

const props = defineProps({
    player: {
        required: true
    }
})

const wins = ref(null)
const finals = ref(null)
const selection = ref('Titles')
const titlesByYear = ref({})
const finalsByYear = ref({})

onMounted(() => {
    EditionService.getEditionByPlayer(props.player._id)
    .then((response) => {
        if (response.data.wins.length > 0) {
            wins.value = response.data.wins
            if (wins.value.length > 0) {
                titlesByYear.value = groupObjectsByKey(wins.value, 'year')
            }
        }
        if (response.data.finals.length > 0) {
            finals.value = response.data.finals
            if (finals.value ) {
                finalsByYear.value = groupObjectsByKey(finals.value, 'year')
            }
        }
    })
    .catch(error => console.log(error))
})
</script>

<template>
    <div class="container">
        <div class="dropdown">
            <select v-model="selection" class="dropdown-selection">
                <option value="Titles">Titles</option>
                <option value="Finals">Finals</option>
            </select>
        </div>
        <div v-if="selection === 'Titles'">
            <table v-if="wins">
                <thead>
                    <tr>
                        <th>Year</th>
                        <th>No. of titles</th>
                        <th>Tournaments</th>
                        <th>Surface</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="year in titlesByYear">
                        <td>{{ year[0].year }}</td>
                        <td>{{ year.length }}</td>
                        <td class="column"><div v-for="tournament in year" ><span v-if="tournament.sponsor_name" >{{ tournament.sponsor_name }} | </span><span>{{ tournament.tourney.name }}</span></div></td>
                        <td class="column"><div v-for="tournament in year"  class="capitalise" ><span>{{ tournament.surface.environment }} {{ tournament.surface.type }}</span><span v-if="tournament.surface.hard_type"> ({{ tournament.surface.hard_type }})</span></div></td>
                    </tr>
                </tbody>
            </table>
            <div v-else>None</div>
        </div>
        <div v-if="selection === 'Finals'">
            <table v-if="finals">
                <thead>
                    <tr>
                        <th>Year</th>
                        <th>No. of finals</th>
                        <th>Tournaments</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="year in finalsByYear">
                        <td>{{ year[0].year }}</td>
                        <td>{{ year.length }}</td>
                        <td class="column"><div v-for="tournament in year" ><span v-if="tournament.sponsor_name" >{{ tournament.sponsor_name }} | </span><span>{{ tournament.tourney.name }}</span></div></td>
                        <td class="column"><div v-for="tournament in year"  class="capitalise" ><span>{{ tournament.surface.environment }} {{ tournament.surface.type }}</span><span v-if="tournament.surface.hard_type"> ({{ tournament.surface.hard_type }})</span></div></td>
                    </tr>
                </tbody>
            </table>
            <div v-else>None</div>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
}

.dropdown {
    margin-left: auto;
}

.dropdown-selection {
    background-color: transparent;
    color: var(--color-text);
    padding: 0.25rem;
    border-radius: 1rem;
    border: 2px solid var(--vt-c-box-border);
}

.capitalise {
    text-transform: capitalize;
}

th, td {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
}
</style>