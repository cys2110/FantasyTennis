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
    search.value = ''
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
    <div class="view-container">
        <div class="heading">
            <h1>Results Archive</h1>
            <div class="dropdown">
                <div class="dropdown-search">
                    <button>
                        <span class="dropdown-input-container"><input class="dropdown-input" type="text" v-model="search" @input="filterYears" /></span>
                        <span class="dropdown-icon-container" ><FontAwesomeIcon class="dropdown-icon" :icon="faChevronDown" @click="displayDropdown" /></span>
                    </button>
                </div>
                <div class="dropdown-search-content" id="dropdown-menu" v-show="dropdownVisible" >
                    <li class="dropdown-search-item" v-for="year in filteredYears" @click="setSearch(year)" :key="year" >{{ year }}</li>
                </div>
            </div>
        </div>
        <div class="results-wrapper" v-if="results">
            <CalendarCard v-for="result in results" :key="result._id" :tournament="result" />
        </div>
    </div>
</template>

<style scoped>
.heading {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

button {
    max-width: fit-content;
    border-radius: 15px;
    border: 1px solid var(--vt-c-box-border);
    background-color: transparent;
    height: 2rem;
}

.dropdown {
    max-width: fit-content;
    position: relative
}

.dropdown-input {
    border: none;
    outline: none;
    background-color: transparent;
    width: 75px;
    color: var(--color-text);
    padding: 5px
}

.dropdown-icon {
    color: var(--color-text);
    cursor: pointer;
    padding-right: 5px
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
    padding-top: 3px;
    padding-bottom: 3px;
    z-index: 999;
    position: absolute;
    width: 100%;
}

.dropdown-search-content::-webkit-scrollbar {
    display: none;
}
</style>