<script>
import { ref } from "vue";
// import the vuex store
import { useStore } from 'vuex';

export default {
  setup() {
    // create a new instance of store
    const store = useStore();
    const email = ref("");
    // dispatch the signup/login action 
    const login = () => {
      // first argument is the action
      store.dispatch('login', {
        // second argument is the payload
        email: email.value
      })
    };
    return {
      email,
      login,
    };
  },
};
</script>

<template>
    <div class="login-container">
      <form @submit.prevent="login" class="login-form">
        <h2>Log In</h2>
        <div class="email-container">
          <label>Email address</label>
          <input
            v-model="email"
            type="email"
            name="email"
            placeholder="hello@magic.link"
            required
            class="email-input"
            value
          />
        </div>
        <button type="submit" name="button">Send Magic Link</button>
      </form>
    </div>
  </template>

  <style scoped>
.login-form,
.email-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.email-container {
  margin-bottom: 30px;
}
.email-container label {
  margin-right: auto;
  margin-bottom: 7px;
  font-size: 13px;
}
.email-container .email-input {
  width: 300px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid gray;
  outline: none;
  padding: 0 5px;
}
.email-input:focus {
  border: 1px solid #0228af;
}
</style>