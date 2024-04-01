<script setup>
import { RouterLink } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHouse, faCircleUser, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faCalendar } from '@fortawesome/pro-regular-svg-icons'
import { faPersonToPortal, faPeopleArrows } from '@fortawesome/pro-duotone-svg-icons'
</script>

<template>
    <div>
        <h1 id="website-title">FantasyTennis</h1>
    </div>
    <div class="nav">
        <RouterLink to="/" ><FontAwesomeIcon class="navIcon" :icon="faHouse" /></RouterLink>
        <RouterLink to="/results-archive" ><FontAwesomeIcon class="navIcon" :icon="faCalendar" /></RouterLink>
        <RouterLink to="/h2h" ><FontAwesomeIcon class="navIcon" :icon="faPeopleArrows" /></RouterLink>
        <RouterLink to="/login" ><FontAwesomeIcon class="navIcon" :icon="faCircleUser" /></RouterLink>
        <FontAwesomeIcon :icon="faPersonToPortal" />
        <FontAwesomeIcon :icon="faMagnifyingGlass" />
    </div>
</template>