<script setup lang="ts">
import { onMounted } from 'vue';
import { useIDBKeyval } from '@vueuse/integrations/useIDBKeyval';
import type { Doctor } from '@entities/employers';
import DoctorTableRow from '@components/DoctorTableRow.vue';

// const doctors = ref<Array<Doctor>>([])
const { data: doctors } = useIDBKeyval('doctors-db', [] as Doctor[])

const fetchData = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_APP_BASE_URL}mock/employees.json`); // Укажите путь к вашему mock json файлу
    const data = await response.json();

    // Обновление хранимого объекта
    doctors.value = data.doctors; // или storedObject.value = { ...storedObject.value, ...data } для объединения с существующими данными
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
  }
};

const updateDoctor = (updatedNurse: Doctor) => {
  const index = doctors.value.findIndex(nurse => nurse.id === updatedNurse.id);
  doctors.value[index] = updatedNurse
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
      <DoctorTableRow v-for="doctor in doctors" :doctor="doctor" :key="doctor.id" @save="updateDoctor(doctor)" />
    </div>
  </div>
</template>