// Styles
import './VCard.scss';

// Types
import Vue, { VNode } from 'vue';

export default Vue.extend({
  name: 'v-card',
  props: {
    msg: String,
  },
  render(h): VNode {
    return h('span', this.msg);
  },
});
