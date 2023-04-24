Copy code
<template>
    <div class="album-card-wrapper">
        <div class="flip-card">
            <div class="flip-card-inner">
                <div class="flip-card-front bg-white text-black shadow-md rounded-lg p-4">
                    <div class="relative pb-1/1">
                        <img :src="album.images[0].url" alt="" class="w-full h-full object-cover rounded-lg" />
                    </div>
                    <h3 class="mt-4 text-xl font-semibold text-gray-900">{{ album.name }}</h3>
                    <p class="text-sm text-gray-600">Release Date: {{ album.release_date }}</p>
                    <p class="text-sm text-gray-600">Total Tracks: {{ album.total_tracks }}</p>
                </div>

                <div class="flip-card-back p-4 bg-gray-600">
                    <div class="flip-card-back-content">
                        <h3 class="text-xl font-semibold mb-4">Tracks</h3>
                        <ul>
                            <li v-for="track in albumTracks" :key="track.id" class="mb-2 text-white">
                                {{ track.name }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

  
<script>
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
    props: {
        album: {
            type: Object,
            required: true,
        },
        spotifyAPI: {
            type: Object,
            required: true,
        },
        albumTracks: {
            type: Array,
            required: true,
        },
    },
    setup(props) {
        const flipped = ref(false);
        const tracks = ref([]);

        async function fetchTracks() {
            const response = await props.spotifyAPI.getAlbumTracks(props.album.id);
            tracks.value = response.items;
        }

        function toggleFlipped() {
            if (!flipped.value) {
                fetchTracks();
            }
            flipped.value = !flipped.value;
        }

        return {
            flipped,
            tracks,
            toggleFlipped,
        };
    },
});
</script>
  
<style scoped>
.album-card-wrapper {
    width: 100%;
    height: 480px;
    padding-top: 100%;
    position: relative;
}

.flip-card {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    perspective: 1000px;
}

.flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.6s;
}

.flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    overflow: hidden;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.flip-card-front {
    transform: rotateY(0deg);
    min-height: 350px;
    max-height: 100%;
}

.flip-card-back {
    transform: rotateY(180deg);
    overflow-y: auto;
    min-height: 350px;
    max-height: 100%;
}

.tracks-list {
    max-height: 80%;
    overflow-y: auto;
}

.flip-card-back-content {
    transform: rotateY(0deg);
}
</style>