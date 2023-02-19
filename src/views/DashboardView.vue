<script>
// import vuex store and computed
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  setup(){
    // create new instance of store
    const store = useStore()
    // fetch the logged in user from the store
    const user = computed(() => store.state.user)
    const logout = () => {
      // dispatch the logout action
      store.dispatch('logout');
    };
    return {
      logout,
      user
    };
  }
}
</script>

<template>
    <div class="dashboard-container">
        <h2>Welcome to our Dashboard Page</h2>
        <!-- display the data of the logged in user -->
        <p>Hello {{user.email}}!</p>
        <p>Public Address: {{user.publicAddress}}</p>
        <button @click="logout">Sign out</button>
    </div>
</template>

<style scoped>
</style>