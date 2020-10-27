// Styles
import "./{{ pascalCase name }}.scss";

// Types
import Vue, { VNode } from "vue";

/**
 * Dialogs UI component
 */
export default Vue.extend({
  name: "{{ snakeCase name }}",
  render(h): VNode {
    return h("div", [this.$slot.default]);
  }
});
