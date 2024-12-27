<template>
  <div class="grid grid-cols-subgrid divide-x divide-gray-400 border border-r border-gray-400 col-span-12">
    <div class="col-span-1 flex justify-center items-center h-12">{{ localNurseState?.name }}</div>
    <div class="col-span-1 flex justify-center items-center h-12">{{ localNurseState?.middleName }}</div>
    <div class="col-span-1 flex justify-center items-center h-12">{{ localNurseState?.lastName }}</div>
    <div class="col-end-12 col-start-4 flex justify-center gap-2 items-center h-12" v-if="localNurseState">
      <div v-if="!editMode">{{ localNurseState.department }}</div>
      <UISelect v-else v-model:model-value="localNurseState.department" :options="departmentsRef"></UISelect>
    </div>
    <div class="col-span-1 flex gap-2 justify-center items-center">
      <template v-if="!editMode">
        <button @click="editMode = true"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
            fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
            <path
              d="M12.146 0.354a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-1.394 1.394-3.708-3.708L12.146.354zM1 13.5V16h2.5l7.5-7.5-2.5-2.5L1 13.5z" />
          </svg>
        </button>
      </template>
      <template v-else>
        <button @click="saveUser">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16">
            <g fill="currentColor">
              <path
                d="M0 1.5A1.5 1.5 0 0 1 1.5 0H3v5.5A1.5 1.5 0 0 0 4.5 7h7A1.5 1.5 0 0 0 13 5.5V0h.086a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5H14v-5.5A1.5 1.5 0 0 0 12.5 9h-9A1.5 1.5 0 0 0 2 10.5V16h-.5A1.5 1.5 0 0 1 0 14.5z" />
              <path
                d="M3 16h10v-5.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5zm9-16H4v5.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5zM9 1h2v4H9z" />
            </g>
          </svg>
        </button>
        <button @click="resetChanges">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle"
            viewBox="0 0 16 16">
            <path
              d="M16 8a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-4.97-3.97a.75.75 0 0 1 1.06 1.06L8.06 8l4.99 4.97a.75.75 0 0 1-1.06 1.06L8 9.06 3.03 14l-.01-.01a.75.75 0 0 1-1.06-1.06L7.94 8 2.95 3.03a.75.75 0 0 1 1.06-1.06L8 6.94l4.97-4.97z" />
          </svg>
        </button>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { departments } from '@entities/employers';
import UISelect from '@components/UISelect.vue'
import { type Nurse } from '../entities/employers'

const props = defineProps<{
  nurse?: Nurse
}>()

const localNurseState = ref(props.nurse)
const departmentsRef = ref(departments)

const emit = defineEmits(['save'])


const saveUser = () => {
  emit('save', localNurseState.value)
  editMode.value = false
}

const resetChanges = () => {
  Object.assign(localNurseState, props.nurse)
  editMode.value = false
}
const editMode = ref<boolean>(false)
</script>