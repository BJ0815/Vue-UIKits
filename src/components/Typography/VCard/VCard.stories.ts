import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';

import VCard, { VCardFooter, VCardTitle, VCardText } from './index';

storiesOf('VCard', module).add('default', () => ({
  components: {
    VCard,
    VCardFooter,
    VCardTitle,
    VCardText,
  },
  props: {
    tag: {
      type: String,
      default: () => 'div',
    },
  },
  template: `
  <VCard :tag="tag" class="class1" style="color: black;" @click="onClick">
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
  </VCard>`,
  methods: {
    onClick: action('click'),
  },
}));
