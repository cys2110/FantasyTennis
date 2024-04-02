<script setup>
const props = defineProps({
    player: {
        type: Object,
        required: true
    }
})
</script>

<template>
    <div class="player-overview-wrapper">
        <div class="player-overview">{{ player.dob }}</div>
        <div class="player-overview">{{ player.right_handed }}</div>
        <div class="player-overview">{{ player.backhand }}</div>
        <div class="player-overview">{{ player.height.cm }} {{ player.height.ft }}</div>
        <div class="player-overview">{{ player.coaches }}</div>
        <div class="player-overview">{{ player.preferred_surface }}</div>
        <div class="player-overview">{{ player.age_started }}</div>
        <div class="player-overview">
            <table>
                <thead>
                    <tr>
                        <th>Major</th>
                        <th>Best result</th>
                        <th>Year(s) achieved</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Australian Open</td>
                        <td>{{ player.majors.ao.round }}</td>
                        <td>{{ player.majors.ao.years }}</td>
                    </tr>
                    <tr>
                        <td>Roland Garros</td>
                        <td>{{ player.majors.rg.round }}</td>
                        <td>{{ player.majors.rg.years }}</td>
                    </tr>
                    <tr>
                        <td>Wimbledon</td>
                        <td>{{ player.majors.wimbledon.round }}</td>
                        <td>{{ player.majors.wimbledon.years }}</td>
                    </tr>
                    <tr>
                        <td>US Open</td>
                        <td>{{ player.majors.uso.round }}</td>
                        <td>{{ player.majors.uso.years }}</td>
                    </tr>
                    <tr>
                        <td>Year-end Finals</td>
                        <td>{{ player.majors.finals.round }}</td>
                        <td>{{ player.majors.finals.years }}</td>
                    </tr>
                    <tr>
                        <td>Olympics</td>
                        <td>{{ player.majors.olympics.round }}</td>
                        <td>{{ player.majors.olympics.years }}</td>
                    </tr>
                    <tr>
                        <td>Davis Cup</td>
                        <td>{{ player.majors.davis.round }}</td>
                        <td>{{ player.majors.davis.years }}</td>
                    </tr>
                    <tr>
                        <td>Hopman Cup</td>
                        <td>{{ player.majors.hopman.round }}</td>
                        <td>{{ player.majors.hopman.years }}</td>
                    </tr>
                    <tr>
                        <td>Grand Slam Cup</td>
                        <td>{{ player.majors.gs_cup.round }}</td>
                        <td>{{ player.majors.gs_cup.years }}</td>
                    </tr>
                    <tr>
                        <td>WCT Finals</td>
                        <td>{{ player.majors.wct.round }}</td>
                        <td>{{ player.majors.wct.years }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>