<template>
  <div
    v-show="showModal"
    class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
    @click="closeModal"
  >
    <transition name="modal">
      <div
        class="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl mx-auto relative text-gray-800 overflow-y-auto h-[80vh]"
        @click.stop
      >
        <button
          @click="closeModal"
          class="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <i class="fas fa-times"></i>
        </button>
        <h2 class="text-2xl font-semibold mb-4">{{ artistName }}</h2>
        <p class="text-sm text-gray-600 mb-6">{{ artistGenres }}</p>
        <p class="text-base">{{ artistBio }}</p>
        <p class="mt-6 text-sm font-semibold">Followers: {{ formattedFollowers }}</p>
      </div>
    </transition>
  </div>
</template>

<script>

export default {
  props: {
    artistName: String,
    artistGenres: Array,
    artistBio: String,
    formattedFollowers: String,
    showModal: Boolean,
  },
  emits: ['update:showModal'],
  setup(props, { emit }) {
    function closeModal() {
      emit('update:showModal', false);
    }

    return {
      closeModal,
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