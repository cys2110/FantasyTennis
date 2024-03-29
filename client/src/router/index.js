import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PlayerLayout from '../views/Player/PlayerLayout.vue'
import PlayerOverview from '../views/Player/PlayerOverview.vue'
import Tournament from '../views/Tournament.vue'
import EditionLayout from '../views/Edition/EditionLayout.vue'
import EditionOverview from '../views/Edition/EditionOverview.vue'
import Results from '../views/Edition/Results.vue'
import Draw from '../views/Edition/Draw.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/players/:id',
      component: PlayerLayout,
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
      component: Tournament
    },
    {
      path: '/tournaments/:id/:year',
      component: EditionLayout,
      children: [
        {
          path: '',
          name: 'EditionOverview',
          component: EditionOverview
        },
        {
          path: '/results',
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
