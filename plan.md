1. Set up a new Vue 3 project:
    * Use Vite to create a new Vue 3 project
2. Install the required dependencies:
    * Axios 
    * Tailwind
3. Set up Pinia for state management:
    * Import the Pinia store in the `main.js` file and add it to the Vue app instance.
4. Create the necessary components and views:
    * Create a `Search` component for the search bar.
    * Create an `Artist` component for displaying the artist's information.
    * Create an `Albums` component for listing the artist's albums.
    * Create a `Tracks` component for displaying the artist's tracks.
    * Create a `SimilarArtists` component for showing similar artists.
    * Create a `Bio` component for bios.
5. Create a services folder and files for the API calls
    * create folder inside src for services
    * Add a file for each service area (search, artist, album etc)
6. Create Pinia store modules for managing application state:
    * Create a store for managing search results
    * Create a store for managing artist data.
    * Create a store for managing album data.
    * Create a store for managing track data.
    * Create a store for managing similar artists data.
    * Create a store for bio data.
7. Connect to the Spotify API:
    * Follow the Spotify API documentation to obtain an access token
    * Use Axios to make API calls with the access token in each service, exporting functions from the services files.
8. Implement the search functionality:
    * In the `Search` component, call the search function from the searchService file
    * Update the Pinia store with the search results.
9. Display the artist information and related data:
    * In the `Artist` component, display the retrieved artist information.
    * In the `Albums` component, list the artist's albums.
    * In the `Tracks` component, display the artist's tracks.
    * In the `SimilarArtists` component, show similar artists based on the API's response.
    * In the `Bio` component add in the bio returned from the API
10. Style the app and ensure it follows the un:hurd design language:
    * Review the [https://unhurd.co.uk](https://unhurd.co.uk) website and create a similar design using Tailwind CSS.
11. Handle errors and edge cases:
    * Implement error handling for API calls and display appropriate error messages.
    * Handle cases where no artist is found or when the API returns incomplete data.
12. Write the README.md file with instructions:
    * Explain how to set up and run the app locally.
    * Describe how to use the app, and any known limitations or issues.
    * Explain the decision to use Vue 3 over Nuxt, why Nuxt would be the better choice for actual unhurd web app
13. Other goals once MVP is done:
    * Make top 10 page, cards for each artist that when expanded show all of the components and possibly data visualisations
    * Visualisations with D3 &or Three
    * Advanced search
    * Personal recommendations based on Spotify account 
    * Player functionality
    * User accounts (login and auth (possibly oAuth?), db etc)
    * PWA
    * Audio fingerprinting (with possible add to playlist)
