import { VNodeDirective } from 'vue';

export const ClickOutside = {
  inserted(el: HTMLElement, binding: VNodeDirective) {
    const onClick = (e: Event) => {
      const handler = binding.value?.handler;
      const isActive = binding.value?.closeConditional || (() => true);

      if (!e || isActive(e) === false) return;

      isActive(e);
      if (handler) handler(e);
    };
    const app = document.body;
    app.addEventListener('click', onClick, true);
    // eslint-disable-next-line no-param-reassign
    el.$clickOutside = onClick;
  },

  unbind(el: HTMLElement) {
    if (!el.$clickOutside) return;

    const app = document.body;
    if (app) app.removeEventListener('click', el.$clickOutside, true);
    // eslint-disable-next-line no-param-reassign
    delete el.$clickOutside;
  },
};

export default {
  ClickOutside,
};
