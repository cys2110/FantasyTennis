<script setup>
import { computed } from 'vue'
import { headshot, flagSrc } from './utils';
import { RouterLink } from 'vue-router';

const props = defineProps({
    edition: {
        type: Object,
        required: true
    }
})

const formatScore = (score) => {
  const parts = score.split(' ');
  const formattedParts = parts.map(part => {
    const match = part.match(/\((.*?)\)/);
    if (match) {
      const subscript = match[1];
      const base = part.replace(/\(.*?\)/, '');
      return `${base}<sup>${subscript}</sup>`;
    } else {
      return part;
    }
  });
  return formattedParts.join(' ');
}

const score = computed(() => formatScore(props.edition.final_score))
</script>

<template>
    <div class="view-container">
        <h3><RouterLink :to="{name: 'EditionOverview', params: {id: edition.tourney._id, year: edition.year}}" class="hover-link">{{ edition.year }}</RouterLink></h3>
        <div class="card-component">
            <div class="component-detail"><img v-if="edition.winner.headshot" :src="headshot(edition.winner._id)" class="headshot" /></div>
            <div class="component-detail"><img :src="flagSrc(edition.winner.country)" class="mini-flag" /></div>
            <div class="component-detail"><RouterLink :to="{name: 'PlayerOverview', params: {id: edition.winner._id}}" class="hover-link">{{ edition.winner.full_name }}</RouterLink></div>
        </div>
        <div class="centred">d.</div>
        <div class="card-component">
            <div class="component-detail"><img v-if="edition.finalist.headshot" :src="headshot(edition.finalist._id)" class="headshot" /></div>
            <div class="component-detail"><img :src="flagSrc(edition.finalist.country)" class="mini-flag" /></div>
            <div class="component-detail"><RouterLink :to="{name: 'PlayerOverview', params: {id: edition.finalist._id}}" class="hover-link">{{ edition.finalist.full_name }}</RouterLink></div>
        </div>
        <div class="centred" v-html="score"></div>
    </div>
</template>

<style scoped>
.view-container {
    display: flex;
    flex-direction: column;
    border: 2px solid var(--color-border);
    border-radius: 1rem;
    padding: 1rem;
    margin: 1.5rem;
}

h3 {
    text-align: center;
}

.card-component {
    display: flex;
    flex-direction: row;
    padding: 0.25rem;
    align-items: center;
}

.centred {
    text-align: center;
}

.component-detail {
    margin-left: 0.25rem;
    margin-right: 0.25rem;
}
</style>