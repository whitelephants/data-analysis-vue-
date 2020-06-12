import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
 
const store = new Vuex.Store({
 
  state: {
    // 存储usernane
    name: localStorage.getItem('name') ? localStorage.getItem('name') : '',
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
  },
 
  mutations: {
    // 修改usernane，并将usernane存入localStorage
    changeLogin (state, user) {
      state.name = user.name;
      localStorage.setItem('name', user.name);
    },
    changeAuthorization (state, user) {
        state.Authorization = user.Authorization;
        localStorage.setItem('Authorization', user.Authorization);
      }
  }
});
 
export default store;