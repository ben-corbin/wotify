import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SearchResultsView from '../views/SearchResultsView.vue'
import Top10View from '../views/Top10View.vue'
import { useAuthStore } from '../stores/authStore'
import { requestAccessToken } from '../auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
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
    {
      path: '/callback',
      name: 'Callback',
      beforeEnter: async (to, from, next) => {
        const code = to.query.code;
        
        if (code) {
          console.log('Authorization code:', code);
          const tokens = await requestAccessToken(code);
  
          if (tokens) {
            // Set the tokens in the store
            const authStore = useAuthStore();

            authStore.setTokens(tokens.accessToken, tokens.refreshToken, tokens.expiresIn);

            next({ name: 'Home' });
          } else {
            // TODO - Handle error in getting tokens
            console.error('Authorisation code has expired or is invalid. Please try again.')
            next({ name: 'Home' });
          }
        } else {
          // Redirect to the home page if there's no code in the query
          next({ name: 'Home' });
        }
      },
    },
  ]
})

export default router
