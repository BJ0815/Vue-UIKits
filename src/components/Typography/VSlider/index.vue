<script>
export default {
  name: 'VSlider',
  props: {
    maxCount: {
      type: Number,
      default: 0,
    },
    showLimit: {
      type: Number,
      default: 0,
    },
    showArrow: {
      type: Boolean,
      default: true,
    },
    showDot: {
      type: Boolean,
      default: true,
    },
    handAction: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      now: 1,
      transitionNow: 1,
      isDisable: false,
      transitionTime: 0,
      startX: 0,
      endX: null,
    };
  },
  computed: {
    posX() {
      return this.transitionNow * (100 / this.showLimit) * -1;
    },
    styleObj() {
      return {
        transitionDuration: `${this.transitionTime}ms`,
        transform: `translate3d(${this.posX}%, 0, 0)`,
      };
    },
    ArrowShowTrigger() {
      return (this.maxCount > this.showLimit) && this.showArrow;
    },
    DotShowTrigger() {
      return this.maxCount > 1 && this.showDot;
    },
  },
  methods: {
    transitionHandler() {
      this.isDisable = false;
      this.transitionTime = 0;
      if (this.posX === 0) {
        this.transitionNow = this.maxCount;
      } else if (
        this.posX
        === (this.maxCount + 1) * (100 / this.showLimit) * -1
      ) {
        this.transitionNow = 1;
      }
    },
    change(val) {
      if (!this.isDisable) {
        this.isDisable = true;
        this.transitionTime = 500;
        this.transitionNow += val;
        this.now += val;
        if (this.now === 0) {
          this.now = this.maxCount;
        } else if (this.now === this.maxCount + 1) {
          this.now = 1;
        }
      }
    },
    dotChange(val) {
      if (!this.isDisable) {
        this.isDisable = true;
        this.transitionTime = 500;
        this.transitionNow = val + 1;
        this.now = val + 1;
      }
    },
    startHandler(e) {
      this.startX = e.clientX ? e.clientX : e.changedTouches[0].clientX;
    },
    moveHandler(e) {
      this.endX = e.clientX ? e.clientX : e.changedTouches[0].clientX;
    },
    endHandler(e) {
      if (this.isDisable || this.startX === 0) return;
      const ww = window.innerWidth;
      this.endX = this.endX ? this.endX : e.clientX;
      const movement = (this.endX - this.startX) / ww;
      if (this.handAction) {
        this.actionHandler(movement);
      }
    },
    actionHandler(movement) {
      if (movement > 0.1) {
        this.change(-1);
      } else if (movement < -0.1) {
        this.change(1);
      }
      this.startX = 0;
      this.endX = 0;
    },
  },
};
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss"></template>
