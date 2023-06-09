<template>
    <div v-if="artistData" class="bg-gray-900 text-white">
        <div class="container flex flex-col mx-auto md:flex-row items-center gap-8 py-12 md:flex">
            <img v-if="artistData.images && artistData.images.length > 0" :src="artistData.images[0].url"
                :alt="artistData.name"
                class="w-full md:w-1/2 h-auto object-cover rounded-lg shadow-md mb-8 md:mb-0 flex-grow" />

            <div class="flex flex-col xl:flex-row xl:items-start gap-8 flex-grow">
                <ArtistBioCard :artist-name="artistName" :artist-bio="artistBio" :formatted-followers="formattedFollowers"
                :showModal="showModal" @open-modal="showModal = true" class="flex-grow" />
            <ArtistBioModal v-if="showModal" :artistName="artistName" :artistGenres="artistGenres" :artistBio="artistBio"
                :formattedFollowers="formattedFollowers" :showModal="showModal" @open-modal="showModal = true"
                @update:showModal="showModal = $event" class="flex-grow" />
            <MonthlyPlays class="flex-grow" />
            <!-- <TopTracksCard class="flex-grow" :top-tracks="topTracks"/> -->
            </div>
        </div>

        <!-- <div class="z-50">
            <PopOutPlayer :access-token="accessToken" :device-id="deviceId" :artist-data="artistData" :is-playing="isPlaying" />
        </div> -->

        <div class="container mx-auto py-12">
            <h2 class="text-3xl font-bold mb-8">Albums</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                <AlbumCard v-for="album in artistAlbums" :key="album.id" :album="album" :albumTracks="albumTracks"
                    @mouseover="fetchAlbumTracks(album.name)" />
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, computed, onBeforeMount, ref } from 'vue';
import { useArtistStore } from '@/stores/artistStore';
import { useAlbumStore } from '@/stores/albumStore';
import { useTrackStore } from '@/stores/trackStore';
import { useAuthStore } from '@/stores/authStore';
import { useRoute } from 'vue-router';
import AlbumCard from '@/components/AlbumCard.vue';
import ArtistBioCard from '@/components/ArtistBioCard.vue';
import MonthlyPlays from '@/components/MonthlyPlays.vue';
import ArtistBioModal from '../components/ArtistBioModal.vue';
// import TopTracksCard from '../components/TopTracksCard.vue';
// import PopOutPlayer from '../components/PopOutPlayer.vue';

export default defineComponent({
    components: {
        AlbumCard,
        ArtistBioCard,
        MonthlyPlays,
        ArtistBioModal,
       // TopTracksCard,
       // PopOutPlayer
    },
    setup() {
        const route = useRoute();
        const artistStore = useArtistStore();
        const albumStore = useAlbumStore();
        const trackStore = useTrackStore();
        const authStore = useAuthStore();
        const artistData = computed(() => artistStore.currentArtist);
        const artistAlbums = computed(() => artistStore.currentArtistAlbums);
        const artistName = computed(() => artistStore.currentArtist.name);
        const showModal = ref(false)
        const artistBio = computed(() => {
            if (artistStore.artistBio && artistStore.artistBio.artist && artistStore.artistBio.artist.bio) {
                return artistStore.artistBio.artist.bio.content;
            } else {
                return '';
            }
        });
        const albumTracks = computed(() => albumStore.tracks);
        const topTracks = computed(() => trackStore.topTracks);
        const accessToken = computed(() => authStore.accessToken);
        const deviceId = ref('');

        const formattedFollowers = computed(() => {
            return new Intl.NumberFormat().format(artistData.value?.followers?.total || 0);
        });

        const fetchArtistById = async (id) => {
            await artistStore.fetchArtistById(id);
        };

        const fetchArtistAlbums = async (id) => {
            await artistStore.fetchArtistAlbums(id);
        };

        const fetchAlbumTracks = async (albumName) => {
            await albumStore.fetchTracks(artistName.value, albumName);
        };

        const fetchArtistBio = async (name) => {
            await artistStore.fetchArtistBio(name);
        };

        const fetchTopTracks = async (id) => {
            await trackStore.fetchTopTracks(id);
        };

        onBeforeMount(async () => {
            await fetchArtistById(route.params.id);
            await fetchArtistAlbums(route.params.id);
            await fetchArtistBio(artistName.value);
            await fetchTopTracks(route.params.id);
        });

        return {
            artistData,
            artistAlbums,
            formattedFollowers,
            artistBio,
            artistName,
            showModal,
            albumTracks,
            fetchAlbumTracks,
            topTracks,
            accessToken,
            deviceId
        };
    },
});
</script>