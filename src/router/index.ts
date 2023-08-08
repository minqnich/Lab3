import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventListView.vue'
import AboutView from '../views/AboutView.vue'
import OrganizerListView from '../views/OrganizerList.vue'
import StudentView from '../views/StudentView.vue'
import EventDetailView from '../views/event/EventDetailView.vue'
import EventEditView from '@/views/event/EventEditView.vue'
import EventRegisterView from '@/views/event/EventRegisterView.vue'
import EventLayoutView from '@/views/event/EventLayoutView.vue'
import Nprogress from 'nprogress'
import EventService from '@/services/EventService'
import { useEventStore } from '@/stores/event'
import NotFoundView from '@/views/NotFoundView.vue'
import NetworkErrorView from '@/views/NetWorkErrorView.vue'

const router = createRouter({
  
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventListView,
      props: (route) => ({page: parseInt(route.query?.page as string || '1') })
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/AboutView.vue')
      component: AboutView
    },
    {
      path: '/organizer',
      name: 'organizer-list',
      component: OrganizerListView
    },
    {
      path: '/student',
      name: 'student-info',
      component: StudentView
    },
    {
      path: '/event/:id',
    //   name: 'event-detail',
    //   component: EventDetailView,
    //   props: true
    // },
    // {
    //   path: '/event/:id/edit',
    //   name: 'event-edit',
    //   props: true,
    //   component: EventEditView
    // },
    // {
    //   path: '/event/:id/register',
    //   name: 'event-register',
      name: 'event-layout',
      component: EventLayoutView,
      props: true,
        beforeEnter: (to) => {
          // <-- put API call here
          const id: number = parseInt(to.params.id as string)
          const eventStore = useEventStore()
          return EventService.getEventById(id)
          .then((response) => {
            // need to set up the data for the component
            eventStore.setEvent(response.data)
          })
          .catch((error) => {
            if (error.response && error.response.status === 404) {
              return {
                name: '404-resource',
                params: { resource: 'event' }
              }
            }else{
              return { name: 'network-error'}
            }
          })
        },
      // component: EventRegisterView
      children: [
        {
          path: '',
          name: 'event-detail',
          component: EventDetailView,
          props: true
        },
        {
          path: 'edit',
          name: 'event-edit',
          props: true,
          component: EventEditView
        },
        {
          path: 'register',
          name: 'event-register',
          props: true,
          component: EventRegisterView
        }
      ]
    },{
      path: '/404/:resource',
      name: '404-resource',
      component: NotFoundView,
      props:true
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView
    },
    {
      path: '/network-error',
      name: 'network-error',
      component: NetworkErrorView
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0}
    }
   
  }
})
router.beforeEach(()=>{
  Nprogress.start()
})

router.afterEach(()=>{
  Nprogress.done()
})

export default router