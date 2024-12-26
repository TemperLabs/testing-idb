<template>
  <div class="relative inline-block text-left">
    <div>
      <button
        @click="toggleDropdown"
        class="inline-flex justify-center w-full border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        id="options-menu"
        aria-haspopup="true"
        aria-expanded="true"
      >
        {{ selectedOption }}
        <svg
          class="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>

    <div
      v-if="isOpen"
      class="absolute z-10 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="options-menu"
    >
      <div class="py-1" role="none">
        <template v-for="(option) in options">
          <div
            @click="updateValue(option)"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            {{ option }}
        </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T">
import { ref, watch } from 'vue';

const props = defineProps<{
  modelValue: T;
  options: Array<T>;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: T]
}>()

const selectedOption = ref(props.modelValue);

const updateValue = (option: T) => {
  selectedOption.value = option
  emit('update:modelValue', selectedOption.value);
};

const isOpen = ref(false)

const toggleDropdown = () => isOpen.value = !isOpen.value

watch(() => props.modelValue, (newValue) => {
  selectedOption.value = newValue;
});
</script>