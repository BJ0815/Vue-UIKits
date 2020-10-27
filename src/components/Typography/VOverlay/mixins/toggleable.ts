import Vue, { VueConstructor } from 'vue';

export type Toggleable<T extends string = 'value'> = VueConstructor<
  Vue & { isActive: boolean } & Record<T, unknown>
>;

export function factory<T extends string = 'value'>(prop?: T, event?: string): Toggleable<T>;
export function factory(prop = 'value', event = 'input') {
  return Vue.extend({
    name: 'toggleable',

    model: { prop, event },

    props: {
      [prop]: { required: false },
    },

    data() {
      return {
        isActive: !!this[prop],
      };
    },

    watch: {
      [prop](val) {
        this.isActive = !!val;
      },
      isActive(val) {
        if (!!val !== this[prop]) this.$emit(event, val);
      },
    },
  });
}

const Toggleable = factory();

export default Toggleable;
