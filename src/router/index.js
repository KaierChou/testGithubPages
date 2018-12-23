import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/index.vue'

Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue')
  },
  {
    path: '/licenseagreement',
    name: 'licenseagreement',
    component: () => import('../views/license-agreement.vue')
  },
  {
    path: '/organizationlist',
    name: 'organizationlist',
    component: () => import('../views/organization-list.vue')
  },
  {
    path: '/personcenter',
    name: 'personcenter',
    component: () => import('../views/person-center/index.vue')
  },
  {
    path: '/person-center/take-appoint',
    name: 'takeappoint',
    component: () => import('../views/person-center/take-appoint.vue')
  },
  {
    path: '/person-center/exam-order',
    name: 'exam-order',
    component: () => import('../views/person-center/medical-orders.vue')
  },
  {
    path: '/appointresult',
    name: 'appointresult',
    component: () => import('../views/appoint-result.vue')
  },
  {
    path: '/appoint-detail',
    name: 'appointdetail',
    component: () => import('../views/appoint-detail.vue')
  },
  {
    path: '/apply',
    name: 'apply',
    component: () => import(/* webpackChunkName: "apply" */ '../views/apply.vue')
  },
  {
    path: '/city-list',
    name: 'city-list',
    component: () => import(/* webpackChunkName: "apply" */ '../views/city-list.vue')
  },
  {
    path: '/order-detail',
    name: 'order-detail',
    component: () => import(/* webpackChunkName: "apply" */ '../views/order-detail.vue')
  },
  {
    path: '/custom-add-items',
    name: 'custom-add-items',
    component: () => import(/* webpackChunkName: "custom-package" */ '../views/custom-pages/custom-add-items.vue')
  },
  {
    path: '/custom-package',
    name: 'custom-package',
    component: () => import(/* webpackChunkName: "custom-package" */ '../views/custom-pages/custom-package.vue')
  },
  {
    path: '/custom-package-detail/:id',
    name: 'custom-package-detail',
    component: () => import(/* webpackChunkName: "custom-package" */ '../views/custom-pages/custom-package-detail.vue')
  }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
