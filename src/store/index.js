import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: sessionStorage.getItem("token"),
    userInfo: JSON.parse(sessionStorage.getItem("userInfo")),
    index_show: true,
    isAdmin: JSON.parse(sessionStorage.getItem("isAdmin"))
  },
  mutations: {
    // set
    SET_TOKEN: (state, token) => {
      state.token = token
      sessionStorage.setItem("token", token)
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
      sessionStorage.setItem("userInfo", JSON.stringify(userInfo))
    },
    REMOVE_INFO: (state) => {
      state.token = ''
      state.userInfo = {}
      sessionStorage.setItem("token", '')
      sessionStorage.setItem("userInfo", JSON.stringify(''))
    },
    SET_INDEX: (state, bool) => {
      state.index_show = bool
    },
    SET_ADMIN: (state, bool) => {
      state.isAdmin = bool;
      sessionStorage.setItem("isAdmin", JSON.stringify(bool))
    }

  },
  getters: {
    // get
    getUser: state => {
      return state.userInfo
    },
    getIndex: state => {
      return state.index_show
    },
    getAdmin: state => state.isAdmin,
    getToken: state => state.token
  },
  actions: {
  },
  modules: {
  }
})