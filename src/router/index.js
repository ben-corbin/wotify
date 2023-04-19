// Import necessary functions and components
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SearchResultsView from '../views/SearchResultsView.vue'
import Top10View from '../views/Top10View.vue'
import { useAuthStore } from '../stores/authStore'
import { requestAccessToken } from '../auth'

// Create a new router instance with web history and routes
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView // Display the home view on the root path
    },
    {
      path: '/search/:query',
      name: 'SearchResults',
      component: SearchResultsView, // Display the search results view when a search query is provided
    },
    {
      path: '/top10/:artistId',
      name: 'Top10',
      component: Top10View, // Display the top 10 view for a specific artist
    },
    {
      path: '/callback',
      name: 'Callback',
      // Custom navigation guard to handle authorization callback
      beforeEnter: async (to, from, next) => {
        const code = to.query.code;

        if (code) {
          console.log('Authorization code:', code);
          const tokens = await requestAccessToken(code);

          if (tokens) {
            // Set the tokens in the store
            const authStore = useAuthStore();

            authStore.setTokens(tokens.accessToken, tokens.refreshToken, tokens.expiresIn);

            // Navigate to the home view after successfully setting the tokens
            next({ name: 'Home' });
          } else {
            // Handle error in getting tokens
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

// Export the router instance for use in the application
export default router
