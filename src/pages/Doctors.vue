<script setup lang="ts">
import { watch } from 'vue';
import { useIDBKeyval } from '@vueuse/integrations/useIDBKeyval';
import type { Doctor } from '@entities/employers';
import DoctorTableRow from '@components/DoctorTableRow.vue';

// const doctors = ref<Array<Doctor>>([])
const { data: doctors, set, isFinished } = useIDBKeyval('doctors-db', [] as Doctor[])

const fetchData = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/mock/doctors.json`);
    const data = await response.json();

    // Обновление хранимого объекта
    doctors.value = data.doctors;
    await set(doctors.value)
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
  }
};

const updateDoctor = async (updatedNurse: Doctor) => {
  const index = doctors.value.findIndex(nurse => nurse.id === updatedNurse.id);
  doctors.value[index] = updatedNurse
  await set(doctors.value)
}

watch( () => isFinished.value, async (val) => {
  if (val && !doctors.value.length) {
    await fetchData()
  }
}, {immediate: true})
</script>
<template>
  <div class="flex flex-col justify-center bg-sky-900 p-4 overflow-hidden h-full">
    <div class="relative container grid bg-slate-800 overflow-auto max-h-full divide-x divide-y divide-gray-400"
      ref="scrollableDiv">
      <header
        class="grid grid-cols-subgrid grid-rows-2 md:grid-rows-1 col-span-12 divide-x divide-y divide-gray-400 border-x border-y border-gray-400 bg-blue-800 text-cyan-200 sticky top-0">
        <div class="col-span-4 lg:col-span-1 flex justify-center items-center h-12 border-t border-gray-400">Имя</div>
        <div class="col-span-4 lg:col-span-1 flex justify-center items-center h-12">Отчество</div>
        <div class="col-span-4 col-end-13 lg:col-span-1 flex justify-center items-center h-12">Фамилия</div>
        <div class="col-start-1 lg:col-start-4 col-end-11 lg:col-end-11 flex justify-center gap-2 items-center h-12">
          Отделение</div>
        <div class="col-span-1 flex justify-center items-center h-12">Заведующий</div>
        <div class="col-span-1 flex justify-center gap-2 items-center h-12">Действия</div>
      </header>
      <DoctorTableRow v-for="doctor in doctors" :doctor="doctor" :key="doctor.id" @save="updateDoctor(doctor)" />
    </div>
  </div>
</template>