<template>
    <div class="track-card bg-white text-black shadow-md rounded-lg p-4">
      <div v-for="track in topTracks">
      <h3 class="text-xl font-semibold">{{ track?.name }}</h3>
      <p class="text-sm text-gray-600">Album: {{ track?.album.name }}</p>
      <p class="text-sm text-gray-600">Duration: {{ track?.duration_ms }} ms</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      topTracks: {
        type: Object,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .track-card {
    width: 100%;
  }
  </style>