<script setup lang="ts">
import { watch } from 'vue';

import { useIDBKeyval } from '@vueuse/integrations/useIDBKeyval';
import type { Nurse } from '@entities/employers';
import NurseTableRow from '@components/NurseTableRow.vue';

const { data: nurses, set, isFinished} = useIDBKeyval('nurses-db', [] as Nurse[])

// awaiting IDB transaction
const fetchData = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/mock/nurses.json`);
    const data = await response.json();

    // Обновление хранимого объекта
    nurses.value = data.nurses; // или storedObject.value = { ...storedObject.value, ...data } для объединения с существующими данными
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
  }
};

const updateNurse = async (updatedNurse: Nurse) => {
  const index = nurses.value.findIndex(nurse => nurse.id === updatedNurse.id);
  nurses.value[index] = updatedNurse
  await set(nurses.value)
}

watch( () => isFinished.value, async (val) => {
  if (val && !nurses.value.length) {
    await fetchData()
  }
}, {immediate: true})
</script>
<template>
  <div class="flex justify-center bg-sky-900 p-4 overflow-hidden h-full">
    <div class="container grid bg-slate-800 overflow-y-auto max-h-full" ref="scrollableDiv">
      <header class="grid grid-cols-subgrid col-span-12 divide-x divide-gray-400 border-t border-x border-gray-400">
        <div class="col-span-1 flex justify-center items-center h-12">Имя</div>
        <div class="col-span-1 flex justify-center items-center h-12">Отчество</div>
        <div class="col-span-1 flex justify-center items-center h-12">Фамилия</div>
        <div class="col-end-12 col-start-4 flex justify-center gap-2 items-center h-12">Отделение</div>
        <div class="col-auto flex justify-center gap-2 items-center h-12">Действия</div>
      </header>
      <NurseTableRow v-for="nurse in nurses" :nurse="nurse" :key="nurse.id" @save="updateNurse(nurse)" />
    </div>
  </div>
</template>