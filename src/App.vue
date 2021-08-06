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
  --accent-color: thistle;

  font-family: 'Roboto Mono', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
  /* color: rgb(48, 74, 100); */

  margin-top: 40px;
}

h1{
  font-family: 'Rubik';
  font-size: 50px;
  margin: 3px;
}

a {
  color: black;
}

a:hover{
  color: rgb(128, 92, 128);
}

.btn{
    border-width: 1px;
    border-color: black;
    margin: 2px;
    transition-duration: 0.1s;
}

.btn:hover{
    background-color: var(--accent-color);
}

.btn:active{
    /* padding-left:7px;
    padding-right:7px;

    margin-left:7px;
    margin-right:7px;
    */
    background-color: black;
    color: white;
    outline: none;
}

.urgent-btn {
  background-color: black;
  color: white;
}

.urgent-btn:hover {
  color: black;
  background-color: white;
}


.smallBtn {
  size: small;
  text-size-adjust: auto;
}

</style>
