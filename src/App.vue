<template>

  <div id="app">
    <div class="container-fluid">
      <Interface/>
    </div>
  </div>
</template>

<script>
import Interface from './components/Interface';
export default {
  name: 'App',
  components: {
    Interface
  }
}
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&family=Rubik:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');
#app {
  font-family: 'Roboto Mono', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1{
  font-family: 'Rubik';
}

</style>
