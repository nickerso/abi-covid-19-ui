<template>
  <footer>
   <span>Built with <a href="https://nuxtjs.org/">Nuxt.js</a>, <a href="https://vuejs.org/">Vue.js</a>, and <a href="http://vue-chartjs.org/#/">vue-chartjs</a></span>
   <span>Powered by <a href="https://celml.org/">CellML</a> and <a href="https://opencor.ws/">OpenCOR</a></span>
  </footer>
</template>

<script>
  export default {
  }
</script>

<style lang="scss">
  @import "../assets/styles/_variables.scss";
  footer {
    background-color: color(fjord);
    color: #fff;
    font-size: rem(16);
    padding: rem(30) rem(40);
    display: flex;
    justify-content: space-between;
    flex-flow: row nowrap;
    a {
      color: color(robin-egg-blue);
      @include hover-active-states {
        background: darken(color(robin-egg-blue), 20%);
      }
    }
  }
</style>
