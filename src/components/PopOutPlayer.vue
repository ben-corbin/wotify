<!-- <template>
    <div v-if="showPlayer" class="pop-out-player fixed bottom-0 right-0 bg-white shadow-md p-6 rounded-lg w-80 z-50">
    
        <div class="flex items-center">
            <img :src="albumArt" alt="Album Art" class="w-20 h-20 rounded-md" />
            <div class="ml-4">
                <p class="text-sm font-semibold">{{ trackName }}</p>
                <p class="text-xs text-gray-600">{{ artistName }}</p>
            </div>
        </div>

        <div class="flex justify-center mt-4">
            <button @click="togglePlayback"
                class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                {{ isPlaying ? 'Pause' : 'Play' }}
            </button>
        </div>
    </div>
</template>
<script>
import { ref, onMounted, onUnmounted, watch } from 'vue';

export default {
    props: {
        accessToken: {
            type: String,
            required: true,
        },
        deviceId: {
            type: String,
            required: true,
        },
    },
    setup(props) {
        const showPlayer = ref(true);
        const player = ref(null);
        const isPlaying = ref(false);
        const artistData = ref(null);

        const handleSpotifyReady = () => {
            // Initialize the Spotify Player
            player.value = new Spotify.Player({
                name: 'My Spotify Player',
                getOAuthToken: (cb) => {
                    cb(props.accessToken);
                },
                volume: 0.5,
            });

            // Add 'ready' event listener to the Spotify Player
            player.value.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
                props.deviceId = device_id;
            });

            // Add 'player_state_changed' event listener to the Spotify Player
            player.value.addListener('player_state_changed', (state) => {
                console.log('Player state changed', state);

                // Update reactive variables based on the player state
                if (state) {
                    isPlaying.value = !state.paused;
                    trackName.value = state.track_window.current_track.name;
                    artistName.value = state.track_window.current_track.artists[0].name;
                    albumArt.value = state.track_window.current_track.album.images[0].url;
                }
            });

            // Connect the Spotify Player
            player.value.connect();
        };

        onMounted(() => {
            window.addEventListener('spotifyReady', handleSpotifyReady);
        });

        onUnmounted(() => {
            window.removeEventListener('spotifyReady', handleSpotifyReady);
            if (player.value) {
                player.value.disconnect();
            }
        });

        // Watch for changes in the deviceId prop
        watch(
            () => props.deviceId,
            (deviceId) => {
                if (deviceId && player.value) {
                    player.value.transferControl(deviceId);
                }
            }
        );

        const togglePlayback = () => {
            if (player.value) {
                if (isPlaying.value) {
                    player.value.pause();
                } else {
                    player.value.resume();
                }
            }
        };

        return {
            showPlayer,
            isPlaying,
            trackName,
            artistName,
            albumArt,
            togglePlayback,
        };
    },
};
</script>
 -->
