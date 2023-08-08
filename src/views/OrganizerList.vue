<template>
  <h1 class="text-center text-3xl font-bold mb-4" >Organizer For Good</h1>
  <main class="flex flex-col items-center">
    <OrganizerCard v-for="event in events" :key="event.id" :event="event"></OrganizerCard>
  </main>
</template>
<script setup lang="ts">
import OrganizerCard from '../components/OrganizerCard.vue'
import type { EventItem } from '@/type';

import { ref } from 'vue'

const events = ref<EventItem[]>([
        {
          id: 5928101,
          category: 'animal welfare',
          title: 'Cat Adoption Day',
          description: 'Find your new feline friend at this event.',
          location: 'Meow Town',
          date: 'January 28, 2022',
          time: '12:00',
          petsAllowed: true,
          organizer: 'Kat Laydee'
        },
        {
          id: 4582797,
          category: 'food',
          title: 'Community Gardening',
          description: 'Join us as we tend to the community edible plants.',
          location: 'Flora City',
          date: 'March 14, 2022',
          time: '10:00',
          petsAllowed: true,
          organizer: 'Fern Pollin'
        },
        {
          id: 8419988,
          category: 'sustainability',
          title: 'Beach Cleanup',
          description: 'Help pick up trash along the shore.',
          location: 'Playa Del Carmen',
          date: 'July 22, 2022',
          time: '11:00',
          petsAllowed: false,
          organizer: 'Carey Wales'
        }
      ])
</script>

<style scoped>
/* .events {
  display: flex;
  flex-direction: column;
  align-items: center;
} */
</style>