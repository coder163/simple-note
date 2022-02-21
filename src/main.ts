import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


import './assets/styles/public.css'

import { library } from '@fortawesome/fontawesome-svg-core'
// import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'

import { far } from '@fortawesome/free-regular-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas, far)

createApp(App).component("font-awesome-icon", FontAwesomeIcon).use(router).mount('#app')
