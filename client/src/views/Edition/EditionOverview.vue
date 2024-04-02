<script setup>
import { headshot, currency } from '../../components/utils'

const props = defineProps({
    edition: {
        type: Object,
        required: true
    }
})

const flagSrc = (country) => {
    return new URL(`../../assets/flags/${country}.svg`, import.meta.url).href
}

const withdrawnSeed = (player) => {
    if (props.edition.entry_info.wds.some(entry => entry.player._id === player._id)) {
        return `<strike>${player.full_name}</strike`
    } else {
        return player.full_name
    }
}

const withdrawnRank = (player) => {
    if (props.edition.entry_info.wds.some(entry => entry.player._id === player.player._id)) {
        return `<strike>${player.rank}</strike>`
    } else {
        return player.rank
    }
}

</script>

<template>
    <div class="location"><span v-if="edition.location.venue">{{ edition.location.venue }}, </span>{{ edition.location.city }} <img :src="flagSrc(edition.location.country)" /> </div>
    <div class="surface">{{ edition.surface.environment }} {{ edition.surface.type }} <span v-if="edition.surface.hard_type">({{ edition.surface.hard_type }})</span></div>
    <div class="prize-money" v-if="edition.prize_money">{{ currency(edition.currency) }}{{ edition.prize_money }}</div>
    <div class="tfc">{{ currency(edition.currency) }}{{ edition.tfc }}</div>
    <div class="supervisors"></div>
    <div class="awards" v-if="edition.awards">
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
                    <td>{{ currency(edition.currency) }}{{ edition.awards.winner.prize_money }}</td>
                    <td>{{ edition.awards.winner.points }}</td>
                </tr>
                <tr>
                    <td>FINALIST</td>
                    <td>{{ currency(edition.currency) }}{{ edition.awards.finalist.prize_money }}</td>
                    <td>{{ edition.awards.finalist.points }}</td>
                </tr>
                <tr>
                    <td>SEMIFINALIST</td>
                    <td>{{ currency(edition.currency) }}{{ edition.awards.semifinalist.prize_money }}</td>
                    <td>{{ edition.awards.semifinalist.points }}</td>
                </tr>
                <tr>
                    <td>QUARTERFINALIST</td>
                    <td>{{ currency(edition.currency) }}{{ edition.awards.quarterfinalist.prize_money }}</td>
                    <td>{{ edition.awards.quarterfinalist.points }}</td>
                </tr>
                <tr v-if="edition.awards.round4">
                    <td>4TH ROUND</td>
                    <td>{{ currency(edition.currency) }}{{ edition.awards.round4.prize_money }}</td>
                    <td>{{ edition.awards.round4.points }}</td>
                </tr>
                <tr v-if="edition.awards.round3">
                    <td>3RD ROUND</td>
                    <td>{{ currency(edition.currency) }}{{ edition.awards.round3.prize_money }}</td>
                    <td>{{ edition.awards.round3.points }}</td>
                </tr>
                <tr>
                    <td>2ND ROUND</td>
                    <td>{{ currency(edition.currency) }}{{ edition.awards.round2.prize_money }}</td>
                    <td>{{ edition.awards.round2.points }}</td>
                </tr>
                <tr>
                    <td>1ST ROUND</td>
                    <td>{{ currency(edition.currency) }}{{ edition.awards.round1.prize_money }}</td>
                    <td>{{ edition.awards.round1.points }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="seeds" v-if="edition.seeds">
        <h5>Seeded Players</h5>
        <div class="seed" v-for="player in edition.seeds" :key="player._id">
            <div class="seed-no">{{ player.seed }}</div>
            <div class="headshot"><img v-if="player.player.headshot" :src="headshot(player.player._id)" /></div>
            <div class="country"><img :src="flagSrc(player.player.country)" /> </div>
            <div class="player" v-html="withdrawnSeed(player.player)"></div>
            <div class="rank" v-html="withdrawnRank(player)"></div>
        </div>
    </div>
    <div class="entry-info">
        <div class="lda" v-if="edition.entry_info.lda">
            <div class="headshot"><img v-if="edition.entry_info.lda.player.headshot" :src="headshot(edition.entry_info.lda.player._id)" /></div>
            <div class="country"><img :src="flagSrc(edition.entry_info.lda.player.country)" /></div>
            <div class="player">{{ edition.entry_info.lda.player.full_name }}</div>
        </div>
        <h1>Lucky losers</h1>
        <div class="lls" v-if="edition.entry_info.lls.length > 0" v-for="player in edition.entry_info.lls">
            <div class="headshot"><img v-if="player.headshot" :src="headshot(player._id)" /></div>
            <div class="country"><img :src="flagSrc(player.country)" /></div>
            <div class="player">{{ player.full_name }}</div>
        </div>
        <h1>Alternates</h1>
        <div class="alts" v-if="edition.entry_info.alts.length > 0" v-for="player in edition.entry_info.alts">
            <div class="headshot"><img v-if="player.headshot" :src="headshot(player._id)" /></div>
            <div class="country"><img :src="flagSrc(player.country)" /></div>
            <div class="player">{{ player.full_name }}</div>
        </div>
        <h1>Withdrawals</h1>
        <div class="wds" v-if="edition.entry_info.wds.length > 0" v-for="wd in edition.entry_info.wds">
            <div class="headshot"><img v-if="wd.player.headshot" :src="headshot(wd.player._id)" /></div>
            <div class="country"><img :src="flagSrc(wd.player.country)" /></div>
            <div class="player">{{ wd.player.full_name }}</div>
            <div class="reason">{{ wd.reason }}</div>
        </div>
    </div>
    <div class="incompletes">
        <h1>Retirements</h1>
        <div class="rets" v-if="edition.entry_info.rets.length > 0" v-for="ret in edition.entry_info.rets">
            <div class="headshot"><img v-if="ret.player.headshot" :src="headshot(ret.player._id)" /></div>
            <div class="country"><img :src="flagSrc(ret.player.country)" /></div>
            <div class="player">{{ ret.player.full_name }}</div>
            <div class="reason">{{ ret.reason }}</div>
        </div>
        <h1>Walkovers</h1>
        <div class="wds" v-if="edition.entry_info.wos.length > 0" v-for="wo in edition.entry_info.wos">
            <div class="headshot"><img v-if="wo.player.headshot" :src="headshot(wo.player._id)" /></div>
            <div class="country"><img :src="flagSrc(wo.player.country)" /></div>
            <div class="player">{{ wo.player.full_name }}</div>
            <div class="reason">{{ wo.reason }}</div>
        </div>
    </div>
</template>