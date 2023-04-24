<template>
  <div class="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto text-gray-800 h-[325px]">
    <h2 class="text-2xl font-semibold mb-4">{{ artistName }}</h2>
    <p class="text-sm text-gray-600 mb-6">{{ artistGenres }}</p>
    <p class="text-base">{{ truncatedBio }}</p>
    <p class="mt-6 text-sm font-semibold">Followers: {{ formattedFollowers }}</p>
    <button
      @click="$emit('open-modal')"
      class="mt-4 text-sm text-blue-600 font-semibold hover:text-blue-800"
    >
      Show more
    </button>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  props: {
    artistName: String,
    artistGenres: Array,
    artistBio: String,
    formattedFollowers: String,
    showModal: Boolean,
  },
  emits: ['update:showModal', 'open-modal'],
  setup(props, { emit }) {
    const truncatedBio = computed(() => {
      return props.artistBio.slice(0, 250) + (props.artistBio.length > 250 ? '...' : '');
    });

    function closeModal() {
      emit('update:showModal', false);
    }

    return {
      closeModal,
      truncatedBio,
    };
  },
};
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}
.modal-enter,
.modal-leave-to {
  transform: scale(0.9);
  opacity: 0;
}
</style>