<template>
  <div class="app-container">
    <npm-header/>
    <side-nav/>
    <div class="app-content">
      <nuxt/>
    </div>
    <npm-footer/>
  </div>
</template>
<script>
import npmHeader from '~/components/Header'
import npmFooter from '~/components/Footer'
import SideNav from '~/components/SideNav'
export default {
  components: { npmHeader, npmFooter, SideNav }
}
</script>

<style>
    html, body{
        margin: 0;
        height: 100%;
        width: 100%;
    }
    .app-container{
        height: 100%;
        position: relative;
        display: grid;
        grid-template: auto 1fr auto / 1fr;
    }
    .app-content{
        min-height: 100vh;
        padding: 24px;
        display: grid;
        align-items: center;
        justify-items: center;
    }
</style>
