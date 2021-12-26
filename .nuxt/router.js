import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _fb063696 = () => interopDefault(import('..\\pages\\admin.vue' /* webpackChunkName: "pages/admin" */))
const _77ad6578 = () => interopDefault(import('..\\pages\\admin\\login.vue' /* webpackChunkName: "pages/admin/login" */))
const _1d442daa = () => interopDefault(import('..\\pages\\cart.vue' /* webpackChunkName: "pages/cart" */))
const _6c326b0c = () => interopDefault(import('..\\pages\\dashboard.vue' /* webpackChunkName: "pages/dashboard" */))
const _cf38a670 = () => interopDefault(import('..\\pages\\dashboard\\index.vue' /* webpackChunkName: "pages/dashboard/index" */))
const _cc56edb0 = () => interopDefault(import('..\\pages\\dashboard\\createOrder.vue' /* webpackChunkName: "pages/dashboard/createOrder" */))
const _027df806 = () => interopDefault(import('..\\pages\\dashboard\\deliveried-orders\\index.vue' /* webpackChunkName: "pages/dashboard/deliveried-orders/index" */))
const _8d619a84 = () => interopDefault(import('..\\pages\\dashboard\\order\\index.vue' /* webpackChunkName: "pages/dashboard/order/index" */))
const _a51b4406 = () => interopDefault(import('..\\pages\\dashboard\\product\\index.vue' /* webpackChunkName: "pages/dashboard/product/index" */))
const _564ca8f3 = () => interopDefault(import('..\\pages\\dashboard\\product\\addProduct.vue' /* webpackChunkName: "pages/dashboard/product/addProduct" */))
const _fc052046 = () => interopDefault(import('..\\pages\\dashboard\\product\\images.vue' /* webpackChunkName: "pages/dashboard/product/images" */))
const _303266b4 = () => interopDefault(import('..\\pages\\dashboard\\order\\_id.vue' /* webpackChunkName: "pages/dashboard/order/_id" */))
const _71dc2fe6 = () => interopDefault(import('..\\pages\\product\\index.vue' /* webpackChunkName: "pages/product/index" */))
const _12c2fdd9 = () => interopDefault(import('..\\pages\\user\\order\\index.vue' /* webpackChunkName: "pages/user/order/index" */))
const _c30ebafe = () => interopDefault(import('..\\pages\\user\\order\\_id.vue' /* webpackChunkName: "pages/user/order/_id" */))
const _4b8f6df7 = () => interopDefault(import('..\\pages\\find\\_name.vue' /* webpackChunkName: "pages/find/_name" */))
const _e3b6ec96 = () => interopDefault(import('..\\pages\\product\\_id.vue' /* webpackChunkName: "pages/product/_id" */))
const _510d90b8 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/admin",
    component: _fb063696,
    name: "admin",
    children: [{
      path: "login",
      component: _77ad6578,
      name: "admin-login"
    }]
  }, {
    path: "/cart",
    component: _1d442daa,
    name: "cart"
  }, {
    path: "/dashboard",
    component: _6c326b0c,
    children: [{
      path: "",
      component: _cf38a670,
      name: "dashboard"
    }, {
      path: "createOrder",
      component: _cc56edb0,
      name: "dashboard-createOrder"
    }, {
      path: "deliveried-orders",
      component: _027df806,
      name: "dashboard-deliveried-orders"
    }, {
      path: "order",
      component: _8d619a84,
      name: "dashboard-order"
    }, {
      path: "product",
      component: _a51b4406,
      name: "dashboard-product"
    }, {
      path: "product/addProduct",
      component: _564ca8f3,
      name: "dashboard-product-addProduct"
    }, {
      path: "product/images",
      component: _fc052046,
      name: "dashboard-product-images"
    }, {
      path: "order/:id",
      component: _303266b4,
      name: "dashboard-order-id"
    }]
  }, {
    path: "/product",
    component: _71dc2fe6,
    name: "product"
  }, {
    path: "/user/order",
    component: _12c2fdd9,
    name: "user-order"
  }, {
    path: "/user/order/:id",
    component: _c30ebafe,
    name: "user-order-id"
  }, {
    path: "/find/:name?",
    component: _4b8f6df7,
    name: "find-name"
  }, {
    path: "/product/:id",
    component: _e3b6ec96,
    name: "product-id"
  }, {
    path: "/",
    component: _510d90b8,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
