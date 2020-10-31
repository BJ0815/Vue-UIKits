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
      document.body.appendChild(this.$refs.VTip_content);
    });
  },
  beforeDestroy() {
    document.body.removeChild(this.$refs.VTip_content);
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
      return { maxWidth: maxWidthStr || 'unset', backgroundColor, color };
    },
    arrowStyle() {
      const { arrowDirection, arrowAlign, arrowRotate } = this;
      const rotate = arrowRotate[arrowDirection];
      let style = `${arrowDirection}:-8px; `;

      switch (arrowAlign) {
        case 'middle':
          style += `top: 50%; transform: translateY(-50%)`;
          break;
        case 'center':
          style += `left: 50%; transform: translateX(-50%)`;
          break;
        default:
          style += `${arrowAlign}: 4px; transform:`;
          break;
      }
      return `${style} rotate(${rotate}deg); border-color: transparent transparent ${this.backgroundColor} transparent;`;
    },
  },
  methods: {
    isNum(value) {
      return typeof value === 'number';
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
        tipContent.style.left = `${x}px`;
        tipContent.style.top = `${y}px`;
      });
    },
  },
};
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss"></style>
