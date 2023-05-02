// Import necessary functions and components
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SearchResultsView from '../views/SearchResultsView.vue'
import { useAuthStore } from '../stores/authStore'
import { requestAccessToken } from '../auth'

// Create a new router instance with web history and routes
const router = createRouter({
  history: createWebHistory(import.meta.env.production.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView // Display the home view on the root path
    },
    {
      path: '/search/:query',
      name: 'SearchResults',
      component: SearchResultsView // Display the search results view when a search query is provided
    },
    {
      path: '/artist/:id',
      name: 'artist',
      component: () => import('@/views/ArtistDetailView.vue')
    },
    // {
    //   path: '/track/:id',
    //   name: 'track',
    //   component: () => import('@/views/TrackDetailView.vue')
    // },
    // {
    //   path: '/album/:id',
    //   name: 'album',
    //   component: () => import('@/views/AlbumDetailView.vue')
    // },
    {
      path: '/callback',
      name: 'Callback',
      // Custom navigation guard to handle authorization callback
      beforeEnter: async (to, from, next) => {
        const code = to.query.code
    
        if (code) {
          console.log('Authorization code:', code)
          
          // Retrieve the codeVerifier from local storage
          const codeVerifier = localStorage.getItem('pkce_code_verifier')
          console.log('Code verifier:', codeVerifier)
    
          // Pass the codeVerifier to requestAccessToken function
          const tokens = await requestAccessToken(code, codeVerifier)
    
          if (tokens) {
            // Set the tokens in the store
            const authStore = useAuthStore()
    
            authStore.setTokens(tokens.accessToken, tokens.refreshToken, tokens.expiresIn)
    
            // Navigate to the home view after successfully setting the tokens
            next({ name: 'Home' })
          } else {
            // Handle error in getting tokens
            console.error('Authorisation code has expired or is invalid. Please try again.')
            next({ name: 'Home' })
          }
        } else {
          // Redirect to the home page if there's no code in the query
          next({ name: 'Home' })
        }
      }
    }
  ]
})

// Export the router instance for use in the application
export default router
