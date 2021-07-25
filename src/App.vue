<template>
  <div id="app">
    <div class="container-fluid">
      <Master/>
    </div>
  </div>
</template>

<script>
import Master from './pages/Master';
export default {
  name: 'App',
  components: {
    Master
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
