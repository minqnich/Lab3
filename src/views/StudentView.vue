<template>
  <div class="flex flex-col items-center">
    <StudentCard
      v-for="student in students"
      :key="student.id"
      :student="student"
    ></StudentCard>
  </div>
</template>
<script lang="ts" setup>
import StudentCard from "../components/StudentCard.vue";
import type { studentInfo } from "@/info";
import { ref, type Ref } from "vue";
import StudentsInfoServices from "@/services/StudentsInfoService";

const students: Ref<Array<studentInfo>> = ref([]);

  StudentsInfoServices.getStudent().then((response) => {
  students.value = response.data;
  console.log(students.value)
});
// StudentsInfoServices.getStudent_page(2, props.page).then((response) => {
//   students.value = response.data;
//   console.log(students.value)
// });
</script>
<style>
/* .student {
  display: flex;
  flex-direction: column;
  align-items: center;
} */
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}
#page-prev {
  text-align: left;
}
#page-next {
  text-align: right;
}
</style>