<template>
  <div id="app">
    <div class="container">
      <VCard title="VCard component" class="class1" style="color: black;" @click="clickHandler">
        <VCardTitle>
          <h1>Hello~</h1>
        </VCardTitle>
        <VCardText>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet neque enim quibusdam
            illum delectus quas, deserunt voluptatem libero vero officia molestiae, ipsa aut
            aperiam, at doloremque alias rem quasi dolores!
          </p>
        </VCardText>
        <VCardFooter>
          <p>Footer</p>
        </VCardFooter>
      </VCard>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import VCard, { VCardTitle, VCardFooter, VCardText } from './components/Typography/VCard';

export default Vue.extend({
  name: 'App',
  components: {
    VCard,
    VCardTitle,
    VCardFooter,
    VCardText,
  },
  methods: {
    clickHandler() {
      console.log('test');
    },
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
