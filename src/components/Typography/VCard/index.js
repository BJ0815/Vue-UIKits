// Styles
import './VCard.scss';
// Types
import Vue from 'vue';

export function createSimpleFunctional(c, el = 'div', name) {
  return Vue.extend({
    name: name || c.replace(/__/g, '-'),
    functional: true,
    render(h, { data, children }) {
      const myData = data;
      myData.staticClass = `${c} ${data.staticClass || ''}`.trim();
      return h(el, myData, children);
    },
  });
}
/**
 * Card Utils Components
 */
export const VCardTitle = createSimpleFunctional('v-card__title');
export const VCardFooter = createSimpleFunctional('v-card__footer');
export const VCardText = createSimpleFunctional('v-card__text');
/**
 * Card UI Component
 */
export default Vue.extend({
  name: 'v-card',
  props: {
    tag: {
      type: String,
      default: 'div',
    },
  },
  computed: {
    classes() {
      return ['v-card'];
    },
    styles() {
      return { color: 'red' };
    },
  },
  render(h) {
    const data = {
      attrs: {
        tabindex: 'tabindex' in this.$attrs ? this.$attrs.tabindex : undefined,
      },
      class: this.classes,
      style: this.styles,
      on: this.$listeners,
      ref: 'card',
    };
    // <div><slot /></div>
    return h(this.tag, data, [this.$slots.default]);
  },
});
