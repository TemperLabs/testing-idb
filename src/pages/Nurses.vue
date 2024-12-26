<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { useIDBKeyval } from '@vueuse/integrations/useIDBKeyval';
import type { Nurse } from '@entities/employers';
// import employees from '../mock/employees.json'
import NurseTableRow from '@components/NurseTableRow.vue';

// const nurses = ref<Array<Nurse>>([])
const { data: nursesArr } = useIDBKeyval('users-db', [] as Nurse[])

// awaiting IDB transaction
const fetchData = async () => {
  try {
    const response = await fetch('/mock/employees.json'); // Укажите путь к вашему mock json файлу
    const data = await response.json();

    // Обновление хранимого объекта
    nursesArr.value = data.nurses; // или storedObject.value = { ...storedObject.value, ...data } для объединения с существующими данными
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
  }
};

const updateNurse = (updatedNurse: Nurse) => {
  const index = nursesArr.value.findIndex(nurse => nurse.id === updatedNurse.id);
  nursesArr.value[index] = updatedNurse
}

onMounted(async () => {
  await fetchData()
})
</script>
<template>
  <div class="flex justify-center  bg-sky-900 p-4">
    <div class="container grid bg-slate-800" ref="scrollableDiv">
      <header class="grid grid-cols-subgrid col-span-12 divide-x divide-gray-400 border-t border-x border-gray-400">
        <div class="col-span-1 flex justify-center items-center h-12">Имя</div>
        <div class="col-span-1 flex justify-center items-center h-12">Отчество</div>
        <div class="col-span-1 flex justify-center items-center h-12">Фамилия</div>
        <div class="col-span-4 flex justify-center gap-2 items-centerh-12">Отделение</div>
      </header>
      <NurseTableRow v-for="nurse in nursesArr" :nurse="nurse" :key="nurse.id" @save="updateNurse(nurse)" />
    </div>
  </div>
</template>