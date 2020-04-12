<template>
  <div>
    <npm-header/>
    <nuxt/>
    <npm-footer/>
  </div>
</template>
<script>
import npmHeader from '~/components/Header'
import npmFooter from '~/components/Footer'
export default {
  components: { npmHeader, npmFooter }
}
</script>

<style>
</style>
