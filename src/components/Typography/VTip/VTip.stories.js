import VTip from './index.vue';

export default {
  title: 'VTip',
  component: VTip,
  argTypes: {
    width: { control: { type: 'text' } },
    placement: {
      control: {
        type: 'select',
        options: ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right', 'right-top', 'right-middle', 'right-bottom', 'left-top', 'left-middle', 'left-bottom'],
      },
    },
    content: { control: { type: 'text' } },
    backgroundColor: { control: { type: 'color' } },
    color: { control: { type: 'color' } },
    float: { table: { disable: true } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { VTip },
  template: `<div style="text-align: center">
    <VTip
      :float="float"
      :width="width"
      :placement="placement"
      :content="content"
      :backgroundColor="backgroundColor"
      :color="color"
    >
      <template #target>
        <span>hover me!</span>
      </template>
    </VTip>
  </div>`,
});

export const Float = Template.bind({});
Float.args = {
  float: true,
  placement: 'top-left',
  content: 'This is a float tip! Positioned relative to body.',
};
export const Fixed = Template.bind({});
Fixed.args = {
  float: false,
  width: 'unset',
  placement: 'top-left',
  content: 'This is a fixed tip! Positioned relative to element.',
};
