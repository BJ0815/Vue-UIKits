<template>
  <div id="app">
    <VCard msg="VCard component"></VCard>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import VCard from './components/Typography/VCard';

export default Vue.extend({
  name: 'App',
  components: {
    VCard,
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
