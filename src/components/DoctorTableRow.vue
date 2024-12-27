<template>
  <div class="grid grid-cols-subgrid divide-x divide-gray-400 border border-r border-gray-400 col-span-12">
    <div class="col-span-1 flex justify-center items-center h-12" v-for="(namePart, index) in fullName">
      <template v-if="!editMode">
        {{ namePart }}
      </template>
      <template v-else>
        <input v-model="fullName[index]" />
      </template>
    </div>
    <div class="col-end-10 col-start-4 flex justify-center gap-2 items-center h-12" v-if="currentDepartment">
      <div v-if="!editMode">{{ currentDepartment }}</div>
      <UISelect v-else v-model:model-value="currentDepartment" :options="departmentsOptions"></UISelect>
    </div>
    <div class="col-auto flex gap-2 justify-center items-center">
        {{ isHeadString }}
    </div>
    <div class="col-auto flex gap-2 justify-center items-center">
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
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16"><g fill="currentColor"><path d="M5.83 5.146a.5.5 0 0 0 0 .708L7.975 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147l2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293L6.536 5.146a.5.5 0 0 0-.707 0z"/><path d="M13.683 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1zm-7.08 1a1 1 0 0 0-.76.35L1 8l4.844 5.65a1 1 0 0 0 .759.35h7.08a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z"/></g></svg>
        </button>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { departments as departmentsOptions, type Department } from '@entities/employers';
import UISelect from '@components/UISelect.vue'
import { type Doctor } from '@entities/employers'

const props = defineProps<{
  doctor: Doctor
}>()

type DoctorFIO = Pick<Doctor, 'name' | 'middleName' |  'lastName'>

const localDoctorState = reactive<Doctor>(Object.assign({}, props.doctor))

const currentDepartment = computed<Department>({
    get: () => props.doctor.department,
    set: (updatedDepartment) => localDoctorState.department = updatedDepartment,
})

const fields: Array<{ key: keyof DoctorFIO; placeholder: string }> = [
  { key: 'name', placeholder: 'Имя' },
  { key: 'middleName', placeholder: 'Отчество' },
  { key: 'lastName', placeholder: 'Фамилия' }, // Обратите внимание, что middleName исключен из полей types DoctorFIO
];

const isHeadString = computed<string>(() => localDoctorState.isHead ? 'Да' : 'Нет')

const fullName = computed({
    get: () => fields.map(field => localDoctorState[field.key as keyof Doctor]),
    set: (values: any[]) => {
        values.forEach((value, index) => {
          localDoctorState[fields[index].key] = value;
        });
      }
})
// Объединенное computed свойство

const emit = defineEmits(['save'])


const saveUser = () => {
  emit('save', localDoctorState)
  editMode.value = false
}

const resetChanges = () => {
  Object.assign(localDoctorState, props.doctor)
  editMode.value = false
}

const editMode = ref<boolean>(false)
</script>