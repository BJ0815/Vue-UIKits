<template>
  <div id="app">
    <div class="container">
      <CustomGarden></CustomGarden>
    </div>
  </div>
</template>

<script>
import CustomGarden from './CustomGarden.vue';

export default {
  components: {
    CustomGarden,
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  max-width: 50%;
  height: 100%;
}
</style>
