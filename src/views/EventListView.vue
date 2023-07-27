<template>
  <h1>Events For Good</h1>
  <main class = "events">
    <EventCard v-for="event in events" :key="event.id" :event="event"></EventCard>
    <div class="pagination">
    <RouterLink :to="{ name: 'event-list', query: { page: page-1}}" rel="prev" v-if="page != 1" id="page-prev">
    Prev Page
    </RouterLink>
    
    <RouterLink :to="{ name: 'event-list', query: { page: page+1}}" rel="next" v-if="hasNextPage" id ="page-next">
    Next Page
    </RouterLink>
    </div>
    <select id ="perpage" v-model="perPage">
    <option value="2">2</option>
    <option value="4">4</option>
    <option value="6">6</option>
  </select>
  </main>

</template>

<script setup lang="ts">
import EventCard from '../components/EventCard.vue'

import { ref,computed } from 'vue'

// const events = ref<EventItem[]>([
//   {
//     id: 5928101,
//           category: 'animal welfare',
//           title: 'Cat Adoption Day',
//           description: 'Find your new feline friend at this event.',
//           location: 'Meow Town',
//           date: 'January 28, 2022',
//           time: '12:00',
//           petsAllowed: true,
//           organizer: 'Kat Laydee'
//         },
//         {
//           id: 4582797,
//           category: 'food',
//           title: 'Community Gardening',
//           description: 'Join us as we tend to the community edible plants.',
//           location: 'Flora City',
//           date: 'March 14, 2022',
//           time: '10:00',
//           petsAllowed: true,
//           organizer: 'Fern Pollin'
//         },
//         {
//           id: 8419988,
//           category: 'sustainability',
//           title: 'Beach Cleanup',
//           description: 'Help pick up trash along the shore.',
//           location: 'Playa Del Carmen',
//           date: 'July 22, 2022',
//           time: '11:00',
//           petsAllowed: false,
//           organizer: 'Carey Wales'
//         }
//       ])
import EventService from '@/services/EventService'
import { EventItem } from '@/type';
import { Ref } from 'vue'
import { watchEffect } from 'vue'
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

    EventService.getEvent(2, props.page).then((response: AxiosResponse<EventItem[]>) => {
      events.value = response.data
    })

    watchEffect(() => {
      EventService.getEvent(perPage.value, props.page).then((response: AxiosResponse<EventItem[]>) => {
        events.value = response.data
        totalEvent.value = response.headers['x-total-count']
      })
    })

    const hasNextPage = computed(() => {
      // first calculate the total page
      const totalPages = Math.ceil(totalEvent.value / perPage.value)
      return props.page.valueOf() < totalPages
    })
    
</script>


<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;

}

.pagination {
  display: flex;
  width: 290px;
}

.pagination a{
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
