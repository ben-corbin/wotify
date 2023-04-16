import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SearchResultsView from '../views/SearchResultsView.vue'
import Top10View from '../views/Top10View.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/search/:query',
      name: 'SearchResults',
      component: SearchResultsView,
    },
    {
      path: '/top10/:artistId',
      name: 'Top10',
      component: Top10View,
    },
  ]
})

export default router
