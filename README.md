# Wotify

Wotify is a web application that leverages the Spotify and Last.fm APIs to provide search results for artists, albums, and tracks. The artist view displays artist bios, albums, and top tracks.

## Technologies and Frameworks

This project is built with the following technologies:

- Vite
- Vue 3
- Pinia
- Tailwind CSS
- Various Vue and JavaScript libraries

## Prerequisites

To run this project, you'll need:

- Node.js v12.x or later
- npm v6.x or later

## Installation

1. Clone the repository and open the project in Visual Studio Code (or your editor of choice).
2. Open a terminal and run `npm install` to install the required dependencies.
3. Run `npm run dev` to start the development server.
4. Send your Spotify account details to ben@corbin.digital to be added to the app's dashboard on the Spotify Developer Dashboard.

## Usage

1. Open the app in your browser and click the "Authorize with Spotify" button.
2. You'll be redirected to a Spotify-controlled page where you can authorize your account to grant API access to the app. You can revoke this access at any time via your Spotify settings, found here: https://www.spotify.com/uk/account/apps/
3. Once authorized, you can search for artists. Clicking on an artist link will take you to their artist page with information about the artist, their albums, and tracks. Note that track and album search result links are not currently connected to components and will not navigate.


## Contributing

This is a tech test, and contributions are not needed.

## License

This project is released under the [MIT License](https://choosealicense.com/licenses/mit/), which is suitable for a tech test.

## Contact Information

For any questions or feedback, feel free to reach out to ben@corbin.digital