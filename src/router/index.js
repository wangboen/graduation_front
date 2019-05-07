import Vue from 'vue'
import Router from 'vue-router'
import List from '@/components/List'
import Transaction from '@/components/Transaction'
import Authorization from '@/components/Authorization'
import Information from '@/components/Information'
import Message from '@/components/Message'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: List
    },
    {
      path: '/list',
      name: 'List',
      component: List
    },
    {
      path: '/transaction',
      name: 'Transaction',
      component: Transaction
    },
    {
      path: '/authorization',
      name: 'Authorization',
      component: Authorization
    },
    {
      path: '/information',
      name: 'information',
      component: Information
    },
    {
      path: '/message',
      name: 'message',
      component: Message
    }
  ]
})
