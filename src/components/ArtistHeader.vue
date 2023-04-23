<template>
    <div class="container mx-auto py-12">
      <div class="w-full md:w-1/2">
        <img
          :src="artistData.images[0].url"
          :alt="artistData.name"
          class="w-full h-auto object-cover rounded-lg shadow-md"
        />
      </div>
    </div>
  </template>
  
<script>
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        artistData: {
            type: Object,
            required: true,
        },
    },
});
</script>