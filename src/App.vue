<template>
  <div id="app">
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import RegisterForm from './components/RegisterForm.vue';


export default {
  name: 'App',

  created() {
  },

  components: {
    RegisterForm
  }
}
</script>

<style>
  body {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  #app {
    flex-grow: 1;
    display: flex;
    align-items: center;
  }
</style>

