<template>
  <h1 class="text-center text-3xl font-bold mb-4" >Events For Good</h1>
  <main class="flex flex-col items-center">
    <EventCard v-for="event in events" :key="event.id" :event="event"></EventCard>
    <div class="flex w-290 pagination mt-4">
      <RouterLink :to="{name: 'event-list', query: {page: page - 1} }" rel="prev" v-if="page != 1" id="page-prev" class="text-left mr-auto">Prev Page</RouterLink>
      <RouterLink :to="{name: 'event-list', query: {page: page + 1} }" rel="next" v-if="hasNextPage" id="page-next" class="text-right ml-auto">Next Page</RouterLink>
    </div>
    <select id="perpage" v-model="perPage">
      <option value="2">2</option>
      <option value="4">4</option>
      <option value="6">6</option>
     </select>
  </main>
</template>
<script setup lang="ts">
import EventCard from '../components/EventCard.vue'
import type { EventItem } from '@/type';
import type { Ref } from 'vue'
import { computed, ref, watchEffect } from 'vue'
import EventService from '@/services/EventService'
import type { AxiosResponse } from 'axios';
import NProgress from 'nprogress'
import { useRouter } from 'vue-router';
import { onBeforeRouteUpdate } from 'vue-router';
const events: Ref<Array<EventItem>> = ref([])
// EventService.getEvent().then((response) => {
//   events.value = response.data
// })
const totalEvent = ref<number>(0)
const perPage = ref<number>(2)
const props = defineProps({
  page: {
    type: Number,
    required: true
  }
})
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvent.value / 3)
  return props.page.valueOf() < totalPages
})
const router = useRouter ()
NProgress
EventService.getEvent(3, props.page).then((response: AxiosResponse<EventItem[]>) => {
  events.value = response.data
  totalEvent.value = response.headers['x-total-count']
}).catch(() => {
  router.push({ name: 'NetworkError' })
})
onBeforeRouteUpdate((to, from, next) => {
  const toPage = Number(to.query.page)
  EventService.getEvent(3, toPage).then((response: AxiosResponse<EventItem[]>) => {
  events.value = response.data
  totalEvent.value = response.headers['x-total-count']
  next()
  }).catch(() => {
    next({ name: 'NetworkError' })
  })
})
</script>

<style scoped>

/* .pagination{
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
} */

</style>