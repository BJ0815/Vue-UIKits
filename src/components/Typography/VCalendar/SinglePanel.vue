<template>
  <div ref="VCalendar__panel" class="VCalendar__panel">
    <div class="VCalendar__panel__container">
      <div class="VCalendar__panel__container__top__control">
        <div class="VCalendar__panel__container__top__control__left">
          <button @click="setCurrentDateAndMonthListByYear(-1)">&#8249;</button>
          <button @click="setCurrentDateAndMonthListByMonth(-1)">&#171;</button>
        </div>
        <div class="VCalendar__panel__container__top__control__center">
          {{ topControlText }}
        </div>
        <div class="VCalendar__panel__container__top__control__right">
          <button @click="setCurrentDateAndMonthListByMonth(1)">&#187;</button>
          <button @click="setCurrentDateAndMonthListByYear(1)">&#8250;</button>
        </div>
      </div>
      <div class="VCalendar__panel__container__week">
        <div v-for="(week, index) in weeks" :key="index">
          {{ week.text }}
        </div>
      </div>
      <div class="VCalendar__panel__container__date__wrapper">
        <div
          v-for="(item, index) in calcMonthList"
          :key="index"
          :class="{
            disabled: item.disabled,
            active: item.active,
            isToday: item.isToday,
          }"
          @click="onDatePick(item)"
        >
          {{ item.date }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import panelMixin from './mixin/panel';
import weeks from './lib/enum';
import {
  getMonthList,
  getNewDateByMonth,
  getNewDateByYear,
  getIsDateBeHindCompareDate,
  stringifyDate,
  parseStrDate,
  validDate,
} from './lib/utility';

export default {
  name: 'SinglePanel',
  props: {
    defaultVal: {
      type: Object,
      default: () => ({ year: 0, month: 0, date: 0 }),
    },
  },
  mixins: [panelMixin],
  data() {
    return {
      weeks,
      current: {
        year: 0,
        month: 0,
        date: 0,
      },
      selected: {
        year: 0,
        month: 0,
        date: 0,
      },
      monthDateList: [],
    };
  },
  mounted() {
    let isDefaultPropValid = false;
    if (validDate(this.defaultVal)) {
      this.selected = { ...this.defaultVal };
      isDefaultPropValid = true;
    }
    const baseStartDate = isDefaultPropValid ? this.selected : this.now;
    this.setCurrnetDate(
      baseStartDate.year,
      baseStartDate.month,
      baseStartDate.date
    );
    this.setCurrentMonthList(baseStartDate.year, baseStartDate.month);
  },
  computed: {
    topControlText() {
      return `${this.current.year}年${this.current.month * 1 + 1}月`;
    },
    calcMonthList() {
      return this.monthDateList.map((item) => ({
        ...item,
        disabled: item.month !== this.current.month,
        active: stringifyDate(item) === stringifyDate(this.selected),
        isToday: stringifyDate(item) === stringifyDate(this.now),
      }));
    },
  },
  methods: {
    setCurrnetDate(year, month, date) {
      this.current = {
        year,
        month,
        date,
      };
    },
    setCurrentMonthList(year, month) {
      this.monthDateList = getMonthList(year, month);
    },
    setCurrentDateAndMonthListByMonth(add) {
      const { year, month, date } = getNewDateByMonth(
        this.current.year,
        this.current.month,
        this.current.date,
        add
      );
      this.setCurrnetDate(year, month, date);
      this.setCurrentMonthList(year, month);
    },
    setCurrentDateAndMonthListByYear(add) {
      const { year, month, date } = getNewDateByYear(
        this.current.year,
        this.current.month,
        this.current.date,
        add
      );
      this.setCurrnetDate(year, month, date);
      this.setCurrentMonthList(year, month);
    },
    onDatePick(val) {
      this.selected = { ...val };
      this.$emit('onDatePick', this.selected);
    },
  },
};
</script>

<style lang="scss" scoped>
@import './scss/panel.scss';

.VCalendar__panel {
  background-color: #fff;
  &__container {
    &__date__wrapper {
      > div {
        &:hover,
        &.isToday {
          color: #409eff;
        }
        &.disabled {
          color: #ddd;
        }
        &.active {
          color: #fff;
          &::before {
            position: absolute;
            top: 50%;
            left: 49.5%;
            display: inline-block;
            width: 23px;
            height: 23px;
            background-color: #409eff;
            border-radius: 100%;
            z-index: -1;
            content: '';
            transform: translate(-50%, -50%);
          }
        }
      }
    }
  }
}
</style>
