import VTip from './index.vue';

export default {
  title: 'VTip',
  component: VTip,
  argTypes: {
    content: { control: { type: 'text' } },
    placement: {
      control: {
        type: 'select',
        options: ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right', 'right-top', 'right-middle', 'right-bottom', 'left-top', 'left-middle', 'left-bottom'],
      },
    },
    maxWidth: { control: { type: 'text' } },
    backgroundColor: { control: { type: 'color' } },
    color: { control: { type: 'color' } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { VTip },
  template: `
  <div style="text-align: center">
    <VTip
      :content="content"
      :placement="placement"
      :maxWidth="maxWidth"
      :backgroundColor="backgroundColor"
      :color="color"
    >
      <template #target>
        <span>hover me!</span>
      </template>
    </VTip>
  </div>`,
});

export const Default = Template.bind({});
Default.args = {
  content: '把假內容輕鬆帶過，顯然並不適合。我們可以很篤定的說，這需要花很多時間來嚴謹地論證。斯特恩曾經說過，對知識的渴望如同對財富的追求，越追求，慾望就越強烈。這句話幾乎解讀出了問題的根本。',
  placement: 'top-left',
  maxWidth: '300px',
};
