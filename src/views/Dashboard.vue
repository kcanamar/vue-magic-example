<script>
export default {
  setup(){
     const logout = () => {
     console.log("User has been logged out")
    };
    return {
      logout,
    };
  }
}
</script>

<template>
    <div class="dashboard-container">
        <h2>Welcome to our Dashboard Page</h2>
        <p>Hello!</p>
        <button @click="logout">Sign out</button>
    </div>
</template>

<style scoped>
</style>