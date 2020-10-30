import VSlider from './index.vue';

export default {
  title: 'VSlider',
  component: VSlider,
  argTypes: {
    maxCount: { control: { type: 'number' } },
  },
  decorators: [],
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  data() {
    return {
      showDefault: 4,
      ww: null,
    };
  },
  computed: {
    show() {
      if (this.ww <= 480) return 1;
      if (this.ww <= 960) return 2;
      return this.showDefault;
    },
    list() {
      const temp = new Array(this.maxCount).fill(1).map((el, i) => i);
      const head = temp.slice(temp.length - 1);
      const foot = temp.slice(0, this.show);
      return head.concat(temp).concat(foot);
    },
  },
  mounted() {
    window.addEventListener('resize', this.resize);
    this.resize();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
  },
  methods: {
    resize() {
      this.ww = window.innerWidth;
    },
  },
  components: { VSlider },
  template: `<VSlider :maxCount="maxCount" :showLimit="show" :showArrow="showArrow" :showDot="showDot" :handAction="handAction">
        <div
          v-for="(item, index) in list"
          :key="index"
          :style="{ width: 100 / show + '%' }"
        >
        <div style="display: flex; align-items: center; justify-content: center; margin: 10px; height: 200px; background-color: #777777;">{{item}}</div>
        </div></VSlider>`,
});

export const Default = Template.bind({});
Default.args = {
  maxCount: 5,
};
