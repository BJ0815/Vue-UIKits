import {
  mount, Wrapper, MountOptions,
} from '@vue/test-utils';
import Vue from 'vue';
import VCard from '../index';

describe('HelloWorld.vue', () => {
  let mountFunction: (options?: MountOptions<Vue>) => Wrapper<Vue>;
  beforeEach(() => {
    mountFunction = (options?: MountOptions<Vue>) => mount(VCard, {
      ...options,
    });
  });

  it('should render component and match snapshot', () => {
    const wrapper = mountFunction();

    expect(wrapper.html()).toMatchSnapshot();
  });
});
