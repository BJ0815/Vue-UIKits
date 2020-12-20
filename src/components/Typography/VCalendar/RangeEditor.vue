<template>
  <div
    ref="VCalendar"
    class="VCalendar"
    :style="style"
    :class="{
      active: isPanelShow,
    }"
  >
    <div
      class="VCalendar__input"
      @click="togglePanel"
    >
      <input
        ref="VCalendar__input__start"
        class="VCalendar__input__start"
        type="text"
        autocomplete="off"
        readonly
        :value="viewStartDate"
      />
      <span class="VCalendar__input__tilde">~</span>
      <input
        class="VCalendar__input__end"
        type="text"
        autocomplete="off"
        readonly
        :value="viewEndDate"
      />
    </div>
    <transition name="panel">
      <div class="VCalendar__panel__wrapper" v-if="isPanelShow">
        <RangePanel
          ref="VCalendar__panel"
          :defaultStartVal="startDate"
          :defaultEndVal="endDate"
          @onDatePick="onDatePick"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import RangePanel from './RangePanel.vue';
import {
  stringifyDate,
  parseStrDate,
  validDate,
} from './lib/utility';
import editorMixin from './mixin/editor';

export default {
  name: 'RangeEditor',
  mixins: [editorMixin],
  components: {
    RangePanel,
  },
  data() {
    return {
      startDate: {
        year: 0,
        month: 0,
        date: 0,
      },
      endDate: {
        year: 0,
        month: 0,
        date: 0,
      },
    };
  },
  computed: {
    viewStartDate() {
      const date = {
        ...this.startDate,
        month: this.startDate.month + 1,
      };
      return validDate(this.startDate) ? stringifyDate(date) : '';
    },
    viewEndDate() {
      const date = {
        ...this.endDate,
        month: this.endDate.month + 1,
      };
      return validDate(this.endDate) ? stringifyDate(date) : '';
    },
  },
  methods: {
    onDatePick({ start, end }) {
      this.startDate = { ...start };
      this.endDate = { ...end };
      this.isPanelShow = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import './scss/editor.scss';
@import './scss/transition.scss';

.VCalendar {
  &__input {
    &__start,
    &__end {
      max-width: 50%;
      flex: 0 0 50%;
    }
  }
}
</style>
