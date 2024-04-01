<script setup>
import { defineProps, computed } from 'vue'
import { formattedDates } from './utils';

const props = defineProps({
    edition: {
        type: Object,
        required: true
    }
})

const winnerHeadshotSrc = computed(() => {
    return new URL(`https://www.atptour.com/-/media/alias/player-headshot/${props.edition.winner._id}`)
})

const winnerFlagSrc = computed(() => {
    return new URL(`../assets/flags/${props.edition.winner.country}.svg`, import.meta.url).href
})

const finalistHeadshotSrc = computed(() => {
    return new URL(`https://www.atptour.com/-/media/alias/player-headshot/${props.edition.finalist._id}`)
})

const finalistFlagSrc = computed(() => {
    return new URL(`../assets/flags/${props.edition.finalist.country}.svg`, import.meta.url).href
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
    <h1>{{ edition.year }}</h1>
    <div class="details-wrapper">
        <div class="player-wrapper">
            <div class="headshot">
                <img :src="winnerHeadshotSrc" />
            </div>
            <div class="flag">
                <img :src="winnerFlagSrc" />
            </div>
            <div class="name">{{ edition.winner.full_name }}</div>
        </div>
        <div>d.</div>
        <div class="player-wrapper">
            <div class="headshot">
                <img :src="finalistHeadshotSrc" />
            </div>
            <div class="flag">
                <img :src="finalistFlagSrc" />
            </div>
            <div class="name">{{ edition.finalist.full_name }}</div>
        </div>
        <div class="score-wrapper" v-html="score"></div>
    </div>
</template>