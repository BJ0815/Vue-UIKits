<template>
  <div id="app">
    <div class="container">
      <img src="@/assets/logo.png" alt="logo">
      <button @click="value = !value">Toggle</button>
      <VOverlay :value="value" :absolute="absolute">OPEN !!!</VOverlay>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import VOverlay from '@/components/Typography/VOverlay';

export default Vue.extend({
  name: 'App',
  data() {
    return {
      value: false,
      absolute: true,
    };
  },
  components: {
    VOverlay,
  },
});
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}

.container {
  max-width: 50%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
