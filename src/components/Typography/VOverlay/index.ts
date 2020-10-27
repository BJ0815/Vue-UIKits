// Styles
import './VOverlay.scss';

// Types
import { VNode, VNodeData } from 'vue';

// mixins
import toggleable from './mixins/toggleable';
import mixins from './mixins/util'; // 複寫一層extend for mixin，不然 ts type check 會出錯...

/**
 * Dialogs UI component
 */
export default mixins(toggleable).extend({
  name: 'v-overlay',
  props: {
    absolute: Boolean,
    color: {
      type: String,
      default: '#212121',
    },
    opacity: {
      type: [Number, String],
      default: 0.46,
    },
    value: {
      default: true,
    },
    zIndex: {
      type: [Number, String],
      default: 5,
    },
  },

  computed: {
    scrim(): VNode {
      const data: VNodeData = {
        staticClass: 'v-overlay__scrim',
        style: {
          opacity: this.computedOpacity,
          backgroundColor: this.color,
        },
      };

      return this.$createElement('div', data);
    },
    classes(): object {
      return {
        'v-overlay--absolute': this.absolute,
        'v-overlay--active': this.isActive,
      };
    },
    computedOpacity(): number {
      return Number(this.isActive ? this.opacity : 0);
    },
    styles(): object {
      return {
        zIndex: this.zIndex,
      };
    },
  },

  methods: {
    genContent() {
      return this.$createElement(
        'div',
        {
          staticClass: 'v-overlay__content',
        },
        this.$slots.default
      );
    },
  },

  render(h): VNode {
    const children = [this.scrim];

    if (this.isActive) children.push(this.genContent());

    return h(
      'div',
      {
        staticClass: 'v-overlay',
        class: this.classes,
        style: this.styles,
      },
      children
    );
  },
});
