<script setup>
import PlayerService from '@/services/PlayerService';
import { computed, onMounted, ref, watch, watchEffect } from 'vue';
import { gladiator, headshot } from '@/components/utils';
import { RouterView, useRouter } from 'vue-router';

const props = defineProps({
    id: {
        required: true
    }
})

const player = ref(null)
const router = useRouter()

const flagSrc = (country) => {
    return new URL(`../../assets/flags/${country}.svg`, import.meta.url).href
}

onMounted(() => {
    PlayerService.getPlayerById(props.id)
        .then((response) => {
            player.value = response.data
        })
        .catch((error) => {
            console.log(error)
        })
})

watch(() => router.currentRoute.value.params.id, () => {
        window.location.reload()
})

const lastName = computed(() => {
    return player.value.last_name.toUpperCase()
})
</script>

<template>
    <!-- <div class="tabs">
        <div class="tab"><RouterLink :to="{ name: 'PlayerOverview'}">Overview</RouterLink></div>
    </div> -->
    <div class="player-wrapper" v-if="player">
        <h1>{{ player.first_name }} {{ lastName }}</h1>
        <div class="active" v-if="player.status.active" >Active</div>
        <div class="dates">{{ player.status.turned_pro }} - <span v-if="player.status.retired">{{ player.status.retired }}</span><span v-else>present</span></div>
        <div class="flag"><img :src="flagSrc(player.country)" /></div>
        <div class="picture"><img v-if="player.gladiator" :src="gladiator(player._id)" /><img v-else-if="player.headshot" :src="headshot(player._id)" /></div>
        <div class="rank">{{ player.rank.career_high }} {{ player.rank.date }}</div>
        <div class="pm">${{ player.pm_USD }}</div>
        <div class="titles">{{ player.titles }}</div>
        <div class="wl">{{ player.win }}-{{ player.loss }}</div>

        <RouterView :player="player" />
    </div>
</template>