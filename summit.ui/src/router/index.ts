import Vue from 'vue'
import VueRouter, { Route, RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Signin from '../views/auth/Signin.vue' //REV1
import Signout from '../views/auth/Signout.vue' 
import CalibrationList from '../views/calibrations/CalibrationList.vue'
import CalibrationDetail from '../views/calibrations/CalibrationDetail.vue'
import PartsList from '../views/parts/PartsList.vue'
import PartsDetail from '../views/parts/items/PartsDetail.vue'
import RunList from '../views/runs/RunList.vue'
import RunDetail from '../views/runs/RunDetail.vue'
import ProcedureDetail from '../views/runs/procedures/ProcedureDetail.vue'
import VisualizationDetail from '../views/visualization/VisualizationDetail.vue'
import { CookieStorage } from 'cookie-storage';
import { SummitStorage } from '@/utils'
Vue.use(VueRouter)


const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/signout',
    name: 'Sign Out',
    component: Signout,
    meta : {
      requiresAuth: false
    }
  },
  {
    path: '/signin',
    name: 'Sign In',
    component: Signin,
    meta : {
      requiresAuth: false
    }
  },
  {
    path: '/calibrations',
    name:'Calibration List',
    component: CalibrationList,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/calibrations/:id',
    name:'Calibration Detail',
    component: CalibrationDetail,
    meta: {
      requiresAuth: true
    }
  },
    {
      path: '/parts', //REV1 change to parts/:partId/items?
      name:'Parts List', // REV1 Change to Enum
      component: PartsList,
      meta: {
        requiresAuth: true
      }
  },
  {
    path: '/parts/:partNo/items/:partId', 
    name:'Parts Item Info', 
    component: PartsDetail,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/runs',
    name:'Runs List', // REV1 Change to Enum
    component: RunList,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/runs/:id',
    name:'Run Info', // REV1 Change to Enum
    component: RunDetail,
    meta: {
      requiresAuth: true
    }
},
{
  path: '/runs/:id/procedures/:procedureId',
  name:'Procedure Info', // REV1 Change to Enum
  component: ProcedureDetail,
  meta: {
    requiresAuth: true
  }
},
{
  path: '/visualization',
  name:'Visualization', 
  component: VisualizationDetail,
  meta: {
    requiresAuth: true
  }
},
]

const router = new VueRouter({
    mode: "history",
    routes,
    scrollBehavior (to, from, savedPosition) { // eslint-disable-line
      return { x: 0, y: 0 }
    }
})

function requiresAuth (route: Route): boolean {
  return route.matched.some(r => r.meta?.requiresAuth)
}

function isAuthenticated (): boolean {
  // REV1 remove
  const token = SummitStorage.getItem("access_token");
  if (token != null) {
    return true;
  }
  return false;
}

router.beforeEach((to, from, next) => {
  if(requiresAuth(to) && !isAuthenticated()) {
    next({name: 'Sign In'}); //REV1 chnage to enum
  } else {
    next();
  }
})


export default router
