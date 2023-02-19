<script>
// import vuex store and computed
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  // create setup 
  setup() {
    // create new instance of store
    const store = useStore()
    // fetch the user from the store
    const user = computed(() => store.state.user)
    return {
      user
    }
  }
}
</script>

<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <!-- create new links for login and dashboard -->
    <!-- add conditional if user is logged in -->
    <router-link v-if="!user" to="/login">Login |</router-link> 
    <router-link to="/dashboard"> Dashboard</router-link>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

/* Styling for button*/
button {
  width: 300px;
  height: 30px;
  padding: 0 5px;
  background-color: #35aa58;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
}
button:hover {
  background-color: #35aa58b7;
}
</style>
