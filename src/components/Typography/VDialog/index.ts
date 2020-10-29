// Styles
import './VDialog.scss';

// Types
import { VNode, VNodeData } from 'vue';

// mixins
import toggleable from './mixins/toggleable';
import mixins from './mixins/util';

// helpers
import { convertToUnit } from './helpers';

// directives
import { ClickOutside } from './directives/clickOutside';

import VOverlay from '../VOverlay';

const addOnceEventListener = (
  el: EventTarget,
  animate: string,
  cb: (event: Event) => void
): void => {
  if (el) {
    el.addEventListener(animate, cb, { once: true });
  }
};
/**
 * Dialogs UI component
 */
export default mixins(toggleable).extend({
  name: 'v_dialog',
  directives: { ClickOutside },
  props: {
    width: {
      type: [Number, String],
      default: 'auto',
    },
    maxWidth: {
      type: [Number, String],
      default: 'none',
    },
    fullscreen: Boolean,
    transition: {
      type: [String, Boolean],
      default: 'dialog-transition',
    },
    activeZIndex: [Number, String],
  },
  data() {
    return {
      isActive: !!this.value,
      overlay: null as InstanceType<typeof VOverlay> | null,
    };
  },
  computed: {
    classes(): object {
      return {
        'v-dialog': true,
        'v-dialog--active': this.isActive,
        'v-dialog--fullscreen': this.fullscreen,
      };
    },
    contentClasses(): object {
      return {
        'v-dialog__content': true,
        'v-dialog__content--active': this.isActive,
      };
    },
  },
  watch: {
    isActive(val) {
      if (val) {
        this.show();
        // this.hideScroll()
      } else {
        this.removeOverlay();
        // this.unbind();
        // this.previousActiveElement?.focus()
      }
    },
  },
  methods: {
    show() {
      if (!this.fullscreen) this.genOverlay();
      // Double nextTick to wait for lazy content to be generated
      this.$nextTick(() => {
        this.$nextTick(() => {
          // this.previousActiveElement = document.activeElement as HTMLElement
          const contentElm = this.$refs.content as HTMLElement;
          contentElm.focus();
          // this.bind()
        });
      });
    },
    // bind () {
    //   window.addEventListener('focusin', this.onFocusin)
    // },
    // unbind () {
    //   window.removeEventListener('focusin', this.onFocusin)
    // },
    genOverlay() {
      const overlay = new VOverlay({
        propsData: {
          value: this.isActive,
        },
      });

      overlay.$mount();

      const parent = document.body;

      if (parent) parent.insertBefore(overlay.$el, parent.firstChild);

      this.overlay = overlay;
    },
    removeOverlay() {
      if (this.overlay) {
        addOnceEventListener(this.overlay.$el, 'transitionend', () => {
          if (
            !this.overlay
            || !this.overlay.$el
            || !this.overlay.$el.parentNode
            || this.overlay.value
          ) { return; }

          this.overlay.$el.parentNode.removeChild(this.overlay.$el);
          this.overlay.$destroy();
          this.overlay = null;
        });

        this.overlay.value = false;
      }
    },
    genContent() {
      return this.$createElement(
        'div',
        {
          class: this.contentClasses,
          attrs: {
            role: 'document',
            tabindex: this.isActive ? 0 : undefined,
          },
          // on: { keydown: this.onKeydown },
          style: { zIndex: this.activeZIndex },
          ref: 'content',
        },
        [this.genTransition()]
      );
    },
    genTransition() {
      const content = this.genInnerContent();

      if (!this.transition) return content;

      return this.$createElement(
        'transition',
        {
          props: {
            name: this.transition,
            // origin: this.origin,
            appear: true,
          },
        },
        [content]
      );
    },
    genInnerContent() {
      const data: VNodeData = {
        class: this.classes,
        directives: [
          {
            name: 'click-outside',
            value: {
              handler: this.onClickOutside,
              closeConditional: this.closeConditional,
            },
          },
          { name: 'show', value: this.isActive },
        ],
        ref: 'dialog',
      };

      if (!this.fullscreen) {
        data.style = {
          ...(data.style as object),
          maxWidth: this.maxWidth === 'none' ? undefined : convertToUnit(this.maxWidth),
          width: this.width === 'auto' ? undefined : convertToUnit(this.width),
        };
      }

      return this.$createElement('div', data, this.$slots.default);
    },
    onClickOutside(e: Event) {
      this.$emit('click:outside', e);

      this.isActive = false;
    },
    closeConditional(e: Event) {
      const target = e.target as HTMLElement;
      return !(
        (!this.isActive || this.$refs.content === target)
        //   || (this.overlay && target && !this.overlay.$el.contains(target))
      );
    },
  },
  render(h): VNode {
    return h(
      'div',
      {
        staticClass: 'v-dialog__container',
        class: {
          'v-dialog__container--attached': this.isActive,
        },
        attrs: { role: 'dialog' },
      },
      [this.genContent()]
    );
  },
});
