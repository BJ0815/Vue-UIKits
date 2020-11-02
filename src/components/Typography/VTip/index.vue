<script>
export default {
  name: 'VTip',
  props: {
    content: {
      type: String,
      default: '',
    },
    placement: {
      type: String,
      default: 'top-left',
    },
    maxWidth: {
      type: [Number, String],
      default: null,
    },
    backgroundColor: {
      type: String,
      default: '#292929',
    },
    color: {
      type: String,
      default: '#ffffff',
    },
  },
  data() {
    return {
      show: false,
      lastParent: null,
      offsetX: '0px',
      offsetY: '0px',
      arrowRotate: {
        top: 0, bottom: 180, right: 90, left: -90,
      },
      opposite: {
        top: 'bottom', bottom: 'top', right: 'left', left: 'right',
      },
    };
  },
  mounted() {
    this.$nextTick(() => {
      const tooltipContent = this.$refs.VTip_content;
      const tooltipContainer = this.$refs.VTip;
      this.lastParent = this.getLastOffset(tooltipContainer);
      this.lastParent.appendChild(tooltipContent);
    });
  },
  beforeDestroy() {
    const tooltipContent = this.$refs.VTip_content;
    this.lastParent.removeChild(tooltipContent);
  },
  computed: {
    arrowDirection() {
      return this.opposite[this.placement.split('-')[0]];
    },
    arrowAlign() {
      return this.placement.split('-')[1];
    },
    contentStyle() {
      const { maxWidth, backgroundColor, color } = this;
      const maxWidthStr = this.isNum(maxWidth) ? `${maxWidth}px` : maxWidth;
      return {
        top: this.offsetY,
        left: this.offsetX,
        maxWidth: maxWidthStr || 'unset',
        backgroundColor,
        color,
      };
    },
    arrowStyle() {
      const { arrowDirection, arrowAlign, arrowRotate } = this;
      const rotate = arrowRotate[arrowDirection];
      const style = { borderBottomColor: this.backgroundColor };

      switch (arrowAlign) {
        case 'middle':
          style.top = '50%';
          style.transform = 'translateY(-50%) ';
          break;
        case 'center':
          style.left = '50%';
          style.transform = 'translateX(-50%) ';
          break;
        default:
          style[arrowAlign] = '4px';
          style.transform = '';
          break;
      }
      style.transform += `rotate(${rotate}deg)`;
      style[arrowDirection] = '-8px';
      return style;
    },
  },
  methods: {
    isNum(value) {
      return typeof value === 'number';
    },
    getLastOffset(element) {
      let el = element;
      while (el.offsetParent) el = el.offsetParent;
      return el;
    },
    getPosition(element) {
      let el = element;
      let x = 0;
      let y = 0;
      while (el) {
        x += el.offsetLeft - el.scrollLeft + el.clientLeft;
        y += el.offsetTop - el.scrollTop + el.clientTop;
        el = el.offsetParent;
      }
      return { x, y };
    },
    trigger($event) {
      this.show = true;
      this.$nextTick(() => {
        const { target } = $event;
        const tipContent = this.$refs.VTip_content;
        let { x, y } = this.getPosition(target);
        switch (this.arrowDirection) {
          case 'top':
            y += target.clientHeight + 8;
            break;
          case 'bottom':
            y -= tipContent.clientHeight + 8;
            break;
          case 'right':
            x -= tipContent.clientWidth + 8;
            break;
          case 'left':
            x += target.clientWidth + 8;
            break;
          default:
            break;
        }
        switch (this.arrowAlign) {
          case 'top':
            break;
          case 'bottom':
            y += target.clientHeight;
            y -= tipContent.clientHeight;
            break;
          case 'middle':
            y += target.clientHeight / 2;
            y -= tipContent.clientHeight / 2;
            break;
          case 'right':
            x += target.clientWidth;
            x -= tipContent.clientWidth;
            break;
          case 'left':
            break;
          case 'center':
            x += target.clientWidth / 2;
            x -= tipContent.clientWidth / 2;
            break;
          default:
            break;
        }
        this.offsetX = `${x}px`;
        this.offsetY = `${y}px`;
      });
    },
  },
};
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss"></style>
