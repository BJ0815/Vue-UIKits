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
        :value="viewDate"
      />
    </div>
    <transition name="panel">
      <div class="VCalendar__panel__wrapper" v-if="isPanelShow">
        <SinglePanel
          ref="VCalendar__panel"
          :defaultVal="date"
          @onDatePick="onDatePickeHandler"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue';
import SinglePanel from './SinglePanel.vue';
import {
  getMonthList,
  getNewDateByMonth,
  getNewDateByYear,
  getIsDateBeHindCompareDate,
  stringifyDate,
  parseStrDate,
  validDate,
} from './lib/utility';
import editorMixin from './mixin/editor';

export default {
  name: 'SingleEditor',
  mixins: [editorMixin],
  components: {
    SinglePanel,
  },
  data() {
    return {
      date: {
        year: 0,
        month: 0,
        date: 0,
      },
    };
  },
  computed: {
    viewDate() {
      const date = {
        ...this.date,
        month: this.date.month + 1,
      };
      return validDate(this.date) ? stringifyDate(date) : '';
    },
  },
  methods: {
    onDatePickeHandler(val) {
      this.date = { ...val };
      this.isPanelShow = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import './scss/editor.scss';
@import './scss/transition.scss';
</style>
