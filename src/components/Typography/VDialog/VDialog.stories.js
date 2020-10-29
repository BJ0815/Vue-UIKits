import VDialog from './index';

const templateDecorator = () => ({
  template: `
  <div style="background-color: silver; padding: 10px;"><story/></div>`,
});

export default {
  title: 'VDialog',
  component: VDialog,
  argTypes: {
    value: {
      control: {
        type: 'boolean',
      },
    },
  },
  decorators: [templateDecorator],
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { VDialog },
  template: '<VDialog :value="value">test</VDialog>',
});

export const Default = Template.bind({});
Default.args = {
  value: true,
};
