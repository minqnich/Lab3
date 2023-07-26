<template>
    <div class="student-class">
      <div class="student-card">
        <span>Name: {{ student.name }}</span>
        <span>Surname: {{ student.surname }}</span>
        <p>GPA: {{ student?.gpa }}</p>
      </div>
    </div>
  </template>
  <script lang="ts" setup>
  import type { studentInfo } from '@/info'
  import type { PropType } from 'vue'

  const props = defineProps({
    student: {
      type: Object as PropType<studentInfo>,
      required: true
    }
  })
  </script>
  <style>
  .student-card {
    padding: 20px;
    width: 250px;
    cursor: pointer;
    border: 1px solid #39495c;
    margin-bottom: 18px;
  }
  .student-card:hover {
    transform: scale(1.01);
    box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
  }
  </style>