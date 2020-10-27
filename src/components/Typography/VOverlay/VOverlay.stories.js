import VOverlay from './index';

const templateDecorator = () => ({
  template: `
  <div style="background-color: silver; padding: 10px;position: relative; width: 200px; height: 200px"><story/></div>`,
});

export default {
  title: 'VOverlay',
  component: VOverlay,
  argTypes: {
    color: { control: { type: 'color' } },
    opacity: {
      control: {
        type: 'range', min: 0, max: 1, step: 0.01,
      },
    },
    value: {
      control: {
        type: 'boolean',
      },
    },
    absolute: {
      control: {
        type: 'boolean',
      },
    },
    zIndex: { control: { type: 'number' } },
  },
  decorators: [templateDecorator],
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { VOverlay },
  template: '<VOverlay :value="value" :color="color" :opacity="opacity" :zIndex="zIndex" :absolute="absolute" @input="onInput">{{label}}</VOverlay>',
  methods: {
    onInput(e) { console.log(e); },
  },
});

export const Default = Template.bind({});
Default.args = {
  value: true,
  opacity: 0.46,
  zIndex: 5,
  absolute: false,
  label: 'test',
};

export const Absolute = Template.bind({});
Absolute.args = {
  value: true,
  absolute: true,
  label: 'test',
};
