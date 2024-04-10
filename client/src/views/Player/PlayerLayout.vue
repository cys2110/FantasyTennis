<script setup>
import PlayerService from '@/services/PlayerService';
import { computed, onMounted, ref, watch } from 'vue';
import { gladiator, headshot, flagSrc, formatCurrency } from '@/components/utils';
import { RouterView, useRoute, useRouter } from 'vue-router';

const props = defineProps({
    id: {
        required: true
    }
})

const player = ref(null)
const router = useRouter()
const route = useRoute()
const currentTab = ref(route.name)

const setCurrentTab = (tabName) => {
    currentTab.value = tabName
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

const careerHigh = computed(() => {
    const options = {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }
    return new Date(player.value.rank.date).toLocaleDateString('en-gb', options)
})
</script>

<template>
    <div class="player-wrapper" v-if="player">
        <div class="heading-container">
            <div class="details details-container">
                <div class="heading">
                    <h1>{{ player.first_name }} {{ lastName }}</h1>
                    <div><img class="flag" :src="flagSrc(player.country)" /></div>
                    
                </div>
                <div class="sub-heading">
                    <div class="badge" v-if="player.status.active" >Active</div>
                </div>
                <div class="stats-container">
                    <div class="stat">
                        <div class="bold">{{ player.rank.career_high }}</div>
                        <div>{{ careerHigh }}</div>
                        <div>CAREER HIGH</div>
                    </div>
                    <div class="stat">
                        <div class="bold">{{ player.win }}-{{ player.loss }}</div>
                        <div>WIN-LOSS</div>
                    </div>
                    <div class="stat">
                        <div class="bold">{{ player.titles }}</div>
                        <div>TITLES</div>
                    </div>
                    <div class="stat">
                        <div class="bold">{{ formatCurrency('USD', player.pm_USD) }}</div>
                        <div>PRIZE MONEY</div>
                    </div>
                </div>
            </div>
            
            <div class="gladiator">
                <img v-if="player.gladiator" class="picture" :src="gladiator(player._id)" /><img v-else-if="player.headshot" class="picture" :src="headshot(player._id)" />
            </div>
        </div>

        <div class="tabs">
            <div :class="{'tab': true, 'active-tab': currentTab === 'PlayerOverview'}"><RouterLink :to="{ name: 'PlayerOverview'}" @click="setCurrentTab('PlayerOverview')">Overview</RouterLink></div>
            <div :class="{'tab': true, 'active-tab': currentTab === 'Titles'}"><RouterLink class="tab-link" :to="{ name: 'Titles'}" @click="setCurrentTab('Titles')">Titles and Finals</RouterLink></div>
        </div>

        <RouterView v-if="player" :player="player" />
    </div>
</template>

<style scoped>
h1 {
    font-size: xx-large;
    font-weight: bolder;
}
.heading-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.details {
    display: flex;
    flex-direction: column;
    width: 100%
}

.heading {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.badge {
    background-color: var(--vt-c-box-border);
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    border-radius: 2rem;
    width: 5rem;
    margin-top: 1rem;
}

.flag {
    border-radius: 20%;
    margin-left: 2rem;
    width: 3rem;
}

.stats-container {
    display: flex;
    flex-direction: row;
    margin-top: 3rem;
    background-color: var(--vt-c-box-border);
    justify-content: space-evenly;
    padding-left: 2rem;
    padding-right: 2rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    border-radius: 10rem;
}

.stat {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;
}

.picture {
    border-radius: 50%;
    max-height: 20rem;
}

.bold {
    font-weight: bold;
    font-size: x-large;
}

@media screen and (max-width: 430px) {
    .heading-container {
        flex-direction: column-reverse;
    }

    .gladiator {
        margin: 0 auto;
    }

    .bold {
        font-size: medium
    }

    .stats-container {
        flex-flow: row wrap;
        margin: 0 auto;
    }

    .stat {
        width: 50%;
        margin: 0.5rem;
    }

    .tabs {
        margin-top: 1rem;
    }
}
</style>