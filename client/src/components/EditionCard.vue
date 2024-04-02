<script setup>
import { computed } from 'vue'
import { headshot } from './utils';

const props = defineProps({
    edition: {
        type: Object,
        required: true
    }
})

const flagSrc = (country) => {
    return new URL(`../assets/flags/${country}.svg`, import.meta.url).href
}

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
    <h1>{{ edition.year }}</h1>
    <div class="details-wrapper">
        <div class="player-wrapper">
            <div class="headshot">
                <img :src="headshot(edition.winner._id)" />
            </div>
            <div class="flag">
                <img :src="flagSrc(edition.winner.country)" />
            </div>
            <div class="name">{{ edition.winner.full_name }}</div>
        </div>
        <div>d.</div>
        <div class="player-wrapper">
            <div class="headshot">
                <img :src="headshot(edition.finalist._id)" />
            </div>
            <div class="flag">
                <img :src="flagSrc(edition.finalist.country)" />
            </div>
            <div class="name">{{ edition.finalist.full_name }}</div>
        </div>
        <div class="score-wrapper" v-html="score"></div>
    </div>
</template>