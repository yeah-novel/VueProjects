<template>
  <div id="app">
    <nav-bar/>
    <div class="app-content">
      <router-view/>
    </div>
    <footer-bar/>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import FooterBar from './components/FooterBar.vue'

export default {
  name: 'App',
  components: { NavBar, FooterBar }
}
</script>

<style>
  @import "./assets/css/main.css";

  .app-content {
    padding-top: 52px;
    padding-bottom: 32px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
</style>
