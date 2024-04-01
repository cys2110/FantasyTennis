<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChevronDown } from '@fortawesome/pro-duotone-svg-icons'
import { computed, onMounted, ref, watch } from 'vue';
import EditionService from '@/services/EditionService';
import CalendarCard from '../components/CalendarCard.vue'

const years = Array.from({length: 2025-1968}, (_, index) => 2024 - index)
const search = ref(2024)
const dropdownVisible = ref(false)
const results = ref(null)

const setSearch = (year) => {
    search.value = year
}

const displayDropdown = () => {
    dropdownVisible.value = !dropdownVisible.value
}

const filteredYears = computed(() => {
    return years.filter(year => String(year).toLowerCase().includes(search.value))
})

const filterYears = () => {
    dropdownVisible.value = true
}

onMounted(() => {
    const closeDropdown = (event) => {
        if (!event.target.closest('.dropdown-search')) {
            dropdownVisible.value = false
        }
    }
    document.addEventListener('click', closeDropdown)
    return () => document.removeEventListener('click', closeDropdown)
})

watch(search, () => {
    EditionService.getEditionsByYear(search.value)
        .then((response) => {
            results.value = response.data
        })
        .catch((error) => {
            console.log(error)
        })
}, {immediate: true})
</script>

<template>
    <h2>Results Archive</h2>
    <div class="dropdown">
        <div class="dropdown-search">
            <button><span class="dropdown-input-container"><input class="dropdown-input" type="text" v-model="search" @input="filterYears" /></span><span class="dropdown-icon-container" ><FontAwesomeIcon class="dropdown-icon" :icon="faChevronDown" @click="displayDropdown" /></span></button>
        </div>
        <div class="dropdown-search-content" id="dropdown-menu" v-show="dropdownVisible" >
            <li class="dropdown-search-item" v-for="year in filteredYears" @click="setSearch(year)" >{{ year }}</li>
        </div>
    </div>
    <div class="results-wrapper">
        <CalendarCard v-for="result in results" :key="result._id" :tournament="result" />
    </div>
</template>

<style scoped>
button {
    max-width: fit-content;
    border-radius: 10px;
    border: 1px solid #121FFF;
    background-color: transparent;
}

.dropdown {
    max-width: fit-content;
}

.dropdown-input {
    border: none;
    outline: none;
    background-color: transparent;
    width: 75px;
    color: var(--color-text);
}

.dropdown-icon {
    color: var(--color-text);
    cursor: pointer;
}

.dropdown-search-item {
    list-style: none;
    padding-left: 10px;
    cursor: pointer;
}

.dropdown-search-content {
    max-height: 200px;
    overflow-y: auto;
    border: 1px solid #121FFF;
    border-radius: 10px;
    margin-top: 3px;
}

.dropdown-search-content::-webkit-scrollbar {
    display: none;
}
</style>