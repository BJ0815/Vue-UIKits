import {{ pascalCase name }} from './index';

const templateDecorator = () => ({
  template: `
  <div style="background-color: silver; padding: 10px;"><story/></div>`,
});

export default {
  title: '{{ pascalCase name }}',
  component: {{ pascalCase name }},
  argTypes: {
    color: { control: { type: 'color' } },
  },
  decorators: [templateDecorator],
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { {{ pascalCase name }} },
  template: '<{{ pascalCase name }}></{{ pascalCase name }}>',
});

export const Default = Template.bind({});
Default.args = {};

