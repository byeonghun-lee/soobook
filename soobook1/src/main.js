import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'Vuex'
import {routes} from './routes'
import App from './App.vue'

Vue.use(VueRouter)
// Vue.use(Vuex)
//
// const store = new Vuex.Store({
//   state: {
//     items:[],
//   },
//   mutations: {
//     showMyBooks(){
//       var _this = this;
//       var items = this.items;
//       var token = 'Token ' + getCookie('SoobookToken');
//       // console.log('book_id:',this.book_id);
//       $.ajax({
//         url: "https://soobook.devlim.net/api/book/mybook/",
//         dataType: "	json",
//         type: "GET",
//         headers: {
//           Authorization: token,
//         },
//         success: function(data) {
//           // var mybooks = data.results.book;
//           console.log('성공 :', data);
//           console.log('책리스트 :', data.results);
//           for(var i = 0; i< data.results.length; i++){
//           console.log(data.results[i]);
//           items.push(data.results[i]);
//         }
//       },
//
//         error: function(error){
//           console.error('실패..:', error);
//           console.log('data:',data);
//         }
//       })
//     },
//
//   }
// });


const router = new VueRouter({
  mode: 'history',
  routes,
});

new Vue({
  el: '#app',
  router,
  // store,

  render: h => h(App)
})
// export default new Vuex.Store({
//   state,
//   mutations
// })
