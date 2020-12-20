<template>
  <component
     :is="name"
     :width="width"
  />
</template>

<script>
import RangeEditor from './RangeEditor.vue';
import SingleEditor from './SingleEditor.vue';

export default {
  name: 'VCalendar',
  props: {
    rangeOn: {
      type: Boolean,
      default: false,
    },
    width: {
      type: Number,
      default: 150,
    },
  },
  computed: {
    name() {
      return this.rangeOn ? 'RangeEditor' : 'SingleEditor';
    },
  },
  components: {
    RangeEditor,
    SingleEditor,
  },
};
</script>
