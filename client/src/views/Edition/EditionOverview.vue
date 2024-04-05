<script setup>
import { computed } from 'vue';
import { headshot, formatCurrency } from '../../components/utils'
import { flagSrc, capitalise } from '../../components/utils';
import { useRouter } from 'vue-router';

const props = defineProps({
    edition: {
        type: Object,
        required: true
    }
})

const router = useRouter()

const withdrawnSeed = (player) => {
    if (props.edition.entry_info.wds.some(entry => entry.player._id === player._id)) {
        return true
    } else {
        return false
    }
}

const withdrawnRank = (player) => {
    if (props.edition.entry_info.wds.some(entry => entry.player._id === player.player._id)) {
        return `<strike>${player.rank}</strike>`
    } else {
        return player.rank
    }
}

const navigate = (player) => {
    router.push({name: 'PlayerLayout', params: { id: player}})
}

const environment = computed(() => {
    const formattedEnvironment = props.edition.surface.environment
    return formattedEnvironment.charAt(0).toUpperCase() + formattedEnvironment.slice(1)
})

const supervisors = computed(() => {
    return props.edition.supervisors.join(', ')
})

</script>

<template>
    <div class="view-container">
        <div class="details-container">
            <div class="details-column">
                <div class="detail" v-if="edition.location.venue"><span>Venue</span><span>{{ edition.location.venue }}</span></div>
                <div class="detail"><span>City</span><span>{{ edition.location.city }}</span></div>
                <div class="detail" v-if="edition.surface"><span>Surface</span><span>{{ environment }} {{ edition.surface.type }}<span v-if="edition.surface.hard_type"> ({{ edition.surface.hard_type }})</span></span></div>
            </div>
            <div class="details-column">
                <div class="detail" v-if="edition.prize_money"><span>Prize money</span><span>{{ formatCurrency(edition.currency, edition.prize_money) }}</span></div>
                <div class="detail" v-if="edition.tfc"><span>Total financial commitment</span><span>{{ formatCurrency(edition.currency, edition.tfc) }}</span></div>
                <div class="detail" v-if="edition.supervisors"><span>Supervisors</span><span>{{ supervisors }}</span></div>
            </div>
        </div>
        <div class="cards-container">
            <div class="card-container">
                <div class="edition-card" v-if="edition.seeds.length > 0">
                    <table>
                        <thead>
                            <tr>
                                <th>Seed</th>
                                <th colspan="3">Player</th>
                                <th>Rank</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="player in edition.seeds" :key="player._id">
                                <td class="centred">{{ player.seed }}</td>
                                <td><img class="headshot" v-if="player.player.headshot" :src="headshot(player.player._id)" @click="navigate(player.player._id)" /></td>
                                <td><img class="mini-flag" :src="flagSrc(player.player.country)" /></td>
                                <td>
                                    <span v-if="withdrawnSeed(player.player)" class="strikethrough"><RouterLink class="hover-link" :to="{name: 'PlayerLayout', params: {id: player.player._id}}">{{ player.player.full_name }}</RouterLink></span>
                                    <span v-else><RouterLink class="hover-link" :to="{name: 'PlayerLayout', params: {id: player.player._id}}">{{ player.player.full_name }}</RouterLink></span>
                                </td>
                                <td v-html="withdrawnRank(player)" class="centred" ></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="card-container">
                <div class="edition-card" v-if="edition.awards">
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Prize money</th>
                                <th>Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>WINNER</td>
                                <td class="centred">{{ formatCurrency(edition.currency, edition.awards.winner.prize_money) }}</td>
                                <td class="centred">{{ edition.awards.winner.points }}</td>
                            </tr>
                            <tr>
                                <td>FINALIST</td>
                                <td class="centred">{{ formatCurrency(edition.currency, edition.awards.finalist.prize_money) }}</td>
                                <td class="centred">{{ edition.awards.finalist.points }}</td>
                            </tr>
                            <tr>
                                <td>SEMIFINALIST</td>
                                <td class="centred">{{ formatCurrency(edition.currency, edition.awards.semifinalist.prize_money) }}</td>
                                <td class="centred">{{ edition.awards.semifinalist.points }}</td>
                            </tr>
                            <tr>
                                <td>QUARTERFINALIST</td>
                                <td class="centred">{{ formatCurrency(edition.currency, edition.awards.quarterfinalist.prize_money) }}</td>
                                <td class="centred">{{ edition.awards.quarterfinalist.points }}</td>
                            </tr>
                            <tr v-if="edition.awards.round4">
                                <td>4TH ROUND</td>
                                <td class="centred">{{ formatCurrency(edition.currency, edition.awards.round4.prize_money) }}</td>
                                <td class="centred">{{ edition.awards.round4.points }}</td>
                            </tr>
                            <tr v-if="edition.awards.round3">
                                <td>3RD ROUND</td>
                                <td class="centred">{{ formatCurrency(edition.currency, edition.awards.round3.prize_money) }}</td>
                                <td class="centred">{{ edition.awards.round3.points }}</td>
                            </tr>
                            <tr>
                                <td>2ND ROUND</td>
                                <td class="centred">{{ formatCurrency(edition.currency, edition.awards.round2.prize_money) }}</td>
                                <td class="centred">{{ edition.awards.round2.points }}</td>
                            </tr>
                            <tr>
                                <td>1ST ROUND</td>
                                <td class="centred">{{ formatCurrency(edition.currency, edition.awards.round1.prize_money) }}</td>
                                <td class="centred">{{ edition.awards.round1.points }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="edition-card">
                    <table>
                        <thead v-if="edition.entry_info.lda">
                            <tr>
                                <th colspan="4">Last direct acceptance</th>
                            </tr>
                        </thead>
                        <tbody v-if="edition.entry_info.lda">
                            <tr>
                                <td><img v-if="edition.entry_info.lda.player.headshot" :src="headshot(edition.entry_info.lda.player._id)" class="headshot" @click="navigate(edition.entry_info.lda.player_id)" /></td>
                                <td><img :src="flagSrc(edition.entry_info.lda.player.country)" class="mini-flag" /></td>
                                <td><RouterLink :to="{name: 'PlayerLayout', params: {id: edition.entry_info.lda.player._id}}" class="hover-link">{{ edition.entry_info.lda.player.full_name }}</RouterLink></td>
                            </tr>
                        </tbody>
                        <thead v-if="edition.entry_info.lls.length > 0">
                            <tr>
                                <th colspan="4">Lucky losers</th>
                            </tr>
                        </thead>
                        <tbody v-if="edition.entry_info.lls.length > 0">
                            <tr v-for="player in edition.entry_info.lls">
                                <td><img v-if="player.headshot" :src="headshot(player._id)" class="headshot" @click="navigate(player._id)" /></td>
                                <td><img :src="flagSrc(player.country)" class="mini-flag" /></td>
                                <td><RouterLink :to="{name: 'PlayerLayout', params: {id: player._id}}" class="hover-link">{{ player.full_name }}</RouterLink></td>
                            </tr>
                        </tbody>
                        <thead v-if="edition.entry_info.alts.length > 0">
                            <tr>
                                <th colspan="4">Alternates</th>
                            </tr>
                        </thead>
                        <tbody v-if="edition.entry_info.alts.length > 0">
                            <tr v-for="player in edition.entry_info.alts">
                                <td><img v-if="player.headshot" :src="headshot(player._id)" class="headshot" @click="navigate(player._id)" /></td>
                                <td><img :src="flagSrc(player.country)" class="mini-flag" /></td>
                                <td><RouterLink :to="{name: 'PlayerLayout', params: {id: player._id}}" class="hover-link"></RouterLink></td>
                            </tr>
                        </tbody>
                        <thead v-if="edition.entry_info.wds.length > 0">
                            <tr>
                                <th colspan="4">Withdrawals</th>
                            </tr>
                        </thead>
                        <tbody v-if="edition.entry_info.wds.length > 0">
                            <tr v-for="wd in edition.entry_info.wds">
                                <td><img v-if="wd.player.headshot" :src="headshot(wd.player._id)" class="headshot" @click="navigate(wd.player._id)" /></td>
                                <td><img :src="flagSrc(wd.player.country)" class="mini-flag" /></td>
                                <td><RouterLink :to="{name: 'PlayerLayout', params: {id: wd.player._id}}" class="hover-link">{{ wd.player.full_name }}</RouterLink></td>
                                <td>{{ capitalise(wd.reason) }}</td>
                            </tr>
                        </tbody>
                        <thead v-if="edition.entry_info.rets.length>0">
                            <tr>
                                <th colspan="4">Retirements</th>
                            </tr>
                        </thead>
                        <tbody v-if="edition.entry_info.rets.length>0">
                            <tr v-for="ret in edition.entry_info.rets">
                                <td><img v-if="ret.player.headshot" :src="headshot(ret.player._id)" class="headshot" @click="navigate(ret.player._id)" /></td>
                                <td><img :src="flagSrc(ret.player.country)" class="mini-flag" /></td>
                                <td><RouterLink :to="{name: 'PlayerLayout', params: {id: ret.player._id}}" class="hover-link" >{{ ret.player.full_name }}</RouterLink></td>
                                <td><span v-if="ret.reason">{{ capitalise(ret.reason) }}</span></td>
                            </tr>
                        </tbody>
                        <thead v-if="edition.entry_info.wos.length > 0">
                            <tr>
                                <th colspan="4">Walkovers</th>
                            </tr>
                        </thead>
                        <tbody v-if="edition.entry_info.wos.length > 0">
                            <tr v-for="wo in edition.entry_info.wos">
                                <td><img v-if="wo.player.headshot" :src="headshot(wo.player._id)" class="headshot" @click="navigate(wo.player._id)" /></td>
                                <td><img :src="flagSrc(wo.player.country)" class="mini-flag" /></td>
                                <td><RouterLink :to="{name: 'PlayerLayout', params: {id: wo.player_id}}" class="hover-link">{{ wo.player.full_name }}</RouterLink></td>
                                <td><span v-if="wo.reason">{{ capitalise(wo.reason) }}</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.view-container {
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

.cards-container {
    display: flex;
    flex-direction: row;
}

.card-container {
    display: flex;
    flex-direction: column;
    width: 50%;
}

.edition-card {
    display: flex;
    flex-direction: column;
    margin: 15px;
}

.strikethrough {
    text-decoration: line-through;
}

.centred {
    text-align: center;
}

table {
    border-collapse: collapse;
    border-radius: 20px;
}

thead {
    background-color: var(--color-background-mute);
    border-radius: 20px;
    border-top: 1px solid var(--color-border);
    border-bottom: 1px solid var(--color-border)
}

th {
    border: none;
    padding: 2px
}

td {
    padding: 5px;
    padding-left: 10px;
    padding-right: 10px;
}
</style>