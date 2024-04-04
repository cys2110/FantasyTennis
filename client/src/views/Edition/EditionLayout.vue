<script setup>
import EditionService from '@/services/EditionService';
import { onMounted, ref, computed } from 'vue';
import { RouterView, RouterLink, useRoute } from 'vue-router';
import { formattedDates, categorySrc, flagSrc } from '@/components/utils';
import MatchScore from '@/services/MatchScore';

const props = defineProps({
    id: {
        required: true
    },
    year: {
        required: true
    }
})

const editionId = props.id.toString() + props.year.toString()
const edition = ref(null)
const matches = ref(null)
const route = useRoute()
const currentTab = ref(route.name)

const setCurrentTab = (tabName) => {
    currentTab.value = tabName
}

onMounted(() => {
    EditionService.getEditionById(editionId)
        .then((response) => {
            edition.value = response.data
        })
        .catch((error) => {
            console.log(error)
        })
    MatchScore.getMatchesByEdition(editionId)
        .then((response) => {
            matches.value = response.data
        })
        .catch((error) => {
            console.log(error)
        })
})
</script>

<template>
    <div class="view-container" v-if="edition">
        <div class="heading-wrapper">
            <div class="category"><img class="filter" :src="categorySrc(edition.category)" /></div>
            <div class="heading">
                <h1><RouterLink class="hover-link" :to="{ name: 'Tournament', params: {id: edition.tourney._id}}">{{ edition.tourney.name }}</RouterLink></h1>
                <div class="sub-heading" v-if="edition.sponsor_name">{{ edition.sponsor_name }}</div>
                <div class="sub-heading">{{ formattedDates(edition.start_date, edition.end_date) }}</div>
            </div>
            <div class="flag-container"><img class="flag" :src="flagSrc(edition.location.country)" /></div>
        </div>

        <div class="tabs">
            <div :class="{'tab': true, 'active-tab': currentTab === 'EditionOverview'}"><RouterLink class="tab-link" :to="{ name: 'EditionOverview'}" @click="setCurrentTab('EditionOverview')" >Overview</RouterLink></div>
            <div :class="{'tab': true, 'active-tab': currentTab === 'Draw'}"><RouterLink class="tab-link" :to="{ name: 'Draw'}" @click="setCurrentTab('Draw')" >Draw</RouterLink></div>
            <div :class="{'tab': true, 'active-tab': currentTab === 'Results'}"><RouterLink class="tab-link" :to="{ name: 'Results' }" @click="setCurrentTab('Results')" >Results</RouterLink></div>
        </div>
        <RouterView v-if="edition && matches ":edition="edition" :matches="matches" />
    </div>
</template>

<style scoped>
.flag-container {
    margin-left: auto;
}

.flag {
    width: 150px;
    border-radius: 15px;
}

.category {
    margin-right: 20px;
}
</style>