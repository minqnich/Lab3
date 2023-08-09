<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { storeToRefs } from 'pinia';
import { useMessageStore } from './stores/message';
const store = useMessageStore()
const { message } = storeToRefs(store)
</script>

<template>
  <header class="max-h-screen leading-normal text-center ">
    <h1> Nichakamol Sanghong </h1>
    <div id="flashMessage" v-if="message"> 
      <h4 class="font-xl">{{  message  }}</h4>
    </div>
      <nav class="p-8 font-bold-[#2c3e50]">
        <RouterLink :to="{name: 'event-list'}" class="text-black-500  active:text-green-600 focus:text-green-600">Home</RouterLink> |
        <RouterLink :to="{name: 'organizer-list'}" class="text-black-500  active:text-green-600 focus:text-green-600">Organizer</RouterLink> |
        <RouterLink :to="{name: 'about'}" class="text-black-500  active:text-green-600 focus:text-green-600">About</RouterLink> |
        <RouterLink :to="{name: 'student-info'}" class="text-black-500  active:text-green-600 focus:text-green-600">student</RouterLink>

      </nav>
  </header>

  <RouterView />
</template>

<style>
#app{
  font-family: Avenir, Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* header {
  line-height: 1.5;
  max-height: 100vh;
} */

.logo {
  display: block;
  margin: 0 auto 2rem;
}

/* nav {
  padding: 30px;
} */

/* nav a.router-link-exact-active {
  color: #42b983;
} */


/* nav a {
  font-weight: bold;
  color: #2c3e50;
} */

/* h4{
  font-size: 20px;
} */

@keyframes yellowfade{
  from{
    background: yellow;
  }
  to{
    background: transparent;

  }
}

#flashMessage{
  animation: yellowfade 3s ease-in-out;
}
</style>