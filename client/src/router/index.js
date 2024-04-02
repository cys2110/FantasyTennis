import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PlayerLayout from '../views/Player/PlayerLayout.vue'
import PlayerOverview from '../views/Player/PlayerOverview.vue'
import Tournament from '../views/Tournament.vue'
import EditionLayout from '../views/Edition/EditionLayout.vue'
import EditionOverview from '../views/Edition/EditionOverview.vue'
import Results from '../views/Edition/Results.vue'
import Draw from '../views/Edition/Draw.vue'
import ResultsArchive from '@/views/ResultsArchive.vue'
import LogIn from '@/views/LogIn.vue'
import SignUp from '@/views/SignUp.vue'
import UserLayout from '@/views/User/UserLayout.vue'
import Settings from '@/views/User/Settings.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LogIn
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/user/:username',
      name: 'UserLayout',
      component: UserLayout,
      props: true,
      children: [
        {
          path: 'settings',
          name: 'UserSettings',
          component: Settings
        }
      ]
    },
    {
      path: '/results-archive',
      name: 'results archive',
      component: ResultsArchive
    },
    {
      path: '/players/:username',
      component: PlayerLayout,
      props: true,
      children: [
        {
          path: '',
          name: 'PlayerOverview',
          component: PlayerOverview
        }
      ]
    },
    {
      path: '/tournaments/:id',
      name: 'Tournament',
      props: true,
      component: Tournament
    },
    {
      path: '/tournaments/:id/:year',
      component: EditionLayout,
      props: true,
      children: [
        {
          path: '',
          name: 'EditionOverview',
          component: EditionOverview
        },
        {
          path: 'results',
          name: 'Results',
          component: Results
        },
        {
          path: 'draw',
          name: 'Draw',
          component: Draw
        }
      ]
    }
  ]
})

export default router
