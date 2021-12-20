import VueClipboards from "vue-clipboards";
import axios from "axios";

export default {

    vue: {
      config: {
        productionTip: true,
        devtools: true
      }
    },


    env: {
      imageBaseURL: process.env.imageBaseURL || 'http://localhost:9001'
    },

  ssr: false,
  // mode:'spa',
  server: {
    host: "0.0.0.0"
  },
  head: {
    title: "Estore | Online Shopping",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
      },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"
      },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
      },
      
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#008187" },
  /*
   ** Global CSS
   */
  css: ['@/assets/css/main.css', "~/assets/scss/main", "@mdi/font/css/materialdesignicons.css"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: "@/plugins/vuex-persistedstate", ssr: false },
    { src: "@/plugins/imageeditor", ssr: false },
    { src: "@/plugins/chart", ssr: false },
    { src: "@/plugins/vuecarasoul", ssr: false },
    { src: "@/plugins/vue-html2pdf", ssr: false },
    { src: "@/plugins/headerScroll", ssr: false },
    { src: "@/plugins/countdown", ssr: false },
    { src: "@/plugins/v-tooltip", ssr: false },
    // { src: "@/plugins/toast", ssr: false },
    { src: "@/plugins/hover" },
    { src: "@/plugins/axios" },
    { src: "@/plugins/clipboard" },
    { src: "@/plugins/vueSlick" },
    { src: "@/plugins/Autocomplete",ssr: false},
    { src: "@/plugins/lightbox",ssr: false}
  ],




  buildModules: ["@nuxtjs/vuetify", '@nuxt/postcss8', '@nuxtjs/dotenv'],
  modules: ["@nuxtjs/axios", "@nuxtjs/svg",'nuxt-sweetalert2',
  'cookie-universal-nuxt',
  "vue2-editor/nuxt",
  '@nuxtjs/redirect-module',
  ['nuxt-lazy-load', {
    // These are the default values
    images: true,
    videos: true,
    audios: true,
    iframes: true,
    native: false,
    polyfill: true,
    directiveOnly: false,
    
    // Default image must be in the static folder
    defaultImage: '/loading.gif',

    // To remove class set value to false
    loadingClass: 'isLoading',
    loadedClass: 'isLoaded',
    appendClass: 'lazyLoad',
    
    observerConfig: {
      // See IntersectionObserver documentation
    }
  }]


],

  axios: {
    baseURL: "http://localhost:9001/api/",
   
  },
 

  vuetify: {
    customVariables: ["~/assets/variables.scss"],

    iconfont: "mdi",
    theme: {
      dark: false,
      themes: {
        light: {
          primary: "#FF1493",
          secondary: "#E6E6FA",
          sailor: "#FF1493",
          sailor2: "#E6E6FA",
          error:"#f6821f",
          danger:"#C9151B",
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
   postcss: {
     plugins: {
       tailwindcss: {},
       autoprefixer: {},
     },
   },
    extend(config, ctx) {}
  }
};
