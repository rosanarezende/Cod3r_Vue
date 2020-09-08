import Vue from 'vue'
import App from './App'

// --- Várias maneiras de renderizar a aplicação ---

// new Vue({
//   el: "#app",
//   render(createElement) {
//     return createElement(App)
//   }
// })

// new Vue({
//   render(createElement) {
//     return createElement(App)
//   }
// }).$mount("#app")

new Vue({
  render: h => h(App)
}).$mount("#app")
