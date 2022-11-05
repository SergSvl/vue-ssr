<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h2>Продукты:</h2>
    {{ $store.getters['module1/getAllProducts'] }}
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
