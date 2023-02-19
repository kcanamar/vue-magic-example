import { createStore } from 'vuex'
// create a variable for our persisted state
import createPersistedState from "vuex-persistedstate"
import router from '../router'
// destructure the magic-sdk for parts needed
import { Magic, SDKError, RPCError, ExtensionError } from "magic-sdk"

// grab the public key from .env.local, and create a new Magic instance
const magicKey = new Magic(process.env.VUE_APP_MAGIC_API_KEY)

export default createStore({
  state: {
    // define default values here
    // user is null so long as no user has signed in
    user: null
  },
  mutations: {
    // tracks changes made to the store's state
    setUser(state, userData) {
      // when a mutation is committed reasign the default value with the argument userData
      state.user = userData
    }
  },
  actions: {
    // actions are functions used to commit mutations to alter the current state
    // login function
    async login({ commit }, email) {
      try {
        // send users email to Magic to be validated
        // This will create a new user if that email isn't present in the database
        // then logs in, also current users will be logged in
        await magicKey.auth.loginWithMagicLink(email)
        // create a data variable of the users metadata
        const data = await magicKey.user.getMetadata()
        // commit the mutation 
        commit('setUser', data)
        // redirect authed user to dashboard
        await router.push({ name: 'Dashboard' })
        
      } catch (error) {
        // SDK Error handler
        if (error instanceof SDKError) {
          console.log(error)
        }
        // RPC Error handler
        if (error instanceof RPCError) {
          console.log(error)
        }
        // Extension Error handler
        if (error instanceof ExtensionError) {
          console.log(error)
        }
      }
    },

    // logout function
    async logout({ commit }) {
      // sign out of magic
      await magicKey.user.logout();
      // commit the mutation
      commit('setUser', null)
      // redirect the now unauthed user to home page
      await router.push({ name: 'home' })
    }
  },
  modules: {
  },
  plugins: [createPersistedState()],
})
