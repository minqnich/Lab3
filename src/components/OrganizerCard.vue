<template>
    <div class="event-class">
      <div class="event-card">
        <h3>@{{ event?.organizer }} on {{ event?.category }}</h3>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  // import { ref } from 'vue'
  // import { type EventItem } from '@/type'
  // const event = ref<EventItem>({
  //   id: 5928101,
  //   category: 'animal welfare',
  //   title: 'Cat Adoption Day',
  //   description: 'Find your new feline friend at this event',
  //   location: 'Meow Town',
  //   date: 'January 28, 2022',
  //   time: '12:00',
  //   petsAllowed: true,
  //   organizer: 'Kat Laydee'
  import type { EventItem } from '@/type';
  import type { PropType } from 'vue'
  const props = defineProps({
      event: {
          type: Object as PropType<EventItem>,
          require: true
      }
      })
  </script>
  
  <style scoped>

  h3{
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: right;
    color: #2c3e50;
  }
  .event-card {
    padding: 20px;
    width: 250px;
    cursor: pointer;
    border: 1px solid #39495c;
    margin-bottom: 18px;
  }
  
  .event-card:hover {
    transform: scale(1.01);
    box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
  }
  </style>
  