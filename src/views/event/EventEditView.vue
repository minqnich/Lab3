<script setup lang="ts">
import type { Ref } from 'vue'
import { type EventItem } from '@/type'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'

import type { PropType } from 'vue'
const props = defineProps({
    event: {
        type: Object as PropType<EventItem>,
            require: true
    }
})
const router = useRouter()
const store = useMessageStore()
function edit(){
    store.updateMessage(props.event?.title + ' The data has been update')
    setTimeout(() => {
        store.resetMessage()
    },3000)
    router.push({
        name: 'event-detail',
        params: {
            id: props.event?.id
        }
    })
}

</script>
<template>
        <p>Edit the event here</p>
        <button @click="edit">Edit</button>
</template>

