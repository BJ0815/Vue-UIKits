import VCalendar from './index.vue';

export default { title: 'VCalendar' };

const Template = (args, { argTypes }) => ({
  components: { VCalendar },
  props: Object.keys(argTypes),
  template: `<VCalendar :rangeOn="rangeOn" :width="width"/>`,
});

export const singeCalednar = Template.bind({});
singeCalednar.args = {
  rangeOn: false,
  width: 150,
};
singeCalednar.parameters = {
  layout: 'padded',
};

export const rangeCalednar = Template.bind({});
rangeCalednar.args = {
  rangeOn: true,
  width: 250,
};
rangeCalednar.parameters = {
  layout: 'padded',
};
